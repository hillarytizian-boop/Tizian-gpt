const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.use(async (req, res) => {
  try {
    const targetUrl = `https://api.binance.com${req.url}`;
    console.log(`[Proxy] Forwarding ${req.method} ${targetUrl}`);

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: 'api.binance.com',
        // Remove 'accept-encoding' to avoid compression issues
        'accept-encoding': 'identity',
      },
      body: req.method === 'GET' ? undefined : JSON.stringify(req.body),
    });

    console.log(`[Proxy] Binance responded with ${response.status}`);

    // Get the raw response body (could be JSON, HTML, or plain text)
    const rawBody = await response.text();

    // Forward status and headers
    res.status(response.status);

    // Set content-type from Binance
    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.set('Content-Type', contentType);
    }

    // Send the raw body back
    res.send(rawBody);
  } catch (error) {
    console.error('[Proxy] Error:', error.message);
    res.status(500).json({ error: 'Proxy internal error: ' + error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Binance proxy running on port ${process.env.PORT || 3000}`);
});
