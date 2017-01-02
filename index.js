"use strict";
/* globals __dirname, require, console */

const express = require('express');
const app = express();
const router = express.Router();
const http = require('http').Server(app);
const url = require('url');
const io = require('socket.io')(http);
const fs = require('fs');
const colors = require('colors');

app.use(express.static(`${__dirname}/node_modules`));

app.use(express.static(`${__dirname}/public`));

app.get('/scripts/:file', (req, res) => {
    res.sendFile(`${__dirname}/scripts/${req.params.file}`);
});

app.get('/', (req, res) => {
    res.send('Whoop! Nothing here... <br><br>You probably want either <a href="controller.html">Controller</a> or <a href="display.html">Display</a>');
});

app.get('/assets/socket.io.js', (req, res) => {
    var path = __dirname + '/node_modules/socket.io-client/dist/socket.io.js';
    if (fs.existsSync(path)) {
        res.sendFile(path);
    } else {
        res.status(404).end();
    }
});

http.listen(3030, () => console.log('listening on 10.0.0.236:3000') );

io.on('connection', (socket) => {
    simpleConnect();
    socket.on('disconnect', simpleDisconnect);
    socket.on('update display', (color) => {
        console.log('message: ', color);
        io.emit('update display', color);
    });
});

function simpleConnect () {
    console.log('A user has connected');
}
function simpleDisconnect () {
    console.log('A user has disconnected');
}