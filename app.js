/*global module*/

// Needs to be globally available for web sockets.
var io;

(function () {
    'use strict';

    /*
     * Dependencies, app, socket.io & johnny-five setup
     */
    var express         = require('express'),
        path            = require('path'),
        favicon         = require('static-favicon'),
        logger          = require('morgan'),
        cookieParser    = require('cookie-parser'),
        bodyParser      = require('body-parser'),
        compass         = require('node-compass'),
        http            = require('http'),
        routes          = require('./routes/index'),
        app             = express(),
        server          = http.createServer(app);

    // Needs to be globally available for web sockets.
    io = require('socket.io').listen(server, { log: false });

    /*
     * Express setup
     */
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hjs');
    app.set('port', 3000);
    app.use(favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(compass({
        mode: 'expanded',
        sass: 'sass',
        css: 'css',
        cache: false
    }));
    app.use(express.static(path.join(__dirname, 'public')));

    /*
     * Routes
     */
    app.use('/', routes);

    /*
     * Express error handlers
     */
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    // Development error handler, will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: 'Awno ' + err.message,
                error: err
            });
        });
    }
    // Production error handler, no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    ///////////// JOHNNY MODULE // @todo separate module

    var five    = require('johnny-five'),
        board   = new five.Board(),
        handleBoardReady,
        handleBoardError,
        rightMotor,
        leftMotor,
        robotForward,
        robotReverse,
        robotStop,
        robotPivotRight,
        robotPivotLeft,
        _rightMotorStop,
        _leftMotorStop;

    /*
     * @method handleBoardReady
     */
    handleBoardReady = function () {
        var shubot;

        console.log('Board is connected – YAY');

        shubot = new Shubot({
            pins: {
                right: [6, 7],
                left: [4, 5]
            }
        });

        board.repl.inject({
            motorRight: shubot.rightMotor,
            motorLeft: shubot.leftMotor
        });

        console.log('Shubot created & board setup');
    };

    /*
     * @method handleBoardError
     * @param error
     */
    handleBoardError = function (error) {
        console.log('Awno board error');
        console.log(error);
        process.exit();
    };

    board.on('ready', handleBoardReady);
    board.on('error', handleBoardError);
    console.log('Waiting for device to connect...');

    ////////////

    // MY APP STARTS HERE // @todo separate module?

    /*
     * Setup
     */
    var handleConnection;

    console.log('Waiting for socket connection...');
    console.log('Listening on ' + app.get('port'));
    server.listen(app.get('port'));

    /*
     * @method handleConnection
     * @param socket
     */
    handleConnection = function (socket) {
        var handleCommand;

        console.log('sockets connected');

        // Send out a message (only to the one who connected)
        socket.emit('robot connected', {
            data: 'Connected'
        });

        console.log('command emmitted');

        /*
         * @method handleCommand
         * @param data
         */
        handleCommand = function (data) {
            var command = data.command;

            console.log('Robot command received: ' + command);

            switch (command) {
            case 'forward':
                robotForward(50);
                break;
            case 'left':
                robotPivotLeft(50);
                break;
            case 'right':
                robotPivotRight(50);
                break;
            case 'stop':
                robotStop();
                break;
            default:
                console.log('No match for command...');
                break;
            }
        };

        socket.on('robot command', handleCommand);
    };

    io.sockets.on('connection', handleConnection);

    console.log('bind connection');

    module.exports = app;

}());