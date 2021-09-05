const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const ownerRoute = require('./routes/owner')
const builderRoute = require('./routes/builder')

const Port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

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
app.get('/', (req, res) => {
    res.send("hey how are you");
});
app.listen(Port, () => {
    console.log('listening on port ' + Port);
});
