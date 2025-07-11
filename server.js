require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const notesRouter = require('./routes/notes');
const authRouter = require('./routes/auth');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['Authorization']
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Expose-Headers', 'Authorization');
  next();
});
app.use(bodyParser.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});