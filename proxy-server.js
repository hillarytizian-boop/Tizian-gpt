const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Catch-all proxy handler for ALL methods and paths
app.use(async (req, res) => {
  try {
    const targetUrl = `https://api.binance.com${req.url}`;
    console.log(`[Proxy] ${req.method} ${targetUrl}`);

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: 'api.binance.com',
        'accept-encoding': 'identity',
      },
      body: req.method === 'GET' ? undefined : JSON.stringify(req.body),
    });

    const rawBody = await response.text();
    res.status(response.status);
    const contentType = response.headers.get('content-type');
    if (contentType) res.set('Content-Type', contentType);
    res.send(rawBody);
  } catch (error) {
    console.error('[Proxy] Error:', error.message);
    res.status(500).json({ error: 'Proxy error: ' + error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Proxy running on port ${port}`);
});
