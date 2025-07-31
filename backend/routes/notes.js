const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

// GET all notes
router.get('/', async (req, res) => {
  try {
    const { search, sort = 'lastEdited' } = req.query;
    
    let query = { isActive: true };
    if (search) {
      query = { 
        ...query,
        $text: { $search: search } 
      };
    }
    
    const sortOptions = {};
    sortOptions[sort] = -1; // Descending order
    
    const notes = await Note.find(query).sort(sortOptions);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new note
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    
    console.log('Creating note with:', { title, content });
    
    const note = new Note({
      title: title || 'Untitled Note',
      content: content || ''
    });

    const savedNote = await note.save();
    console.log('Note created successfully:', savedNote._id);
    res.status(201).json(savedNote);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ 
      error: error.message,
      details: error.stack 
    });
  }
});

// GET note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || !note.isActive) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    // Increment view count
    note.viewCount += 1;
    await note.save();
    
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update note
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const note = await Note.findById(req.params.id);
    if (!note || !note.isActive) {
      return res.status(404).json({ error: 'Note not found' });
    }

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    
    note.lastEdited = new Date();
    await note.save();
    
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE note (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    note.isActive = false;
    await note.save();
    
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT restore note
router.put('/:id/restore', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    note.isActive = true;
    await note.save();
    
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 