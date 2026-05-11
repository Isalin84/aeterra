import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import AIAdvisorWidget from './components/layout/AIAdvisorWidget'
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

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
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
        </Routes>
      </main>
      <Footer />
      <AIAdvisorWidget />
    </BrowserRouter>
  )
}
