// const express = require('express');
// const mongoose = require('mongoose');
// const userRoutes = require('./routes/userRoutes');
// const postRoutes = require('./routes/postRoutes');
// require('dotenv').config();
// const app = express();

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// mongoose.connect(process.env.DB_URL, { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true 
// });

// app.use(express.json());
// app.use('/users', userRoutes);
// app.use('/posts', postRoutes);

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const options = {
    key: fs.readFileSync('./configs/key.pem'),
    cert: fs.readFileSync('./configs/cert.pem')
};

mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

app.use(express.json());
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

https.createServer(options, app).listen(3000, () => {
    console.log('Server is running on port 3000');
});