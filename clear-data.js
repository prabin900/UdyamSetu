require('dotenv').config();
const mongoose = require('mongoose');
const Workshop = require('./server/models/Workshop');
const Material = require('./server/models/Material');
const Session = require('./server/models/Session');
const WorkshopParticipant = require('./server/models/WorkshopParticipant');

const clearData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    await WorkshopParticipant.deleteMany({});
    await Session.deleteMany({});
    await Material.deleteMany({});
    await Workshop.deleteMany({});
    
    console.log('All workshops, materials, sessions, and participants deleted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

clearData();