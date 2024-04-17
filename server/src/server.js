const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const classroomRoutes = require('./routes/classroomRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const profileRoutes = require('./routes/profileRoutes');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/IT-Classroom', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(express.json()); // Parse incoming JSON data
app.use(cors());
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes); // Mount user routes under '/api' base path
app.use('/api/classroom', classroomRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/profile', profileRoutes);

app.get('/', (req, res) => {
  res.send("Server is healthy");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});