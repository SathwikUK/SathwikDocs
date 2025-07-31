import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Search, 
  FileText, 
  Image, 
  File, 
  Download, 
  Trash2, 
  Edit2, 
  Eye,
  SortAsc,
  SortDesc,
  ArrowLeft,
  X,
  Play,
  Maximize2
} from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { format } from 'date-fns'
import BackButton from '../components/BackButton'
import { filesAPI } from '../services/api'

const Files = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('uploadDate')
  const [uploading, setUploading] = useState(false)
  const [editingFile, setEditingFile] = useState(null)
  const [newFileName, setNewFileName] = useState('')
  const [previewFile, setPreviewFile] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [filteredFiles, setFilteredFiles] = useState([])

  useEffect(() => {
    fetchFiles()
  }, [sortBy])

  useEffect(() => {
    // Filter files based on search term (partial match)
    if (searchTerm.trim() === '') {
      setFilteredFiles(files)
    } else {
      const filtered = files.filter(file => 
        file.originalName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredFiles(filtered)
    }
  }, [searchTerm, files])

  const fetchFiles = async () => {
    try {
      setLoading(true)
      const response = await filesAPI.getAll('', sortBy)
      setFiles(response.data)
    } catch (error) {
      console.error('Error fetching files:', error)
    } finally {
      setLoading(false)
    }
  }

  const onDrop = async (acceptedFiles) => {
    setUploading(true)
    try {
      for (const file of acceptedFiles) {
        await filesAPI.upload(file)
      }
      fetchFiles()
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setUploading(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc']
    },
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const handleDownload = async (file) => {
    try {
      const response = await filesAPI.download(file._id)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', file.originalName)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      fetchFiles() // Refresh to update download count
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  const handlePreview = async (file) => {
    if (file.mimeType.includes('image')) {
      try {
        // Show loading state immediately
        setPreviewFile({ ...file, previewUrl: null })
        setShowPreview(true)
        
        // Load the image in background
        const response = await filesAPI.download(file._id)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        setPreviewFile({ ...file, previewUrl: url })
      } catch (error) {
        console.error('Error loading preview:', error)
        setShowPreview(false)
        setPreviewFile(null)
      }
    }
  }

  const handleDelete = async (fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await filesAPI.delete(fileId)
        fetchFiles()
      } catch (error) {
        console.error('Error deleting file:', error)
      }
    }
  }

  const handleRename = async (fileId) => {
    if (!newFileName.trim()) return
    
    try {
      await filesAPI.rename(fileId, newFileName.trim())
      setEditingFile(null)
      setNewFileName('')
      fetchFiles()
    } catch (error) {
      console.error('Error renaming file:', error)
      alert('Error renaming file. Please try again.')
    }
  }

  const getFileIcon = (mimeType) => {
    if (mimeType.includes('pdf')) return <FileText className="w-6 h-6 text-red-500" />
    if (mimeType.includes('image')) return <Image className="w-6 h-6 text-green-500" />
    return <File className="w-6 h-6 text-blue-500" />
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (date) => {
    const now = new Date()
    const fileDate = new Date(date)
    const diffTime = Math.abs(now - fileDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) {
      return 'Today'
    } else if (diffDays === 2) {
      return 'Yesterday'
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`
    } else {
      return format(fileDate, 'MMM dd, yyyy')
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

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
                 {/* Header */}
         <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex items-center justify-between mb-8"
         >
           <div className="flex items-center gap-4">
             <h1 className="text-3xl font-bold text-slate-800">Files Manager</h1>
             <div className="h-6 w-px bg-slate-300"></div>
             <p className="text-slate-600">Manage your uploaded files</p>
           </div>
           <BackButton />
         </motion.div>

        {/* Search and Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search files by name..."
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
              <option value="uploadDate">Upload Date</option>
              <option value="originalName">Name</option>
              <option value="fileSize">Size</option>
              <option value="downloadCount">Downloads</option>
            </select>
          </div>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 bg-white/60 backdrop-blur-sm ${
              isDragActive
                ? 'border-blue-500 bg-blue-50/80 shadow-lg'
                : 'border-slate-300 hover:border-blue-400 hover:bg-white/80 hover:shadow-lg'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            {uploading ? (
              <p className="text-blue-600 font-medium">Uploading...</p>
            ) : isDragActive ? (
              <p className="text-blue-600 font-medium">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-slate-700 font-medium mb-2">
                  Drag & drop files here, or click to select
                </p>
                <p className="text-sm text-slate-500">
                  Supports PDF, PNG, JPG, DOCX (Max 10MB)
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Files Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
                     className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence>
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-slate-600">Loading files...</p>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600 text-lg">No files found</p>
                <p className="text-slate-500">Upload your first file to get started</p>
              </div>
            ) : (
              filteredFiles.map((file) => (
                <motion.div
                  key={file._id}
                  variants={itemVariants}
                  layout
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border border-slate-200/50"
                >
                                     <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-3 flex-1 min-w-0">
                       {getFileIcon(file.mimeType)}
                       <div className="flex-1 min-w-0">
                         {editingFile === file._id ? (
                           <div className="flex flex-col gap-2">
                             <input
                               type="text"
                               value={newFileName}
                               onChange={(e) => setNewFileName(e.target.value)}
                               className="w-full px-3 py-1 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               autoFocus
                             />
                             <div className="flex gap-2">
                               <button
                                 onClick={() => handleRename(file._id)}
                                 className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                               >
                                 Save
                               </button>
                               <button
                                 onClick={() => {
                                   setEditingFile(null)
                                   setNewFileName('')
                                 }}
                                 className="px-3 py-1 text-xs bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                               >
                                 Cancel
                               </button>
                             </div>
                           </div>
                         ) : (
                           <h3 className="font-semibold text-slate-800 break-words leading-tight">
                             {file.originalName}
                           </h3>
                         )}
                       </div>
                     </div>
                   </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Size:</span>
                      <span className="font-medium">{formatFileSize(file.fileSize)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Uploaded:</span>
                      <span className="font-medium">{formatDate(file.uploadDate)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Downloads:</span>
                      <span className="font-medium">{file.downloadCount}</span>
                    </div>
                  </div>

                                     <div className="flex gap-2 flex-wrap">
                     {file.mimeType.includes('image') && (
                       <button
                         onClick={() => handlePreview(file)}
                         className="flex-1 min-w-[60px] bg-emerald-500 hover:bg-emerald-600 text-white text-sm py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                         title="Preview"
                       >
                         <Eye className="w-4 h-4" />
                       </button>
                     )}
                     <button
                       onClick={() => handleDownload(file)}
                       className="flex-1 min-w-[60px] bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                       title="Download"
                     >
                       <Download className="w-4 h-4" />
                     </button>
                     <button
                       onClick={() => {
                         setEditingFile(file._id)
                         setNewFileName(file.originalName.replace(/\.[^/.]+$/, ''))
                       }}
                       className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm py-2 px-3 rounded-lg transition-colors flex items-center justify-center min-w-[40px]"
                       title="Rename"
                     >
                       <Edit2 className="w-4 h-4" />
                     </button>
                     <button
                       onClick={() => handleDelete(file._id)}
                       className="bg-red-100 hover:bg-red-200 text-red-600 text-sm py-2 px-3 rounded-lg transition-colors flex items-center justify-center min-w-[40px]"
                       title="Delete"
                     >
                       <Trash2 className="w-4 h-4" />
                     </button>
                   </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Image Preview Modal */}
      {showPreview && previewFile && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800">{previewFile.originalName}</h3>
              <button
                onClick={() => {
                  setShowPreview(false)
                  setPreviewFile(null)
                  if (previewFile.previewUrl) {
                    window.URL.revokeObjectURL(previewFile.previewUrl)
                  }
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              {previewFile.previewUrl ? (
                <img
                  src={previewFile.previewUrl}
                  alt={previewFile.originalName}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-slate-600">Loading preview...</span>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 p-4 border-t border-slate-200">
              <button
                onClick={() => handleDownload(previewFile)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Files 