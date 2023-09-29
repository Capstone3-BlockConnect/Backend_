const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
require('dotenv').config();
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

app.use(express.json());
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
