require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 3000; 
const options = {
    definition : {
        openapi : '3.0.0',
        info : {
            title : 'Event Booking System',
            version : '1.0.0'
        },
        servers : [
            {url: `http://localhost:${PORT}`}
        ]
    },
    apis : ['./routes/*.js']
};

module.exports = swaggerJSDoc(options);