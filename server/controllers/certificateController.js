const Certificate = require('../models/Certificate');
const Workshop = require('../models/Workshop');
const WorkshopParticipant = require('../models/WorkshopParticipant');

const generateCertificate = async (req, res) => {
  try {
    const { workshopId } = req.params;
    
    const participant = await WorkshopParticipant.findOne({
      workshop: workshopId,
      participant: req.user._id
    });
    
    if (!participant) {
      return res.status(403).json({ message: 'Not enrolled in this workshop' });
    }
    
    const existingCert = await Certificate.findOne({
      user: req.user._id,
      workshop: workshopId
    });
    
    if (existingCert) {
      return res.status(400).json({ message: 'Certificate already generated' });
    }
    
    const certificateId = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const certificate = new Certificate({
      user: req.user._id,
      workshop: workshopId,
      certificateId
    });
    
    await certificate.save();
    await certificate.populate(['user', 'workshop']);
    
    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUserCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ user: req.user._id })
      .populate('workshop', 'title description')
      .sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { generateCertificate, getUserCertificates };