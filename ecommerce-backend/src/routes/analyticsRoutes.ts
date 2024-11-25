import express, { Request, Response } from 'express';
import { getTotalSales, getTrendingProducts, getCategorySales } from '../controllers/analyticsController';

const router = express.Router();

// Route pour obtenir le total des ventes
router.get('/total_sales', async (req: Request, res: Response) => {
    try {
        await getTotalSales(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch total sales' });
    }
});

// Route pour obtenir les produits les plus vendus
router.get('/trending_products', async (req: Request, res: Response) => {
    try {
        await getTrendingProducts(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch trending products' });
    }
});

// Route pour obtenir la répartition des ventes par catégorie
router.get('/category_sales', async (req: Request, res: Response) => {
    try {
        await getCategorySales(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category sales' });
    }
});

export default router;
