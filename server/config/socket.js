const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const Request = require('../dbQuery/getRequest')


exports.socketApp2 =  function(Server){
    const portApp2 = 3001;
    var app = express();
    const Server = http.Server(app);
    const io = socketIO(Server, {
        path: '/',
        serveClient: false,
        pingInterval: 5000,
        pingTimeout: 2000,
        cookie: false
    });
    
    io.on('connect', function (socket, res) {
        console.log('User connect!');
        socket.on('get data', () => {
            var data = JSON.stringify(Request.loadAll());
            io.sockets.emit(data);
        })
        socket.on('disconet', () => {
            console.log('User disconnect');
            // window.setTimeout('')


        });
    });

    Server.listen(portApp2, function(){
        console.log('Socket listt port: '+ portApp2);
    });


}
