const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const { auth, adminAuth } = require('../middleware/auth.middleware');

// Get all subjects
router.get('/', async (req, res) => {
  try {
    const { class: classId } = req.query;
    const query = { isActive: true };
    
    if (classId) {
      query.classes = classId;
    }

    const subjects = await Subject.find(query)
      .populate('classes', 'name classNumber')
      .sort({ name: 1 });
    
    res.json({
      success: true,
      count: subjects.length,
      data: subjects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subjects',
      error: error.message
    });
  }
});

// Get single subject
router.get('/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id)
      .populate('classes', 'name classNumber');
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.json({
      success: true,
      data: subject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching subject',
      error: error.message
    });
  }
});

// Create new subject (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();

    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      data: subject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating subject',
      error: error.message
    });
  }
});

// Update subject (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.json({
      success: true,
      message: 'Subject updated successfully',
      data: subject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating subject',
      error: error.message
    });
  }
});

// Delete subject (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.json({
      success: true,
      message: 'Subject deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting subject',
      error: error.message
    });
  }
});

module.exports = router;
