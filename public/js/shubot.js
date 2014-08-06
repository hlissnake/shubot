/*global require, module*/
(function () {
    'use strict';

    var five = require('johnny-five'),
        Shubot,
        _stopRight,
        _stopLeft;

    /**
     * Tank robot controlled by the BrainBoard & two motors.
     *
     * @constructor Shutbot
     * @param options {Object}
     */
    Shubot = function (options) {
        this.rightMotor  = new five.Motor(options.pins.right);
        this.leftMotor   = new five.Motor(options.pins.left);

        this.init();
    };

    /*
     * Stop the right motor.
     * @private
     * @method _stopRight
     */
    _stopRight = function () {
        this.rightMotor.stop();
        // @note johnny-five only sends low signal to shut off via pwm pin,
        // this board / motor setup also needs low signal to be sent to dir pin.
        board.digitalWrite(rightMotor.pins.dir, 0);
    };

    /*
     * Stop the left motor.
     * @private
     * @method _stopLeft
     */
    _stopLeft = function () {
        this.leftMotor.stop();
        // @note johnny-five only sends low signal to shut off via pwm pin,
        // this board / motor setup also needs low signal to be sent to dir pin.
        board.digitalWrite(leftMotor.pins.dir, 0);
    };

    Shubot.prototype.init = function () {
        console.log('Shubot: initialised');
    };

    /*
     * Bind logs to motor events.
     * @method bindListeners
     */
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

    /*
     * Drive the tank forward at passed speed.
     * @method forward
     * @param speed {Number}
     */
    Shubot.prototype.forward = function (speed) {
        console.log('robot forward');
        this.rightMotor.forward(speed);
        this.leftMotor.forward(speed);
    };

    /*
     * Stop the tank.
     * @method stop
     */
    Shubot.prototype.stop = function () {
        console.log('robot stop');
        _rightStop();
        _leftStop();
    };

    /*
     * Turn the tank left at passed speed, by only running the right motor.
     * @method left
     * @param speed {Number}
     */
    Shubot.prototype.left = function (speed) {
        console.log('robot pivot left');
        robotStop();
        this.rightMotor.forward(speed);
    };

    /*
     * Turn the tank right at passed speed, by only running the left motor.
     * @method right
     * @param speed {Number}
     */
    Shubot.prototype.right = function (speed) {
        console.log('robot pivot right');
        robotStop();
        this.leftMotor.forward(speed);
    };

    return Shubot;

}());
