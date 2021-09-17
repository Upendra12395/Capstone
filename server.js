const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const builderRouter = require('./routes/builder');
const userRouter = require("./routes/user");
const projectRouter = require('./routes/project');
//onst commentRouter = require('./routes/comment')
require('dotenv').config();

const app = express();
app.use(cors());
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

app.use(express.json());


app.use("/user", userRouter)
app.use("/builder", builderRouter)
app.use('/project', projectRouter)
//app.use('/comment', commentRouter)

app.get('/', (req, res)=>{
    res.send("hello")
});

app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`)
});