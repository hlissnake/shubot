/*global require, module*/
/**
 * Tank robot controlled by the BrainBoard & two motors.
 *
 * @module Shubot
 */
(function () {
    'use strict';

    var five = require('johnny-five'),
        Shubot;

    /**
     * @constructor Shubot
     * @param options {Object}
     */
    Shubot = function (options) {
        this.board = options.board;

        this.init(options.pins);
    };

    /*
     * Initialise Shubot.
     * @method init
     */
    Shubot.prototype.init = function (pins) {
        // Create motors
        this.rightMotor = new five.Motor(pins.right);
        this.leftMotor  = new five.Motor(pins.left);

        // Inject into repl
        this.board.repl.inject({
            motorRight: this.rightMotor,
            motorLeft: this.leftMotor
        });

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

        /*
         * Stop the right motor.
         */
        this.rightMotor.stop();
        // @note johnny-five only sends low signal to shut off via pwm pin,
        // this board / motor setup also needs low signal to be sent to dir pin.
        this.board.digitalWrite(this.rightMotor.pins.dir, 0);

        /*
         * Stop the left motor.
         */
        this.leftMotor.stop();
        this.board.digitalWrite(this.leftMotor.pins.dir, 0);
    };

    /*
     * Turn the tank left at passed speed, by only running the right motor.
     * @method left
     * @param speed {Number}
     */
    Shubot.prototype.left = function (speed) {
        console.log('robot left');
        this.stop();
        this.rightMotor.forward(speed);
    };

    /*
     * Turn the tank right at passed speed, by only running the left motor.
     * @method right
     * @param speed {Number}
     */
    Shubot.prototype.right = function (speed) {
        console.log('robot right');
        this.stop();
        this.leftMotor.forward(speed);
    };

    module.exports = Shubot;

}());
