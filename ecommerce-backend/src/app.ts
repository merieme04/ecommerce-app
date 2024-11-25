import express from 'express';
import cors from 'cors'; // Importer le module cors
import connectDB from './config/db';
import analyticsRoutes from './routes/analyticsRoutes';
import productRoutes from './routes/productsRoutes';

const app = express();

app.use(cors()); 
app.use(express.json());

// Routes
app.use('/analytics', analyticsRoutes);
app.use('/products', productRoutes);

// Connexion à la base de données
connectDB();

export default app;
