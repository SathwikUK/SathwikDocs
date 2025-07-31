const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const File = require('../models/File');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, PNG, JPG, and DOCX files are allowed.'), false);
    }
  }
});

// GET all files
router.get('/', async (req, res) => {
  try {
    const { search, sort = 'uploadDate' } = req.query;
    
    let query = {};
    if (search) {
      query = { $text: { $search: search } };
    }
    
    const sortOptions = {};
    sortOptions[sort] = -1; // Descending order
    
    const files = await File.find(query).sort(sortOptions);
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST upload file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      mimeType: req.file.mimetype
    });

    await file.save();
    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET file by ID
router.get('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    // Increment view count
    file.viewCount += 1;
    await file.save();
    
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT rename file
router.put('/rename/:id', async (req, res) => {
  try {
    const { newName } = req.body;
    if (!newName) {
      return res.status(400).json({ error: 'New name is required' });
    }

    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Check for duplicate names
    const existingFile = await File.findOne({ 
      filename: { $regex: new RegExp(`^${newName}\\..*$`) },
      _id: { $ne: req.params.id }
    });

    if (existingFile) {
      return res.status(400).json({ error: 'A file with this name already exists' });
    }

    // Get file extension
    const ext = path.extname(file.originalName);
    const newFilename = `${newName}${ext}`;
    
    // Rename the actual file
    const oldPath = file.filePath;
    const newPath = path.join(path.dirname(oldPath), `${uuidv4()}-${newFilename}`);
    
    fs.renameSync(oldPath, newPath);
    
    // Update database
    file.filename = path.basename(newPath);
    file.originalName = newFilename;
    file.filePath = newPath;
    file.lastModified = new Date();
    
    await file.save();
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE file
router.delete('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete physical file
    if (fs.existsSync(file.filePath)) {
      fs.unlinkSync(file.filePath);
    }

    await File.findByIdAndDelete(req.params.id);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET download file
router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (!fs.existsSync(file.filePath)) {
      return res.status(404).json({ error: 'File not found on disk' });
    }

    // Increment download count
    file.downloadCount += 1;
    await file.save();

    res.download(file.filePath, file.originalName);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 