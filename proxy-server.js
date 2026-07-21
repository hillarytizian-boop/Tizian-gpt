const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(`[Proxy] ${req.method} ${req.url}`);
  next();
});

// Proxy all requests to Binance API
app.use(
  '/',
  createProxyMiddleware({
    target: 'https://api.binance.com',
    changeOrigin: true,
    secure: true,
    logLevel: 'debug',
    onError: (err, req, res) => {
      console.error('[Proxy] Error:', err.message);
      res.status(500).json({ error: 'Proxy error: ' + err.message });
    },
  })
);

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Proxy running on port ${port}`);
});
