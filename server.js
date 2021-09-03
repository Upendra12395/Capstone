const express = require('express');
const mongoose = require('mongoose');
const builderRouter = require('./routes/builder');
const userRouter = require("./routes/user");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;
const password = process.env.PASSWORD;

const mongooseURL = `mongodb+srv://upendraa:${password}@cluster0.mwuaz.mongodb.net/letsbuild?retryWrites=true&w=majority`;
mongoose.connect(mongooseURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

mongoose.connection.on('open', ()=>{
    console.log("connected")
});

app.use(express.json());


app.use("/user", userRouter);
app.use("/builder", builderRouter);

app.get('/', (req, res)=>{
    res.send("hello")
});

app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`)
});