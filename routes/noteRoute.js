const express = require('express');
const router = express.Router();
const notesModel = require('../models/notesModel');

// create a note
router.post('/create', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    const newNote = new notesModel({
      title,
      description,
    });

    // save note to database
    const savedNote = await newNote.save();

    res.status(201).json({
      message: 'Note created successfully',
      note: savedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await notesModel.find();
    res.status(200).json({
      message: 'All notes',
      notes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// update a note color
router.put('/update/:id/:color', async (req, res) => {
  try {
    const { id, color } = req.params;
    const note = await notesModel.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    note.color = color;
    await note.save();
    res.status(200).json({
      message: 'Note updated successfully',
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// delete a note
router.delete('/delete/:id', async (req, res) => {
  try {
    const note = await notesModel.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }
    await note.remove();
    res.status(200).json({
      message: 'Note deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
