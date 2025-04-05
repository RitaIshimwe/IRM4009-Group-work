require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000' // Your frontend URL
}));
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send(`
    <h1>Clinic Backend Service</h1>
    <p>Available endpoints:</p>
    <ul>
      <li>POST /api/chat - Chatbot API</li>
      <li>GET /health - Service health check</li>
    </ul>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// DeepSeek Proxy Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    console.log('Received chat request');
    
    const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
      model: "deepseek-chat",
      messages: req.body.messages,
      temperature: 0.7,
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({ 
      error: 'AI service unavailable',
      details: error.message 
    });
  }
});

// 404 Handler (must be last)
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`\nBackend services running:`);
  console.log(`- Local: http://localhost:${PORT}`);
  console.log(`- Chat API: http://localhost:${PORT}/api/chat`);
  console.log(`- Health check: http://localhost:${PORT}/health\n`);
});