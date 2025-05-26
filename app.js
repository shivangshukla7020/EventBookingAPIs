const express = require('express');
const connectDB = require('./database/connectDB');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

const app = express();
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use('/user', userRoutes);


const PORT = process.env.PORT || 3000;

// PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`);
})