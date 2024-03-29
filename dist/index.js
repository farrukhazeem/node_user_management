"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger_1 = require("./src/middleware/logger");
require('dotenv').config();
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
const profileRoutes_1 = __importDefault(require("./src/routes/profileRoutes"));
const db_1 = require("./src/config/db");
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use(cors());
app.use(logger_1.logger);
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '10000', extended: false }));
app.use(cookieParser());
app.use(errorHandler());
// API routes
app.use('/api/auth', userRoutes_1.default);
app.use('/api/profile', profileRoutes_1.default);
app.use("/uploads", express_1.default.static('uploads'));
// Sync Sequelize models with database
db_1.sequelise.sync()
    .then(() => {
    console.log('Database synced successfully');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('Unable to sync database:', error);
});
