import express from 'express';
import dotenv from 'dotenv';
import setupRoutes from './Routes/index.js';
import connectDatabase from './Database/connect_database.js';

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDatabase();
    console.log(`\n✅ Server is running on port:${PORT}`);
});

setupRoutes(app);
