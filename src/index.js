// load config
const dotenv = require('dotenv')
dotenv.config()

// initialize database
require('./utils/database')

// initialize server
const app = require('./express')
const routes = require('./routes')
app.use(routes)

// build http server
const http = require('http');
const server = http.Server(app);

// initialize socket.io
require('./socket')(server)

// start server
server.listen(9000);