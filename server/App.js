const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const ownerRoute = require('./routes/owner')
const builderRoute = require('./routes/builder')
const createProject = require('./routes/createProject')
const cardRouter = require('./routes/card')
// var multer = require('multer');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
const http = require('http').createServer(app);

const password = process.env.MONGO_PASSWORD;

const mongodbURI = `mongodb+srv://dheeraj:${password}@atlastesting.1itdz.mongodb.net/capstone?retryWrites=true&w=majority`;

mongoose.connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

mongoose.connection.once("open", () => {
    console.log("Database Connected...");
});
mongoose.connection.on("error", (error) => {
    console.log("Error connecting database..."), error;
});


app.use('/builder', builderRoute);
app.use('/owner', ownerRoute);
app.use('/createproject', createProject)
app.use('/card', cardRouter)


// chat section
app.use(express.static(__dirname + '/public'))

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/', (req, res) => {
    res.send('home')
})
// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('io Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})



// app.listen(Port, () => {
//     console.log('listening on port ' + Port);
// });