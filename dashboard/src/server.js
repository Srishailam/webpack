const express = require('express');
const app = express();
const port = 9000;
const path = require('path');
const fs = require('fs');

app.use('/', express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  const pathToHtmlFile = path.resolve(__dirname, '../dist/dashboard.html');
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
  res.send(contentFromHtmlFile);
});

app.listen(port, () => {
  console.log(`Dashboard app listening at http://localhost:${port}`);
});

