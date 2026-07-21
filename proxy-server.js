const http = require('http');
const net = require('net');
const url = require('url');

const server = http.createServer((req, res) => {
  // Only handle CONNECT method, reject other HTTP methods
  res.writeHead(405, { 'Content-Type': 'text/plain' });
  res.end('Method Not Allowed');
});

server.on('connect', (req, socket, head) => {
  const targetUrl = new url.URL(`https://${req.url}`);
  const host = targetUrl.hostname;
  const port = targetUrl.port || 443;

  console.log(`[Proxy] CONNECT ${host}:${port}`);

  const proxySocket = net.connect(port, host, () => {
    socket.write('HTTP/1.1 200 Connection Established\r\n' +
                 'Proxy-agent: Node.js-Proxy\r\n' +
                 '\r\n');
    proxySocket.write(head);
    proxySocket.pipe(socket);
    socket.pipe(proxySocket);
  });

  proxySocket.on('error', (err) => {
    console.error(`[Proxy] Error: ${err.message}`);
    socket.destroy();
  });

  socket.on('error', (err) => {
    console.error(`[Proxy] Socket error: ${err.message}`);
    proxySocket.destroy();
  });
});

const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
  console.log(`🚀 CONNECT proxy running on port ${port}`);
});
