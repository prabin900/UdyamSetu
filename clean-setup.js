const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function cleanSetup() {
    try {
        console.log('🧹 Starting fresh and clean setup...\n');

        // Connect to MongoDB
        console.log('📡 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // Drop all collections
        console.log('🗑️  Dropping all collections...');
        const collections = await mongoose.connection.db.listCollections().toArray();
        
        for (const collection of collections) {
            await mongoose.connection.db.dropCollection(collection.name);
            console.log(`   ✅ Dropped ${collection.name}`);
        }
        
        if (collections.length === 0) {
            console.log('   ℹ️  No collections found to drop');
        }

        // Clean uploads directory
        console.log('\n📁 Cleaning uploads directory...');
        const uploadsDir = path.join(__dirname, 'uploads');
        
        if (fs.existsSync(uploadsDir)) {
            const files = fs.readdirSync(uploadsDir);
            for (const file of files) {
                if (file !== '.gitkeep') {
                    fs.unlinkSync(path.join(uploadsDir, file));
                    console.log(`   ✅ Removed ${file}`);
                }
            }
            if (files.length <= 1) {
                console.log('   ℹ️  Uploads directory already clean');
            }
        } else {
            fs.mkdirSync(uploadsDir, { recursive: true });
            console.log('   ✅ Created uploads directory');
        }

        // Create .gitkeep file in uploads
        const gitkeepPath = path.join(uploadsDir, '.gitkeep');
        if (!fs.existsSync(gitkeepPath)) {
            fs.writeFileSync(gitkeepPath, '');
            console.log('   ✅ Created .gitkeep in uploads');
        }

        console.log('\n🎉 Fresh and clean setup completed successfully!');
        console.log('\n📋 Next steps:');
        console.log('   1. Run: npm start');
        console.log('   2. Visit: http://localhost:5555');
        console.log('   3. Register a new account or create admin');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error during clean setup:', error.message);
        process.exit(1);
    }
}

cleanSetup();