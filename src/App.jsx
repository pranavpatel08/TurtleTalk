import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TurtleTest from './pages/TurtleTest'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/turtle-test" element={<TurtleTest />} />
        <Route path="/" element={<h1>TurtleTalk</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
