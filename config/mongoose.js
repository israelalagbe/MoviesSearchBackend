const { env } = require('../helpers/env');

const mongoose = require('mongoose');
mongoose.connect(env('DATABASE_URL'), { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('DB Connected');
});
