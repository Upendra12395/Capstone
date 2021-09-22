const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const builderRouter = require('./routes/builder');
const userRouter = require("./routes/user");
const projectRouter = require('./routes/project');
const commentRouter = require('./routes/comment')
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const http = require('http').createServer(app);


const PORT = process.env.PORT || 4000;
const password = process.env.PASSWORD;

// connecting with database
const mongooseURL = `mongodb+srv://upendraa:${password}@cluster0.mwuaz.mongodb.net/letsbuild?retryWrites=true&w=majority`;
mongoose.connect(mongooseURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

mongoose.Promise = global.Promise;
mongoose.connection.on('open', ()=>{
    console.log("connected")
});


app.use("/user", userRouter)
app.use("/builder", builderRouter)
app.use('/project', projectRouter)
app.use('/comment', commentRouter)

// chat section
app.use(express.static(__dirname + '/public'))

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/', (req, res)=>{
    res.send("hello")
});

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('io Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})

app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`)
});