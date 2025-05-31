const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Log environment variables (excluding sensitive data)
console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  FRONTEND_URL: process.env.FRONTEND_URL,
  MONGODB_CONNECTED: false,
  VERCEL: process.env.VERCEL ? 'true' : 'false'
});

// CORS configuration
const corsOptions = {
  origin: ['https://a2-developers.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

console.log('CORS Options:', corsOptions);

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection with retry logic
let isConnecting = false;
let connectionAttempts = 0;
const MAX_RETRIES = 5;

const connectDB = async () => {
  if (isConnecting) {
    console.log('Connection attempt already in progress...');
    return;
  }

  if (connectionAttempts >= MAX_RETRIES) {
    console.error('Max connection attempts reached');
    return;
  }

  try {
    isConnecting = true;
    connectionAttempts++;

    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is missing in environment variables');
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    console.log(`Connection attempt ${connectionAttempts} of ${MAX_RETRIES}`);
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      MONGO_URI_EXISTS: !!process.env.MONGO_URI,
      MONGO_URI_LENGTH: process.env.MONGO_URI.length,
      MONGO_URI_START: process.env.MONGO_URI.substring(0, 20) + '...',
      VERCEL: process.env.VERCEL ? 'true' : 'false'
    });

    // Close existing connection if any
    if (mongoose.connection.readyState !== 0) {
      console.log('Closing existing connection...');
      await mongoose.connection.close();
    }

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      retryReads: true,
      // Add these options for serverless
      keepAlive: true,
      keepAliveInitialDelay: 300000
    };

    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, options);
    
    console.log('MongoDB connected successfully');
    console.log('Connection state:', mongoose.connection.readyState);
    console.log('Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      FRONTEND_URL: process.env.FRONTEND_URL,
      MONGODB_CONNECTED: true,
      DB_NAME: mongoose.connection.name,
      VERCEL: process.env.VERCEL ? 'true' : 'false'
    });

    // Reset connection attempts on successful connection
    connectionAttempts = 0;
  } catch (error) {
    console.error('MongoDB connection error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });

    if (connectionAttempts < MAX_RETRIES) {
      const delay = Math.min(1000 * Math.pow(2, connectionAttempts), 30000);
      console.log(`Retrying connection in ${delay/1000} seconds... (Attempt ${connectionAttempts + 1}/${MAX_RETRIES})`);
      setTimeout(connectDB, delay);
    } else {
      console.error('Max connection attempts reached. Please check your MongoDB configuration.');
    }
  } finally {
    isConnecting = false;
  }
};

// Initial connection
connectDB();

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error event:', {
    name: err.name,
    message: err.message,
    code: err.code
  });
  // Attempt to reconnect on error
  if (!isConnecting) {
    connectDB();
  }
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Current state:', mongoose.connection.readyState);
  // Attempt to reconnect on disconnect
  if (!isConnecting) {
    connectDB();
  }
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected. New state:', mongoose.connection.readyState);
  connectionAttempts = 0;
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }
  next();
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
      environment: process.env.NODE_ENV || 'development',
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

// Health check endpoint with detailed status
app.get('/api/health', (req, res) => {
  const mongoState = mongoose.connection.readyState;
  const mongoStatus = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  }[mongoState] || 'unknown';

  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongodb: mongoStatus,
    environment: process.env.NODE_ENV || 'development',
    connectionAttempts,
    isConnecting,
    vercel: process.env.VERCEL ? 'true' : 'false'
  });
});

// API Routes
app.post('/api/book-demo', async (req, res) => {
  try {
    console.log('Received demo request:', req.body);
    const { name, email, company, message } = req.body;
    
    if (!name || !email) {
      console.log('Validation failed: missing required fields');
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed: invalid email format');
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB not connected');
      return res.status(500).json({ error: 'Database connection error' });
    }

    const demo = new Demo({ name, email, company, message });
    await demo.save();
    console.log('Demo saved successfully:', demo);
    
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
    // Send more specific error message
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Invalid data provided' });
    }
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(400).json({ error: 'A demo request with this email already exists' });
    }
    res.status(500).json({ 
      error: 'Failed to book demo',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
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
  console.log('404 Not Found:', req.url);
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