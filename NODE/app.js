console.log('RPIbot started');

const {drive} = require('./modules/drive/drive');

var app = {
    init: function() {
        this.runSocket();
    },

    runSocket: function() {
        var server = require('http').createServer();

        var io = require('socket.io')(server);

        io.on('connection', function(socket){
            console.log('conected');

            socket.on('drive', function(data) {
                drive(data.throttle, data.turning);
            }) 
        });

        socket.on('disconnect', function() {
            console.log('disconnected');
         });

        server.listen(3000);
    }
};

app.init();