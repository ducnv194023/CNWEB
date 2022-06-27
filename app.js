const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose')
const passport = require('passport');   
const morgan = require('morgan');
const dotenv = require('dotenv');
const routes = require('./routes/test.route');
// init app
const app = express();
dotenv.config();
// connect DB
mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log("Connected to MongoDB")
})
// set security HTTP headers
app.use(helmet());

// set morgan
app.use(morgan('common'));
// parse json request body
app.use(express.json());

// set route
app.use('/swimming-pool',routes);

// enable cors
app.use(cors());
app.options('*', cors());


app.listen(3000, () => {
    console.log("Server is running...");
});
module.exports = app;
