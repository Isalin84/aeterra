import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import AIAdvisorWidget from './components/layout/AIAdvisorWidget'
import ScrollToTop from './components/layout/ScrollToTop'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Story from './pages/Story'
import Sourcing from './pages/Sourcing'
import Lab from './pages/Lab'
import LabArticle from './pages/LabArticle'
import Advisor from './pages/Advisor'
import InnerCompassIndex from './pages/InnerCompass/Index'
import Manifesto from './pages/InnerCompass/Manifesto'
import Standards from './pages/InnerCompass/Standards'
import Knowledge from './pages/InnerCompass/Knowledge'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <a href="#content" className="skipLink">К содержимому</a>
      <Header />
      <main id="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:slug" element={<Product />} />
          <Route path="/story" element={<Story />} />
          <Route path="/sourcing" element={<Sourcing />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/lab/:slug" element={<LabArticle />} />
          <Route path="/advisor" element={<Advisor />} />
          <Route path="/inner-compass" element={<InnerCompassIndex />} />
          <Route path="/inner-compass/manifesto" element={<Manifesto />} />
          <Route path="/inner-compass/standards" element={<Standards />} />
          <Route path="/inner-compass/knowledge" element={<Knowledge />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <AIAdvisorWidget />
      </MotionConfig>
    </BrowserRouter>
  )
}
