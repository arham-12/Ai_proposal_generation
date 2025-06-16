import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MakeProposal from './pages/MakeProposal'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MakeProposal/>} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
          <Route path="/services" element={<h1>Services Page</h1>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
