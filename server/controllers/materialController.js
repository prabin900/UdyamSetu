const Material = require('../models/Material');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const createMaterial = async (req, res) => {
  try {
    const { title, description, type, link, workshop } = req.body;
    
    if (!workshop) {
      return res.status(400).json({ message: 'Workshop is required' });
    }
    
    const filePath = req.file ? req.file.path : null;

    const material = new Material({
      title,
      description,
      type,
      link,
      filePath,
      workshop,
      uploadedBy: req.user._id
    });

    await material.save();
    
    if (workshop) {
      const Workshop = require('../models/Workshop');
      await Workshop.findByIdAndUpdate(workshop, {
        $push: { materials: material._id }
      });
    }
    
    res.status(201).json({ message: 'Material created successfully', material });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find()
      .populate('uploadedBy', 'name')
      .populate('workshop', 'title');
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }
    
    if (material.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this material' });
    }
    
    await Material.findByIdAndDelete(req.params.id);
    res.json({ message: 'Material deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createMaterial, getMaterials, deleteMaterial, upload };