
const socketio = require('socket.io');
const passportSocketIo = require('passport.socketio');
const redisAdapter = require('socket.io-redis');
const cookieParser = require('cookie-parser');
const passport = require('./utils/auth')
const sessionStore = require('./utils/sessionStore')


module.exports = (server) => {
    /**
     * aloowd tranport types
     * transports	['polling', 'websocket']
     * By default, a long-polling connection is established first, then upgraded to “better” transports (like WebSocket).
     * If you like to live dangerously, this part can be skipped
     * 
     * on the client side:
     * ----------------------------
     * const socket = io({
     *   transports: ['websocket']
     * });
     * ----------------------------
     */

    // initialize socket.io
    const io = socketio(server);

    // setup socket.io adapter
    io.adapter(redisAdapter({ url: process.env.REDIS_URL_SOCKET_ADAPTER }));

    // setup socket.io authentication
    io.use(passportSocketIo.authorize({
        key: 'connect.sid',
        secret: process.env.SECRET_KEY_BASE,
        store: sessionStore,
        passport: passport,
        cookieParser: cookieParser
    }));

    // some dirty code to test
    var eventSocket = io.of('/events');
    // on connection event
    eventSocket.on('connection', function (socket) {

        // example 'event1', with an object. Could be triggered by socket.io from the front end
        console.log('connected')
        socket.on('event1', function (eventData) {
            // user data from the socket.io passport middleware
            if (socket.request.user && socket.request.user.logged_in) {
                console.log(socket.request.user);
                socket.emit('auth', { message: 'logged in as ' + socket.request.user.email })
            } else {
                socket.emit('auth', { message: 'not logged in' })
            }
        });
    });

}