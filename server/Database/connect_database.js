import mongoose from 'mongoose';

export default async function connectDatabase() {
    try {
        const connectionString = process.env.MONGO_CONNECTION_STRING;
        await mongoose.connect(connectionString);
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.log('❌ Database connection error:', error);
        process.exit(1);
    }
}
