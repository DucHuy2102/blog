import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import setupRoutes from './Routes/index.js';
import connectDatabase from './Database/connect_database.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDatabase();
    console.log(`\n✅ Server is running on port:${PORT}`);
});

setupRoutes(app);
