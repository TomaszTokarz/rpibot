var bleno = require('bleno');
var SystemInformationService = require('./systeminformationservice');
var systemInformationService = new SystemInformationService();


var init = function() {
    bleno.on('stateChange', function(state) {
        console.log('on -> stateChange: ' + state);
        if (state === 'poweredOn') {
            bleno.startAdvertising(bleno.name, [systemInformationService.uuid]);
        }
        else {
            bleno.stopAdvertising();
        }
    });

    bleno.on('advertisingStart', function(error) {
        console.log('on -> advertisingStart: ' +
            (error ? 'error ' + error : 'success')
        );
        if (!error) {
            bleno.setServices([
            systemInformationService
            ]);
        }
    });        
}

module.exports = {
    init: init
};