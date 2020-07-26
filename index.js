const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const  { MONGO_DB_URL } = config.get('db_connections');
const app = express();

const router = express.Router();

const port = 5000;
const allRoutes = require('./routes');


app.listen(port, () => {
    console.log("Started server at port 5000");
    dbConnect();
});

const dbConnect = async () => {
    console.log("in connect")
    try{
        mongoose.connect(MONGO_DB_URL, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });
    } catch(error) {
        console.error(error);
        throw error;
    }
}

app.get('/', (req, res) => {
    res.send('server is up');
});

require('./routes')(app);

module.exports = app
