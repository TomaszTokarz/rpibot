const raspi = require('raspi');
const gpio = require('raspi-gpio');
const pwm = require('raspi-pwm');

const fs = require('fs');

var _validateValue = function(value) {
    value = value > 1 ? 1 : value;
    return value < 0 ? -value : value;
};

function drive(throttle, turning) {
    raspi.init(() => {    
        const outputPWM1 = new pwm.PWM('GPIO18', 500);
        const outputPWM2 = new pwm.PWM('GPIO13', 500);
        const outputMotor1Direction1 = new gpio.DigitalOutput('GPIO6');
        const outputMotor1Direction2 = new gpio.DigitalOutput('GPIO5');
        const outputMotor2Direction1 = new gpio.DigitalOutput('GPIO19');
        const outputMotor2Direction2 = new gpio.DigitalOutput('GPIO26');
      
        if (throttle >= 0) {
            if (turning >= 0) {
                outputPWM1.write(_validateValue(throttle));
                outputPWM2.write(_validateValue(throttle - turning));
            } else {
                outputPWM1.write(_validateValue(throttle));
                outputPWM2.write(_validateValue(throttle + turning));
            }       

            outputMotor1Direction1.write(1);
            outputMotor1Direction2.write(0);
            outputMotor2Direction1.write(1);
            outputMotor2Direction2.write(0);
        } else {
            if (turning >= 0) {
                outputPWM1.write(_validateValue(-throttle));
                outputPWM2.write(_validateValue(-throttle - turning));
            } else {
                outputPWM1.write(_validateValue(-throttle));
                outputPWM2.write(_validateValue(-throttle + turning));
            } 

            outputMotor1Direction1.write(0);
            outputMotor1Direction2.write(1);
            outputMotor2Direction1.write(0);
            outputMotor2Direction2.write(1);
        }        
    });

};

module.exports = {
    drive: drive
};