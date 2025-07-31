import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  FolderOpen, 
  FileText, 
  Zap, 
  Cloud, 
  Shield, 
  Star, 
  Heart, 
  Sparkles, 
  Target, 
  Palette,
  Upload,
  Download,
  Search,
  Edit,
  Save,
  Lock,
  Share,
  Archive
} from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  }

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.3 }
    }
  }

  const orbitVariants = {
    hidden: { rotate: 0 },
    visible: { 
      rotate: 360,
      transition: { 
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-200 to-indigo-300 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-cyan-200/30 to-indigo-200/40" />
        
        {/* Floating particles - More variety */}
        <motion.div
          className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full opacity-60"
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-2 h-2 bg-cyan-800 rounded-full opacity-70"
          animate={{
            y: [0, -40, 0],
            x: [0, -20, 0],
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div
          className="absolute bottom-32 left-1/4 w-4 h-4 bg-indigo-400 rounded-full opacity-50"
          animate={{
            y: [0, -35, 0],
            x: [0, 25, 0],
            opacity: [0.5, 0.9, 0.5],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/3 w-2 h-2 bg-sky-400 rounded-full opacity-80"
          animate={{
            y: [0, -25, 0],
            x: [0, -10, 0],
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.4, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-blue-300 rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            x: [0, 12, 0],
            opacity: [0.6, 0.9, 0.6],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        {/* Enhanced geometric shapes */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-40 h-40 border border-blue-200 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-32 h-32 border border-cyan-300/40 rounded-lg"
          animate={{
            rotate: -360,
            scale: [1, 0.7, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 border border-indigo-300/30 rounded-full"
          animate={{
            rotate: 180,
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-56 h-56 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-sm"
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-gradient-to-br from-indigo-200/20 to-blue-200/20 rounded-full blur-sm"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Additional light rays effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-300 to-transparent" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-300 to-transparent" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-indigo-300 to-transparent" />
        </div>
        
        {/* Additional blue floating elements */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-6 h-6 bg-blue-300 rounded-full opacity-40"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/6 w-4 h-4 bg-cyan-300 rounded-full opacity-50"
          animate={{
            y: [0, 15, 0],
            x: [0, -8, 0],
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-2/3 left-1/3 w-5 h-5 bg-indigo-300 rounded-full opacity-60"
          animate={{
            y: [0, -12, 0],
            x: [0, 15, 0],
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* Blue energy waves */}
        <motion.div
          className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Blue sparkles */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/3 w-2 h-2 bg-indigo-400 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        {/* Subtle wave effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-200/20 to-transparent"
          animate={{
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Blue glow orbs */}
        <motion.div
          className="absolute top-1/6 right-1/6 w-12 h-12 bg-blue-200/20 rounded-full blur-md"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/6 left-1/6 w-16 h-16 bg-cyan-200/15 rounded-full blur-md"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-2xl mx-auto"
        >
          {/* Center Logo with Rotating Icons - First */}
          <motion.div
            variants={logoVariants}
            whileHover="hover"
            className="relative flex justify-center items-center mb-16"
          >
            {/* Rotating Icons Around the Logo */}
            <motion.div
              variants={orbitVariants}
              className="absolute w-64 h-64 flex items-center justify-center"
            >
              {/* Icon 1 - Top */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                  <Upload className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Icon 2 - Right */}
              <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                  <Download className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Icon 3 - Bottom */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg">
                  <Search className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Icon 4 - Left */}
              <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                  <Edit className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Icon 5 - Top Right */}
              <div className="absolute top-10 right-10">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
                  <Save className="w-5 h-5 text-white" />
                </div>
              </div>
              
              {/* Icon 6 - Top Left */}
              <div className="absolute top-10 left-10">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                  <Lock className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Icon 7 - Bottom Right */}
              <div className="absolute bottom-10 right-10">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg">
                  <Share className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Icon 8 - Bottom Left */}
              <div className="absolute bottom-10 left-10">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                  <Archive className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Main Logo Circle */}
            <div className="w-40 h-40 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 relative overflow-hidden">
              {/* Inner glow */}
              <div className="absolute inset-3 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-80" />
              
              {/* File icons */}
              <div className="relative z-10 flex items-center justify-center">
                <FolderOpen className="w-16 h-16 text-white" />
                <FileText className="w-10 h-10 text-white absolute -top-3 -right-3" />
              </div>
              
              {/* Floating elements around logo */}
              <motion.div
                className="absolute -top-3 -left-3 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Zap className="w-4 h-4 text-white" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-3 -right-3 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{
                  y: [0, 8, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <Cloud className="w-3 h-3 text-white" />
              </motion.div>
            </div>
            
            {/* Outer ring */}
            <motion.div
              className="absolute w-40 h-40 border-2 border-blue-400/30 rounded-full"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>

          {/* App Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold text-slate-800 mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent"
          >
            Fylo
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-xl text-slate-700 mb-2"
          >
            Your Digital Workspace
          </motion.p>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-slate-600 mb-12"
          >
            Access your files and notes from anywhere, anytime
          </motion.p>

          {/* Navigation Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Files Button */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate('/files')}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] overflow-hidden"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative z-10 flex items-center justify-center gap-3">
                <FolderOpen className="w-6 h-6" />
                <span>Files</span>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            </motion.button>

            {/* Notes Button */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate('/notes')}
              className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] overflow-hidden"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative z-10 flex items-center justify-center gap-3">
                <FileText className="w-6 h-6" />
                <span>Notes</span>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home 