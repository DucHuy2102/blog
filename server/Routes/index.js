import authRoutes from '../Routes/auth.route.js';

export default function setupRoutes(app) {
    app.use('/api/auth', authRoutes);
}
