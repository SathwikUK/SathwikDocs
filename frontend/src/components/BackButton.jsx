import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/')}
      className="flex items-center gap-2 px-4 py-2 bg-vault-200 hover:bg-vault-300 text-vault-700 rounded-lg transition-colors duration-200 font-medium"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Vault
    </motion.button>
  )
}

export default BackButton 