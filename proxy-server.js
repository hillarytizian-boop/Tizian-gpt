const http = require('http');
const net = require('net');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

// Handle regular HTTP requests
const server = http.createServer((req, res) => {
  proxy.web(req, res, { 
    target: 'https://api.binance.com', 
    changeOrigin: true 
  });
});

// Handle CONNECT for HTTPS tunneling
server.on('connect', (req, clientSocket, head) => {
  const { port, hostname } = new URL(`http://${req.url}`);
  const serverSocket = net.connect(port || 443, hostname, () => {
    clientSocket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });
  
  serverSocket.on('error', (err) => {
    console.error('Server socket error:', err);
    clientSocket.end();
  });
  
  clientSocket.on('error', (err) => {
    console.error('Client socket error:', err);
    serverSocket.end();
  });
});

const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
  console.log(`🚀 CONNECT proxy running on port ${port}`);
});
