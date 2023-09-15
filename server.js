const express = require('express');
const cors = require('cors');
const zlib = require('zlib');
const app = express();
const port = process.env.PORT || 5000;

// Middleware for data compression
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  const acceptEncoding = req.headers['accept-encoding'];

  if (!acceptEncoding || !acceptEncoding.includes('gzip')) {
    
    return next();
  }

  // Compress the response using gzip
  res.setHeader('Content-Encoding', 'gzip');
  res.removeHeader('Content-Length'); // Remove content-length header
  const gzip = zlib.createGzip();
  res.on('finish', () => {
    
    res.end();
  });
  res.pipe(gzip).pipe(res);
});

app.get('/express_backend', (req, res) => { 
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
  });

app.listen(port, () => {
  console.log('Server is running on port 5000');
});
