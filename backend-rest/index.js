const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const items = require('./routes/api/items');
const auth = require('./routes/api/auth');

require('./config/passport')

const app = express();

//morgan
app.use(morgan('dev'));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Config
const db = require('./config/keys').mongoURI;

// connect to mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err))

// use routes
app.use('/api/items', items)
app.use('/api/auth', auth)
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})