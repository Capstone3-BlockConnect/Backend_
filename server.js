const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const storeRoutes = require('./routes/storeRoutes');
const matchingRoutes = require('./routes/matchingRoutes');
const reportRoutes = require('./routes/reportRoutes');
require('dotenv').config();
const app = express();
const job= require('./services/scheduler');
const cors = require('cors'); 

app.use(cors());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRoutes);
app.use('/stores', storeRoutes);
app.use('/matchings', matchingRoutes);
app.use('/reports', reportRoutes);

async function startServer(){
        try{
                await mongoose.connect(process.env.DB_URL, { 
                        useNewUrlParser: true, 
                        useUnifiedTopology: true 
                });
                console.log('Connected to DB');
                app.listen(3000, () => {
                        console.log('Server is running on port 3000');
                        job.invoke();
                });
        }catch(err){
                console.log(err);
        }
}

startServer();
