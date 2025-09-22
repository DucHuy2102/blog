import express from 'express';
import dotenv from 'dotenv';
import setupRoutes from './Routes/index.js';
import cors from 'cors';
import connectDatabase from './Database/connect_database.js';

const app = express();
app.use(express.json());
dotenv.config();
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
