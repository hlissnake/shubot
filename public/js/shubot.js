(shubot = function () {
    'use strict';

    var five = require('johnny-five'),
        Shubot,

        _rightStop,
        _leftStop;

    Shubot = function (options) {
        this.rightMotor  = new five.Motor(options.pins.right);
        this.leftMotor   = new five.Motor(options.pins.left);

        this.init();
    };

    // @note johnny-five only sends low signal to shut off via pwm pin
    // this board / motor setup also needs low signal to be sent to dir pin.
    _rightStop = function () {
        this.rightMotor.stop();
        board.digitalWrite(rightMotor.pins.dir, 0);
    };

    // @note johnny-five only sends low signal to shut off via pwm pin
    // this board / motor setup also needs low signal to be sent to dir pin.
    _leftStop = function () {
        this.leftMotor.stop();
        board.digitalWrite(leftMotor.pins.dir, 0);
    };

    Shubot.prototype.init = function () {
        console.log('Shubot: initialised');
    };

    Shubot.prototype.bindListeners = function () {
        this.rightMotor.on('start', function (err, timestamp) {
            console.log('start right', timestamp);
        });

        this.leftMotor.on('start', function (err, timestamp) {
            console.log('start left', timestamp);
        });

        this.rightMotor.on('stop', function (err, timestamp) {
            console.log('stop right', timestamp);
        });

        this.leftMotor.on('stop', function (err, timestamp) {
            console.log('stop left', timestamp);
        });

        this.rightMotor.on('forward', function (err, timestamp) {
            console.log('forward right', timestamp);
        });

        this.leftMotor.on('forward', function (err, timestamp) {
            console.log('forward left', timestamp);
        });

        console.log('Shubot: motor listeners setup');
    };

    Shubot.prototype.forward = function (speed) {
        console.log('robot forward');
        this.rightMotor.forward(speed);
        this.leftMotor.forward(speed);
    };

    Shubot.prototype.stop = function () {
        console.log('robot stop');
        _rightStop();
        _leftStop();
    };

    Shubot.prototype.pivotLeft = function () {
        console.log('robot pivot left');
        robotStop();
        this.rightMotor.forward(speed);
    };

    Shubot.prototype.pivotRight = function () {
        console.log('robot pivot right');
        robotStop();
        this.leftMotor.forward(speed);
    };

    return Shubot;

}());

Shubot = shubot();