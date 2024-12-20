import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { BACKEND_URL } from '../constants'

const Login = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'user'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [bruteForceProtection, setBruteForceProtection] = useState({
    attempts: 0,
    lockoutUntil: null
  })

  const encryptTokens = (accessToken, refreshToken) => {
    const key = process.env.REACT_APP_ENCRYPTION_KEY
    return CryptoJS.AES.encrypt(
      JSON.stringify({ accessToken, refreshToken }),
      key
    ).toString()
  }

  const encryptUser = (user) => {
    const key = process.env.REACT_APP_ENCRYPTION_KEY
    return CryptoJS.AES.encrypt(JSON.stringify(user), key).toString()
  }

  const hashPassword = async (password) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hash = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  }

  const getCsrfToken = () => {
    const metaTag = document.querySelector('meta[name="csrf-token"]')
    return metaTag ? metaTag.getAttribute('content') : ''
  }

  const isPasswordStrong = (password) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
  }

  const sanitizeInput = (input) => {
    return input.replace(/[<>]/g, '')
  }

  const handleAuthError = (error) => {
    if (error.response?.status === 429) {
      const newAttempts = bruteForceProtection.attempts + 1
      const lockoutTime = Math.min(Math.pow(2, newAttempts) * 1000, 30000)
      
      setBruteForceProtection({
        attempts: newAttempts,
        lockoutUntil: new Date(Date.now() + lockoutTime)
      })
      setError(`Too many attempts. Please try again in ${lockoutTime/1000} seconds`)
    } else {
      setError(error.response?.data?.message || 'Authentication failed')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
        const requestData = {
            email: formData.email,
            password: await hashPassword(formData.password),
            ...((!isLogin && formData.name) && { name: formData.name }),
            role: 'user'
        }

        const response = await axios.post(BACKEND_URL + endpoint, requestData, {
            headers: {
                'X-CSRF-TOKEN': getCsrfToken(),
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        const { accessToken, refreshToken, user } = response.data
        
        const encryptedTokens = encryptTokens(accessToken, refreshToken)
        localStorage.setItem('tokens', encryptedTokens)
        localStorage.setItem('userData', JSON.stringify({ user }))
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        navigate('/dashboard')
    } catch (error) {
        handleAuthError(error)
    } finally {
        setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const sanitizedValue = sanitizeInput(value.trim())
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }))
  }

  useEffect(() => {
    const cleanupSession = () => {
      sessionStorage.clear()
      axios.defaults.headers.common['Authorization'] = null
    }

    window.addEventListener('beforeunload', cleanupSession)
    return () => window.removeEventListener('beforeunload', cleanupSession)
  }, [])

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="font-cormorant text-6xl font-bold text-[#1A1A1A] mb-4">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
          <p className="font-cormorant text-2xl text-[#4A4A4A] max-w-3xl mx-auto">
            {isLogin ? 'Sign in to access your account' : 'Join us to get started'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white rounded-xl p-8 shadow-xl border border-[#E8E8E8]">
            {error && (
              <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 focus:ring-opacity-20 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 focus:ring-opacity-20 outline-none transition-all"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 focus:ring-opacity-20 outline-none transition-all"
                    required
                  />
                </div>
              )}

              {!isLogin && (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-600 focus:ring-opacity-20 outline-none transition-all"
                    required
                  />
                </div>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                />
                <label htmlFor="showPassword" className="ml-2 text-gray-600">
                  Show password
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                }}
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
              </button>
            </div>

            {isLogin && (
              <div className="mt-4 text-center">
                <Link to="/forgot-password" className="text-gray-600 hover:text-amber-600 text-sm">
                  Forgot your password?
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login