import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Helmet } from 'react-helmet-async'
import LawServicePage from './pages/LawServicePage'
import AboutSection from './components/AboutSection'
import BlogCards from './BlogCards'
import WhyChooseUs from './components/WhyChooseUs'
import Footer from './components/Footer'
import HeroSlider from './components/HeroSlider'
import Header from './components/Header'
import FAQ from './components/FAQ'
import StickyContact from './components/StickyContact'
import BlogPage from './pages/BlogsPage'
import BlogView from './pages/BlogView'
import LawServices from './components/LawServices'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Login from './pages/Login'
import AddBlog from './pages/AddBlog'

import Calendar from './components/Calendar'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import ReactGA from 'react-ga4';
import Dashboard from './components/Dashboard';
import WorkWithUs from './components/WorkWIthUs';

ReactGA.initialize('G-HY94XWWJPE ');

const PrivateRoute = ({ children }) => {
  const userData = localStorage.getItem('userData')
  const tokens = localStorage.getItem('tokens')
  let user = null

  try {
    const parsedUserData = JSON.parse(userData)
    user = parsedUserData.user
  } catch (error) {
    return <Navigate to="/login" replace />
  }

  if (!user || !tokens) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Helmet>
            <title>Clause Craft Counsel | Legal Services & Consultation</title>
            <meta name="description" content="Professional legal services including corporate law, civil litigation, family law and more. Get expert legal consultation from our experienced attorneys." />
            <meta name="keywords" content="Clause Craft Counsel, legal services, attorneys, lawyers, legal consultation, corporate law, civil litigation" />
            <meta property="og:title" content="Clause Craft Counsel | Legal Services & Consultation" />
            <meta property="og:description" content="Professional legal services including corporate law, civil litigation, family law and more. Get expert legal consultation from our experienced attorneys." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.clausecraftcounsel.com" />
            <meta property="og:image" content="https://www.clausecraftcounsel.com/og-image.jpg" />
            <link rel="canonical" href="https://www.clausecraftcounsel.com" />
            <meta name="robots" content="index, follow" />
            <html lang="en" />
          </Helmet>
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={
                <>
                  <Helmet>
                    <title>Login | ClauseCraftCounsel</title>
                    <meta name="description" content="Secure login portal for Law Firm Name clients and administrators." />
                    <meta name="robots" content="noindex, nofollow" />
                  </Helmet>
                  <Login />
                </>
              } />
              <Route path="/" element={
                <>
                  <Helmet>
                    <title>Home | ClauseCraftCounsel</title>
                    <meta name="description" content="Welcome to Law Firm Name. Expert legal services and consultation for all your legal needs." />
                  </Helmet>
                  <HeroSlider />
                  
                  <LawServices />
                  <WhyChooseUs />
                  <FAQ />
                  <BlogCards />
                </>
              } />
              <Route path="/services" element={
                <>
                  <Helmet>
                    <title>Legal Services | ClauseCraftCounsel</title>
                    <meta name="description" content="Comprehensive legal services including corporate law, civil litigation, family law, and more." />
                  </Helmet>
                  <LawServicePage />
                </>
              } />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogView />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/add-blog" element={
                <PrivateRoute>
                  <AddBlog />
                </PrivateRoute>
              } />
              <Route path="/privacy" element={
                <>
                  <Helmet>
                    <title>Privacy Policy | ClauseCraftCounsel</title>
                    <meta name="description" content="Our privacy policy outlines how we collect, use, and protect your personal information." />
                  </Helmet>
                  <PrivacyPolicy />
                </>
              } />
              <Route path="/terms" element={
                <>
                  <Helmet>
                    <title>Terms and Conditions | ClauseCraftCounsel</title>
                    <meta name="description" content="Terms and conditions for using ClauseCraft Counsel's legal services and platform." />
                    <meta name="robots" content="noindex, nofollow" />
                  </Helmet>
                  <TermsAndConditions />
                </>
              } />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/work-with-us" element={<WorkWithUs />} />
            </Routes>
          </main>
          <Footer />
          <StickyContact />
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App