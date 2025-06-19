const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const result = require('dotenv').config();
// console.log(result)
const classroomRoutes = require('./routes/classroomRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const profileRoutes = require('./routes/profileRoutes');
const mongoose = require('mongoose');

console.log("Bucket Name:", process.env.AWS_S3_BUCKET_NAME);
console.log("Access Key:", process.env.AWS_ACCESS_KEY_ID);


mongoose.connect('mongodb+srv://riteshphadtare12022004:v0LhS9CfiCOy2c9D@cluster0.xwhobtb.mongodb.net/IT-Classroom', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(express.json()); // Parse incoming JSON data
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

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