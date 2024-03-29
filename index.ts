import express, { Express, NextFunction, Request, Response } from "express";
const cors = require('cors');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


import {logger} from './src/middleware/logger';

import path from 'path';

require('dotenv').config();
import authRoutes from './src/routes/userRoutes';
import { upload } from "./src/middleware/uploader";
import profileRoutes from "./src/routes/profileRoutes";
import { sequelise } from "./src/config/db";


const port = process.env.PORT || 8000;

const app: Express = express();
app.use(cors());
app.use(logger); 


app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '10000',extended: false }));
app.use(cookieParser());

 
app.use(errorHandler());


// API routes


app.use('/api/auth', authRoutes);
app.use('/api/profile',profileRoutes);

app.use("/uploads",express.static('uploads'));
// Sync Sequelize models with database
sequelise.sync()
    .then(() => {
        console.log('Database synced successfully');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error: Error) => {
        console.error('Unable to sync database:', error);
    });




