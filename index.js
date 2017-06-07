const express = require('express');
const app = express();
const path = require('path');

const DIST_DIR = './public/dist';

app.use(express.static(path.join(__dirname, DIST_DIR)));

app.get("/", function(req, res) {
    console.log('requested');
    res.sendFile(path.join(__dirname, `${DIST_DIR}/index.html`));
});

app.listen(process.env.NODE_PORT);