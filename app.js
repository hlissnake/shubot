/*global module*/

// Needs to be globally available for web sockets.
var io;

(function () {
    'use strict';

    /*
     * Dependencies, app, socket.io, johnny-five & shubot setup
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

        five            = require('johnny-five'),
        Shubot          = require('./public/js/shubot'),

        app             = express(),
        server          = http.createServer(app),

        _handleConnection;
        _handleBoardReady,
        _handleBoardError,

        port,
        board,
        shubot;

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

    /*
     * @method handleBoardReady
     */
    _handleBoardReady = function () {
        console.log('Board is connected – YAY');

        shubot = new Shubot({
            board: board,
            pins: {
                right: [6, 7],
                left: [4, 5]
            }
        });

        console.log('Shubot created & board setup');
    };

    /*
     * @method handleBoardError
     * @param error
     */
    _handleBoardError = function (error) {
        console.log('Awno board error');
        console.log(error);
        process.exit();
    };

    board = new five.Board();

    board.on('ready', _handleBoardReady);
    board.on('error', _handleBoardError);
    console.log('Waiting for device to connect...');

    port = app.get('port');

    console.log('Waiting for socket connection...');
    console.log('Listening on ' + port);
    server.listen(port);

    /*
     * @method handleConnection
     * @param socket
     */
    _handleConnection = function (socket) {
        var _handleCommand;

        console.log('Sockets connected - YAY');

        // Send out a message (only to the one who connected)
        socket.emit('robot connected', {
            data: 'Connected'
        });
        console.log('Command emmitted');

        /*
         * @method handleCommand
         * @param data
         */
        _handleCommand = function (data) {
            var command = data.command;
            console.log('Robot command received: ' + command);

            if (!shubot) {
                // For instance when running the app a few times some commands are
                // leftover and caught here, yet shubot has not yet been re-defined.
                return;
            }

            switch (command) {
            case 'forward':
                shubot.forward(50);
                break;
            case 'left':
                shubot.left(50);
                break;
            case 'right':
                shubot.right(50);
                break;
            case 'stop':
                shubot.stop();
                break;
            default:
                console.log('No match for command...');
                break;
            }
        };

        socket.on('robot command', _handleCommand);
    };

    io.sockets.on('connection', _handleConnection);
    console.log('Bind socket connection...');

    module.exports = app;

}());