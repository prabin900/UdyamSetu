const Session = require('../models/Session');
const Workshop = require('../models/Workshop');

const createSession = async (req, res) => {
  try {
    const { title, meetingLink, workshop } = req.body;
    
    if (!workshop) {
      return res.status(400).json({ message: 'Workshop is required' });
    }
    
    const session = new Session({
      title,
      meetingLink,
      workshop,
      createdBy: req.user._id
    });
    
    await session.save();
    
    await Workshop.findByIdAndUpdate(workshop, {
      $push: { sessions: session._id }
    });
    
    res.status(201).json({ message: 'Session created successfully', session });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate('workshop', 'title')
      .populate('createdBy', 'name');
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createSession, getSessions };