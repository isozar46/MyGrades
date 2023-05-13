const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@my-grades.fteud9t.mongodb.net/test2`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to the database');
})
.catch((err) => {
  console.error(err);
  process.exit(1);
});

app.use('/api', require('./src/routes/courses'));
app.use('/api', require('./src/routes/users'));
app.use('/api', require('./src/routes/departments'));
app.use('/api', require('./src/routes/students'));
app.use('/api', require('./src/routes/specialties'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
