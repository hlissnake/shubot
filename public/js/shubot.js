(shubot = function () {
    'use strict';

    var five = require('johnny-five'),
        Shubot;

    Shubot = function (options) {
        var rightMotorPins  = options.rightMotorPins,
            leftMotorPins   = options.leftMotorPins;

        rightMotor  = new five.Motor([6, 7]);
        leftMotor   = new five.Motor([4, 5]);
    };

    // ??
    Shubot.prototype.init = function () {

    };

    Shubot.prototype.bindListeners = function () {

    };

    Shubot.prototype.foward = function () {

    };

    Shubot.prototype.stop = function () {

    };

    Shubot.prototype.pivotLeft = function () {

    };

    Shubot.prototype.pivotRight = function () {

    };

    return Shubot;

}());

Shubot = shubot();