const express = require('express');
const connectDB = require('./database/connectDB');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cookieParser = require('cookie-parser');
const swaggerSpec = require('./swagger/swagger');
const swagger = require('swagger-ui-express');

const app = express();
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use('/user', userRoutes);
app.use('/event', eventRoutes);
app.use('/booking', bookingRoutes);

app.use('/api-docs', swagger.serve, swagger.setup(swaggerSpec));


const PORT = process.env.PORT || 3000;

// PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`);
})