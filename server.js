const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000;

app.use((req, res, next) => {
  res.show = (filename) => {
    res.sendFile(path.join(__dirname, `/views/${filename}`));
  };
  next();
});

// Middleware to set the static file directory
app.use(express.static(path.join(__dirname, '/public')));

// Middleware to handle requests starting with "/user/settings" or "/user/panel"
app.use('/user/settings', (req, res, next) => {
  res.send('Please log in to access this page.');
});

app.use('/user/panel', (req, res, next) => {
  res.send('Please log in to access this page.');
});

app.get('/', (req, res) => {
  res.show('home.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

app.get('/forbidden', (req, res) => {
  res.show('forbidden.html');
});

// Middleware to handle broken links
app.use((req, res) => {
  res.status(404).show('404.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});