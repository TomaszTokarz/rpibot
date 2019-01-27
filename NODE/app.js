console.log('RPIbot started');

const {drive} = require('./modules/drive/drive');

var app = {
    init: function() {
        // drive(0.5, 0.5);

        this.runSocket();
        // ble.init();
    },

    runSocket: function() {
        // var express = require('express')();
        // var server = require('http').createServer(express);
        var server = require('http').createServer();

        var io = require('socket.io')(server);

        io.on('connection', function(socket){
            console.log('conected');

            socket.on('drive', function(data) {
                drive(data.throttle, data.turning);
            }) 
        });

        
        server.listen(3000);
    }
};

app.init();