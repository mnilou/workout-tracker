const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

// Password
// const MONGODB_URI = 'mongodb+srv://Password:Password@cluster0.lfztv.mongodb.net/workout?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false

});

mongoose.connection.on('connected', () => {
console.log('Mongooose is connected');
});

// routes
app.use(require('./routes/api-routes.js'));
app.use(require('./routes/html-routes.js'));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
