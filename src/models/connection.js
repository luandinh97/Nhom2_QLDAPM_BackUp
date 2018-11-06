const mongoose = require('mongoose');
const mongoDB = 'mongodb://bonbanh:bonbanh1@ds143893.mlab.com:43893/bonbanh';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = db;