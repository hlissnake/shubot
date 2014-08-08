<img src="http://i.imgur.com/7xXeTU9.png" />
======

A Rasperry Pi & Arduino powered robot with web page remote, controlled using johnny-five, socket.io & express.

Run `npm install` followed by `npm start` which will serve a page at `<your ip address>:3000` which can be used to drive Shubot.

#### Kit

- <a href="http://www.mindkits.co.nz/store/kits/brainboard-tank-robot-with-bluetooth-control">Mindkits Brainboard Tank</a> (the brainboard is a custom variation of the Arduino Nano)
- Raspberry Pi (+ wifi USB dongle)
- Arduino (brainboard) is connected to the Raspberry Pi (both boards mounted to tank along with a power supply for each)
- Motors are connected to the Arduino

#### Demo

- `ssh` into the Raspberry Pi (which is set up to connect to iPhone personal hotspot Wifi) from device on the same network
- Navigate to shubot project folder & run the program `npm start` to serve the page from there
- Browse to the page at `<Pi ip address>:3000` on any other device and use the buttons or keyboard controls to drive the tank

#### Presentation

This project was presented at <a href="http://wdcnz.com/">WDCNZ 2014</a>

Slides & video recording will be included here when available.

Logo thanks to [Jacky Lee](http://jackylee.co/100logos/2014/07/09/day-33.html)
