import { useState, useEffect, useRef, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  FileText, 
  Edit2, 
  Trash2, 
  Save,
  X,
  Clock,
  Eye,
  CheckCircle,
  Sparkles,
  Tag,
  Download,
  Star,
  Bookmark,
  Share2,
  Grid,
  List,
  Palette,
  Bold,
  Italic,
  Underline,
  List as ListIcon,
  Link,
  Image as ImageIcon,
  Code,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Archive,
  Pin,
  Copy,
  MoreVertical
} from 'lucide-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { format } from 'date-fns'
import BackButton from '../components/BackButton'
import { notesAPI } from '../services/api'

// Create a forwardRef wrapper for ReactQuill to avoid findDOMNode warning
const QuillEditor = forwardRef((props, ref) => {
  return <ReactQuill {...props} ref={ref} />
})
QuillEditor.displayName = 'QuillEditor'

const Notes = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('lastEdited')
  const [selectedNote, setSelectedNote] = useState(null)
  const [editingNote, setEditingNote] = useState(null)
  const [showEditor, setShowEditor] = useState(false)
  const [autoSaveTimer, setAutoSaveTimer] = useState(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const quillRef = useRef(null)

  useEffect(() => {
    fetchNotes()
  }, [sortBy])



  useEffect(() => {
    if (editingNote && autoSaveTimer) {
      clearTimeout(autoSaveTimer)
    }
  }, [editingNote])

  const fetchNotes = async () => {
    try {
      setLoading(true)
      const response = await notesAPI.getAll(searchTerm, sortBy)
      setNotes(response.data)
    } catch (error) {
      console.error('Error fetching notes:', error)
    } finally {
      setLoading(false)
    }
  }

  const createNewNote = async () => {
    try {
      const response = await notesAPI.create('Untitled Note', '')
      const newNote = response.data
      setNotes([newNote, ...notes])
      setSelectedNote(newNote)
      setEditingNote(newNote)
      setShowEditor(true)
    } catch (error) {
      console.error('Error creating note:', error)
    }
  }

  const handleNoteSelect = (note) => {
    setSelectedNote(note)
    setEditingNote(note)
    setShowEditor(true)
  }

  const handleSave = async (noteId, title, content) => {
    try {
      const response = await notesAPI.update(noteId, { title, content })
      const updatedNote = response.data
      setNotes(notes.map(note => note._id === noteId ? updatedNote : note))
      setEditingNote(updatedNote)
      setSelectedNote(updatedNote)
      
      // Show success feedback
      setSaveSuccess(true)
      setToastMessage('Note saved successfully! ✨')
      setShowToast(true)
      
      // Hide success state after 2 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 2000)
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    } catch (error) {
      console.error('Error saving note:', error)
      setToastMessage('Error saving note. Please try again.')
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    }
  }

  const handleAutoSave = (noteId, title, content) => {
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer)
    }
    
    const timer = setTimeout(() => {
      handleSave(noteId, title, content)
    }, 2000) // Auto-save after 2 seconds of inactivity
    
    setAutoSaveTimer(timer)
  }

  const handleDelete = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.delete(noteId)
        setNotes(notes.filter(note => note._id !== noteId))
        if (selectedNote?._id === noteId) {
          setSelectedNote(null)
          setEditingNote(null)
          setShowEditor(false)
        }
      } catch (error) {
        console.error('Error deleting note:', error)
      }
    }
  }

  const handleExport = (note) => {
    const content = note.content
    const blob = new Blob([content], { type: 'text/html' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${note.title}.html`
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  }

  const handleDuplicate = async (note) => {
    try {
      const response = await notesAPI.create(`${note.title} (Copy)`, note.content)
      const newNote = response.data
      setNotes([newNote, ...notes])
    } catch (error) {
      console.error('Error duplicating note:', error)
    }
  }

  const stripHtml = (html) => {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  const getNotePreview = (content) => {
    const text = stripHtml(content)
    return text.length > 100 ? text.substring(0, 100) + '...' : text
  }

  const formatDate = (date) => {
    const now = new Date()
    const noteDate = new Date(date)
    const diffTime = Math.abs(now - noteDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) {
      return 'Today'
    } else if (diffDays === 2) {
      return 'Yesterday'
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`
    } else {
      return format(noteDate, 'MMM dd, yyyy')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }

  const editorVariants = {
    hidden: { x: 300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }

  const filteredNotes = notes.filter(note => {
    if (searchTerm.trim() === '') return true
    return note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           stripHtml(note.content).toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="min-h-screen p-6 relative">
      {/* Beautiful Background Animations */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-200 to-indigo-300"></div>
        
        {/* Floating particles */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400/40 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-3/4 right-1/3 w-6 h-6 bg-indigo-400/50 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute top-1/2 left-3/4 w-3 h-3 bg-sky-400/30 rounded-full blur-sm"
        />
        
        {/* Enhanced geometric shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 right-1/3 w-56 h-56 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-sm"
        />
        
        {/* Floating orbs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/6 right-1/6 w-8 h-8 bg-blue-300/40 rounded-full blur-md"
        />
        <motion.div
          animate={{
            y: [0, 25, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-1/3 right-1/2 w-6 h-6 bg-indigo-300/50 rounded-full blur-md"
        />
        
        {/* Enhanced grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Light rays effect */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-indigo-400/15 to-transparent"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-sky-400/10 to-transparent"></div>
        
        {/* Subtle wave effect */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-400/20 via-transparent to-transparent"
        />
        
        {/* Blue energy waves */}
        <motion.div
          animate={{
            x: [-100, 100],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
        />
        <motion.div
          animate={{
            x: [100, -100],
            opacity: [0, 0.2, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent"
        />
        
        {/* Blue sparkles */}
        <motion.div
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 left-1/2 w-2 h-2 bg-blue-400 rounded-full"
        />
        <motion.div
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full"
        />
        <motion.div
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute top-1/2 left-1/6 w-1 h-1 bg-sky-400 rounded-full"
        />
        
        {/* Blue glow orbs */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-1/4 right-1/6 w-24 h-24 bg-indigo-400/25 rounded-full blur-xl"
        />
        
        {/* Additional floating bubbles */}
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 left-1/6 w-5 h-5 bg-cyan-400/50 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 35, 0],
            x: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3.5
          }}
          className="absolute bottom-1/4 left-2/3 w-4 h-4 bg-blue-300/60 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 25, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.4, 1]
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5
          }}
          className="absolute top-2/3 right-1/4 w-6 h-6 bg-indigo-300/40 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 45, 0],
            x: [0, -10, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4.5
          }}
          className="absolute top-1/6 left-3/4 w-3 h-3 bg-sky-300/70 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 18, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.25, 1]
          }}
          transition={{
            duration: 10.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8
          }}
          className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-blue-400/30 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 38, 0],
            x: [0, -12, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 12.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3.2
          }}
          className="absolute top-1/2 right-1/6 w-4 h-4 bg-indigo-400/45 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -35, 0],
            x: [0, 22, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.35, 1]
          }}
          transition={{
            duration: 15.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.8
          }}
          className="absolute bottom-1/6 right-2/3 w-6 h-6 bg-cyan-300/35 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, 42, 0],
            x: [0, -16, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 16.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4.2
          }}
          className="absolute top-3/4 left-1/2 w-4 h-4 bg-blue-300/55 rounded-full blur-sm"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-slate-800">Notes Manager</h1>
            <div className="h-6 w-px bg-slate-300"></div>
            <p className="text-slate-600">Create and manage your notes</p>
          </div>
          <BackButton />
        </motion.div>

        {/* Search, Sort, and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search notes by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="lastEdited">Last Edited</option>
              <option value="createdAt">Created Date</option>
              <option value="title">Title</option>
              <option value="viewCount">Most Viewed</option>
            </select>
            

            
            <div className="flex bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-3 transition-all duration-200 ${
                  viewMode === 'grid' ? 'bg-blue-500 text-white' : 'hover:bg-slate-100'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-3 transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-blue-500 text-white' : 'hover:bg-slate-100'
                }`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={createNewNote}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4" />
              New Note
            </motion.button>
          </div>
        </motion.div>



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notes List */}
          <div className="lg:col-span-1">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4' 
                  : 'space-y-3'
              }`}
            >
              <AnimatePresence>
                {loading ? (
                  <div className="col-span-full text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-slate-600">Loading notes...</p>
                  </div>
                ) : filteredNotes.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 text-lg">No notes found</p>
                    <p className="text-slate-500">Create your first note to get started</p>
                  </div>
                ) : (
                  filteredNotes.map((note) => (
                    <motion.div
                      key={note._id}
                      variants={itemVariants}
                      layout
                      onClick={() => handleNoteSelect(note)}
                      className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200/50 ${
                        selectedNote?._id === note._id
                          ? 'ring-2 ring-blue-500 bg-blue-50/50'
                          : 'hover:bg-white/90'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                          <h3 className="font-semibold text-slate-800 truncate">
                            {note.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDuplicate(note)
                            }}
                            className="text-slate-400 hover:text-blue-500 transition-colors p-1"
                            title="Duplicate"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleExport(note)
                            }}
                            className="text-slate-400 hover:text-green-500 transition-colors p-1"
                            title="Export"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(note._id)
                            }}
                            className="text-slate-400 hover:text-red-500 transition-colors p-1"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {getNotePreview(note.content)}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(note.lastEdited)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{note.viewCount || 0}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Editor */}
          <div className="lg:col-span-2">
            <AnimatePresence>
              {showEditor && editingNote && (
                <motion.div
                  variants={editorVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50 h-full ${
                    saveSuccess ? 'ring-2 ring-green-500 shadow-green-500/20' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <input
                      type="text"
                      value={editingNote.title}
                      onChange={(e) => {
                        const updatedNote = { ...editingNote, title: e.target.value }
                        setEditingNote(updatedNote)
                        handleAutoSave(editingNote._id, e.target.value, editingNote.content)
                      }}
                      className="text-2xl font-bold text-slate-800 bg-transparent border-none outline-none w-full"
                      placeholder="Note title..."
                    />
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSave(editingNote._id, editingNote.title, editingNote.content)}
                        className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                          saveSuccess 
                            ? 'bg-green-500 text-white shadow-lg' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        {saveSuccess ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <Sparkles className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Save
                          </>
                        )}
                      </motion.button>
                      <button
                        onClick={() => setShowEditor(false)}
                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 mb-4">
                    <QuillEditor
                      ref={quillRef}
                      value={editingNote.content}
                      onChange={(content) => {
                        const updatedNote = { ...editingNote, content }
                        setEditingNote(updatedNote)
                        handleAutoSave(editingNote._id, editingNote.title, content)
                      }}
                      placeholder="Start writing your note..."
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                          [{ 'color': [] }, { 'background': [] }],
                          [{ 'align': [] }],
                          ['link', 'image', 'code-block', 'blockquote'],
                          ['clean']
                        ]
                      }}
                      className="h-96"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-200">
                    <span>Last edited: {format(new Date(editingNote.lastEdited), 'MMM dd, yyyy HH:mm')}</span>
                    {autoSaveTimer && <span className="text-blue-600">Auto-saving...</span>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!showEditor && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50 h-full flex items-center justify-center"
              >
                <div className="text-center">
                  <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 text-lg mb-2">No note selected</p>
                  <p className="text-slate-500">Select a note from the list or create a new one</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl shadow-2xl p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-slate-700 font-medium">{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Notes 