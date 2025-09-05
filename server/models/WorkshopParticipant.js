const mongoose = require('mongoose');

const workshopParticipantSchema = new mongoose.Schema({
  workshop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workshop',
    required: true
  },
  participant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

workshopParticipantSchema.index({ workshop: 1, participant: 1 }, { unique: true });

module.exports = mongoose.model('WorkshopParticipant', workshopParticipantSchema);