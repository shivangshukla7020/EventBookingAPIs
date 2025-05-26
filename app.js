const express = require('express');
const connectDB = require('./database/connectDB');

const app = express();
connectDB();

app.use(express.json());


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`);
})