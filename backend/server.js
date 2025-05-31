const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const demoSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  message: String,
});

const Demo = mongoose.model('Demo', demoSchema);

app.post('/api/book-demo', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;
    const demo = new Demo({ name, email, company, message });
    await demo.save();
    res.status(201).json({ message: 'Demo booked successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to book demo' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 