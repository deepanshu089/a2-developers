const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const demoSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Demo = mongoose.model('Demo', demoSchema);

// Root endpoint
app.get('/', (req, res) => {
  try {
    res.json({
      message: 'Welcome to A2 Developers API',
      version: '1.0.0',
      status: 'active',
      timestamp: new Date().toISOString(),
      endpoints: {
        root: '/',
        health: '/api/health',
        bookDemo: '/api/book-demo',
        listDemos: '/api/demos'
      }
    });
  } catch (error) {
    console.error('Error in root endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  try {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('Error in health check:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API Routes
app.post('/api/book-demo', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    const demo = new Demo({ name, email, company, message });
    await demo.save();
    res.status(201).json({ 
      message: 'Demo booked successfully!',
      demo: {
        id: demo._id,
        name: demo.name,
        email: demo.email,
        company: demo.company,
        createdAt: demo.createdAt
      }
    });
  } catch (error) {
    console.error('Error booking demo:', error);
    res.status(500).json({ error: 'Failed to book demo' });
  }
});

// Get all demos (for admin purposes)
app.get('/api/demos', async (req, res) => {
  try {
    const demos = await Demo.find().sort({ createdAt: -1 });
    res.json({
      count: demos.length,
      demos: demos.map(demo => ({
        id: demo._id,
        name: demo.name,
        email: demo.email,
        company: demo.company,
        createdAt: demo.createdAt
      }))
    });
  } catch (error) {
    console.error('Error fetching demos:', error);
    res.status(500).json({ error: 'Failed to fetch demos' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app; 