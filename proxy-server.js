const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.use(async (req, res) => {
  try {
    const targetUrl = `https://api.binance.com${req.url}`;
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: { ...req.headers, host: 'api.binance.com' },
      body: req.method === 'GET' ? undefined : JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Binance proxy running on port ${process.env.PORT || 3000}`);
});
