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
                <AboutSection />
                <FAQ />
                <BlogCards />
                <WhyChooseUs />
              </>
            } />
            <Route path="/services" element={<LawServicePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog1" element={<BlogView />} />
          </Routes>
        </main>
        <Footer />
        <StickyContact />
      </div>
    </Router>
  )
}

export default App