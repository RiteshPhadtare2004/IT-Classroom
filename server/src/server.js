const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/IT-Classroom', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});



app.use(express.json());


const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');


// app.use('/api/users', userRoutes);
// app.use('/api/classes', classRoutes);



app.get('/',(req,res)=>{
  res.send("hello")
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
