const express = require('express');
const router = express.Router();
const Material = require('../models/Material');
const { auth, adminAuth } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

// Get all materials (with filters)
router.get('/', async (req, res) => {
  try {
    const { class: classId, subject, type, search } = req.query;
    const query = { isActive: true };

    if (classId) query.class = classId;
    if (subject) query.subject = subject;
    if (type) query.type = type;
    if (search) {
      query.$text = { $search: search };
    }

    const materials = await Material.find(query)
      .populate('class', 'name classNumber')
      .populate('subject', 'name nameHindi')
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: materials.length,
      data: materials
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching materials',
      error: error.message
    });
  }
});

// Get single material
router.get('/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id)
      .populate('class', 'name classNumber')
      .populate('subject', 'name nameHindi')
      .populate('uploadedBy', 'name');

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found'
      });
    }

    // Increment views
    material.views += 1;
    await material.save();

    res.json({
      success: true,
      data: material
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching material',
      error: error.message
    });
  }
});

// Create new material (Admin only)
router.post('/', auth, upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, description, class: classId, subject, type, tags } = req.body;

    if (!req.files || !req.files.file) {
      return res.status(400).json({
        success: false,
        message: 'File is required'
      });
    }

    const material = new Material({
      title,
      description,
      class: classId,
      subject,
      type,
      fileUrl: `/uploads/materials/${req.files.file[0].filename}`,
      thumbnailUrl: req.files.thumbnail ? `/uploads/thumbnails/${req.files.thumbnail[0].filename}` : null,
      fileSize: req.files.file[0].size,
      tags: tags ? JSON.parse(tags) : [],
      uploadedBy: req.user._id
    });

    await material.save();

    res.status(201).json({
      success: true,
      message: 'Material uploaded successfully',
      data: material
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading material',
      error: error.message
    });
  }
});

// Update material (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found'
      });
    }

    res.json({
      success: true,
      message: 'Material updated successfully',
      data: material
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating material',
      error: error.message
    });
  }
});

// Delete material (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found'
      });
    }

    res.json({
      success: true,
      message: 'Material deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting material',
      error: error.message
    });
  }
});

// Track download
router.post('/:id/download', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (material) {
      material.downloads += 1;
      await material.save();
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
