import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Talk from './pages/Talk'
import Done from './pages/Done'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"     element={<Home />} />
        <Route path="/talk" element={<Talk />} />
        <Route path="/done" element={<Done />} />
      </Routes>
    </BrowserRouter>
  )
}
