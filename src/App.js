import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <HeroSlider />
                <LawServices />
                <WhyChooseUs />
                <FAQ />
                <BlogCards />
              </>
            } />
            <Route path="/services" element={<LawServicePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog1" element={<BlogView />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
        <StickyContact />
      </div>
    </Router>
  )
}

export default App