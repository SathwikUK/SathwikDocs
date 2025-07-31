# Fylo - Your Digital Workspace

A full-stack web application for easy file and notes management with a modern, futuristic UI and complete CRUD functionality.

## 🚀 Features

### 🖼 Frontend
- **Modern UI**: Built with Vite + React and Tailwind CSS
- **Beautiful Animations**: Framer Motion animations throughout the app
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Rich Text Editor**: React Quill for note creation and editing
- **Drag & Drop**: File upload with drag and drop support
- **Real-time Search**: Instant search functionality for files and notes
- **Auto-save**: Notes auto-save every 2 seconds of inactivity

### 📁 Files Management
- Upload files (PDF, PNG, JPG, DOCX, DOC)
- File preview and download
- Rename files with duplicate handling
- Delete files
- Search and filter files
- File size and download statistics
- Drag & drop upload

### 📝 Notes Management
- Rich text editor with formatting options
- Create, edit, and delete notes
- Auto-save functionality
- Search and sort notes
- Note preview with timestamps
- View count tracking

### 🗃 Backend
- **Node.js + Express** server
- **MongoDB** database with Mongoose ODM
- **Multer** for file upload handling
- **RESTful APIs** for all operations
- **File storage** with metadata tracking
- **Search functionality** with text indexing

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **React Quill** - Rich text editor
- **React Dropzone** - File upload
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Date-fns** - Date formatting

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifiers

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Fylo
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=4000
   MONGODB_URI=mongodb+srv://SathwikUK:Sath%40projects123@projects.7zbjzgv.mongodb.net/projects?retryWrites=true&w=majority
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

   This will start both frontend (port 3000) and backend (port 4000) servers.

## 🎯 Usage

### Homepage
- Navigate to `http://localhost:3000`
- Click on "Files" or "Notes" buttons to access respective sections

### Files Management
- **Upload**: Drag & drop files or click to select
- **Search**: Use the search bar to find files
- **Sort**: Sort by upload date, name, size, or downloads
- **Actions**: Download, rename, or delete files
- **Preview**: View file details and statistics

### Notes Management
- **Create**: Click "New Note" to create a note
- **Edit**: Click on any note to edit in the rich text editor
- **Auto-save**: Notes save automatically every 2 seconds
- **Search**: Search through note titles and content
- **Sort**: Sort by last edited, created date, or title

## 🔧 API Endpoints

### Files
- `GET /api/files` - Get all files
- `POST /api/files/upload` - Upload a file
- `GET /api/files/:id` - Get file by ID
- `PUT /api/files/rename/:id` - Rename a file
- `DELETE /api/files/:id` - Delete a file
- `GET /api/files/download/:id` - Download a file

### Notes
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get note by ID
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note
- `PUT /api/notes/:id/restore` - Restore a deleted note

## 🎨 UI Features

### Animations
- Smooth page transitions
- Floating particles background
- Hover effects on buttons and cards
- Loading animations
- Staggered list animations

### Design
- Modern, clean interface
- Card-based layout
- Responsive grid system
- Beautiful gradients and shadows
- Consistent color scheme

## 🔒 Security Features

- File type validation
- File size limits (10MB)
- Secure file storage
- Input sanitization
- CORS protection

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
cd backend
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**SathwikUK** - Full-stack developer

---

**Fylo** - Your personal digital workspace for files and notes! 🚀✨ 