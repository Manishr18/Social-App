const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path=require('path')
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const cors=require('cors')
// Import Routes
const authRoute = require('./auth/Auth');
const postRoute = require('./Routes/post');
const profileRoute = require('./Routes/Profile');


app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/profile', profileRoute);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


app.get('/', (req, res) => {
  res.send('Hello from Express!');
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
