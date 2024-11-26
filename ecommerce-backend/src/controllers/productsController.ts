import { Request, Response } from 'express';
import { fetchPaginatedProducts } from '../services/productService';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);

        const { productsWithSales, totalPages } = await fetchPaginatedProducts(pageNumber, limitNumber);

        res.json({
            products: productsWithSales,
            currentPage: pageNumber,
            totalPages,
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
