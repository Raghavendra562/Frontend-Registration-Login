import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <div className="site">
        <Header />
        <main className="site-main">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}