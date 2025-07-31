import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Home from './pages/Home'
import Files from './pages/Files'
import Notes from './pages/Notes'
import AnimatedBackground from './components/AnimatedBackground'

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/files" element={<Files />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </motion.div>
    </div>
  )
}

export default App 