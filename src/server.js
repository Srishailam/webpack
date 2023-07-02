const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use('/static', express.static(path.resolve(__dirname, '../dist')));

app.get('/hello-world', (req, res) => {
  const pathToHtmlFile = path.resolve(__dirname, '../dist/hello-world.html');
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
  res.send(contentFromHtmlFile);
});

app.get('/kiwi', (req, res) => {
  const pathToHtmlFile = path.resolve(__dirname, '../dist/kiwi.html');
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
  res.send(contentFromHtmlFile);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

