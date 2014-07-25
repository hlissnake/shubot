/*global $*/

$(function () {
    'use strict';

    var socket          = io.connect(location.origin),
        Document        = $(document),
        forwardBtnNode  = $('#forward-btn'),
        //reverseBtnNode  = $('#reverse-btn'),
        stopBtnNode     = $('#stop-btn'),
        leftBtnNode     = $('#left-btn'),
        rightBtnNode    = $('#right-btn'),
        handleRobotConnected,
        handleForward,
        //handleReverse,
        handleStop,
        handleLeft,
        handleRight;

    /*
     * Handles robot connected message from socket.io server.
     *
     * @method handleRobotConnected
     * @param data
     */
    handleRobotConnected = function (data) {
        console.log('Robot connected: ', data);
        // Send out a message to the server
        socket.emit('robot command', {
            command: 'nothing'
        });
    };

    /*
     * @method handleForward
     */
    handleForward = function () {
        console.log('forward');
        socket.emit('robot command', {
            command: 'forward'
        });
    };

    /*
     * @method handleLeft
     */
    handleLeft = function () {
        console.log('left');
        socket.emit('robot command', {
            command: 'left'
        });
    };

    /*
     * @method handleRight
     */
    handleRight = function () {
        console.log('right');
        socket.emit('robot command', {
            command: 'right'
        });
    };

    /*
     * @method handleReverse
     */
    // handleReverse = function () {
    //     console.log('reverse');
    //     socket.emit('robot command', {
    //         command: 'reverse'
    //     });
    // };

    /*
     * @method handleStop
     */
    handleStop = function () {
        console.log('stop');
        socket.emit('robot command', {
            command: 'stop'
        });
    };

    /*
     * Handle robot connection
     */
    socket.on('robot connected', handleRobotConnected);

    /*
     * Bind robot control buttons
     */
    forwardBtnNode.on('click', handleForward);
    //reverseBtnNode.on('click', handleReverse);
    stopBtnNode.on('click', handleStop);
    leftBtnNode.on('click', handleLeft);
    rightBtnNode.on('click', handleRight);

    /*
     * Bind robot keyboard control behaviour
     */
    Document.keydown(function (event) {
        switch (event.keyCode) {
        case 37:
            // Left arrow
            socket.emit('robot command', {
                command: 'left'
            });
            break;
        case 38:
            // Up arrow / forward arrow
            socket.emit('robot command', {
                command: 'forward'
            });
            break;
        case 39:
            // Right arrow
            socket.emit('robot command', {
                command: 'right'
            });
            break;
        default:
            socket.emit('robot command', {
                command: 'stop'
            });
            break;
        }
    });

    console.log('Robot Mission Control init...');
});
