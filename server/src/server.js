const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/IT-Classroom', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(express.json()); // Parse incoming JSON data
app.use(cors())

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes); // Mount user routes under '/api' base path




app.get('/', (req, res) => {
  res.send("Server is healthy");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});