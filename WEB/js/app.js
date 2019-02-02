var map = new Map();

var App = function() {
    var socket = io.connect('192.168.0.122:3000');

    var _orientationListener = function(app) {        
        // window.addEventListener("deviceorientation", app.handleOrientationChange, true);
    };

    return {
        addEventListeners: function() {
            _orientationListener(this);
            window.addEventListener("keypress", this.handleKeyboardSteering);
        },

        handleOrientationChange: function(event) {

            var throttle = map.getThrottle(event.gamma).value;
            var turning = map.getTurning(event.beta).value;

            socket.emit('drive', {
                throttle,
                turning
            });

            document.getElementById('throttle').innerHTML = `${throttle}`;
            document.getElementById('turning').innerHTML = `${turning}`;
        },

        handleKeyboardSteering: function(event) {

            var throttle = 0;
            var turning = 0;

            if (event.keyCode == 119) {
                throttle = map.getThrottle(0.01).value;
                turning = map.getTurning(0.01).value;

                console.log(throttle, turning);                
            }
            if (event.keyCode == 115) {
                throttle = map.getThrottle(-0.01).value;
                turning = map.getTurning(0.01).value;

                console.log(throttle, turning); 
            }
            if (event.keyCode == 97) {
                throttle = map.getThrottle(0.01).value;
                turning = map.getTurning(-90).value;

                console.log(throttle, turning); 
            }
            if (event.keyCode == 100) {
                throttle = map.getThrottle(0.01).value;
                turning = map.getTurning(90).value;

                console.log(throttle, turning); 
            }

            socket.emit('drive', {
                throttle,
                turning
            });
        }
    };
};

(function() {
    var app = new App();

    app.addEventListeners();
})()