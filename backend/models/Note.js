const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    default: 'Untitled Note'
  },
  content: {
    type: String,
    default: ''   // ✅ changed here
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastEdited: {
    type: Date,
    default: Date.now
  },
  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});


// Index for search functionality
noteSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Note', noteSchema); 