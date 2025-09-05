const Workshop = require('../models/Workshop');
const Material = require('../models/Material');
const WorkshopParticipant = require('../models/WorkshopParticipant');

const createWorkshop = async (req, res) => {
  try {
    const { title, description, date, meetingLink } = req.body;
    
    const workshop = new Workshop({
      title,
      description,
      date,
      meetingLink,
      createdBy: req.user._id
    });
    
    await workshop.save();
    res.status(201).json({ message: 'Workshop created successfully', workshop });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find()
      .populate('createdBy', 'name')
      .populate('materials')
      .sort({ createdAt: -1 });
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addMaterialToWorkshop = async (req, res) => {
  try {
    const { workshopId } = req.params;
    const { materialId } = req.body;
    
    await Workshop.findByIdAndUpdate(workshopId, {
      $push: { materials: materialId }
    });
    
    await Material.findByIdAndUpdate(materialId, {
      workshop: workshopId
    });
    
    res.json({ message: 'Material added to workshop successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const joinWorkshop = async (req, res) => {
  try {
    const { workshopId } = req.params;
    
    const existing = await WorkshopParticipant.findOne({
      workshop: workshopId,
      participant: req.user._id
    });
    
    if (existing) {
      return res.status(400).json({ message: 'Already joined this workshop' });
    }
    
    await new WorkshopParticipant({
      workshop: workshopId,
      participant: req.user._id
    }).save();
    
    res.json({ message: 'Joined workshop successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getJoinedWorkshops = async (req, res) => {
  try {
    const joined = await WorkshopParticipant.find({ participant: req.user._id })
      .populate('workshop');
    res.json(joined.map(j => j.workshop));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createWorkshop, getWorkshops, addMaterialToWorkshop, joinWorkshop, getJoinedWorkshops };