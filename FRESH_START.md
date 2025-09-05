# 🚀 Fresh Start Guide

## Quick Setup

1. **Clean everything and start fresh:**
   ```bash
   npm run fresh
   ```

2. **Or step by step:**
   ```bash
   npm run clean    # Clean database and files
   npm start        # Start the server
   ```

## What gets cleaned:

- ✅ All MongoDB collections dropped
- ✅ All uploaded files removed (except .gitkeep)
- ✅ Fresh database state
- ✅ Clean uploads directory

## After fresh start:

1. Visit: http://localhost:5555
2. Register your first account
3. Create admin user if needed: `node create-admin.js`

## Environment:

- Port: 5555
- Database: MongoDB (localhost:27017/udyamsetu)
- Uploads: ./uploads/

---

**Ready to go! 🎉**