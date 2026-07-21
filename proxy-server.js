const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  // Forward HTTP requests to Binance
  proxy.web(req, res, { target: 'https://api.binance.com', changeOrigin: true });
});

// Handle CONNECT method (for HTTPS tunneling)
server.on('connect', (req, socket, head) => {
  proxy.proxyRequest(req, socket, head, {
    target: 'https://api.binance.com',
    changeOrigin: true,
  });
});

const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
  console.log(`🚀 CONNECT proxy running on port ${port}`);
});
