import { Request, Response } from 'express';
import Product from '../models/Product';
import Sale from '../models/Sale';

// 1. Total des ventes
export const getTotalSales = async (req: Request, res: Response) => {
    try {
        const { period } = req.query;
        const days = parseInt(period as string, 10); // Assurez-vous que 'period' est une chaîne de caractères
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const totalSales = await Sale.aggregate([
            { $match: { date: { $gte: startDate } } },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$totalAmount' },
                },
            },
        ]);

        res.json({ totalSales: totalSales[0]?.total || 0 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch total sales' });
    }
};

// 2. Produits les plus vendus
export const getTrendingProducts = async (req: Request, res: Response) => {
    try {
        const trendingProducts = await Sale.aggregate([
            { $group: { _id: '$productId', totalQuantity: { $sum: '$quantity' }, totalAmount: { $sum: '$totalAmount' } } },
            { $sort: { totalQuantity: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'productDetails',
                },
            },
            { $unwind: '$productDetails' },
            {
                $project: {
                    productName: '$productDetails.productName',
                    quantitySold: '$totalQuantity',
                    totalAmount: '$totalAmount',
                },
            },
        ]);

        res.json(trendingProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch trending products' });
    }
};

// 3. Répartition des ventes par catégorie
export const getCategorySales = async (req: Request, res: Response) => {
    try {
        const categorySales = await Product.aggregate([
            {
                $lookup: {
                    from: 'sales',
                    localField: '_id',
                    foreignField: 'productId',
                    as: 'salesData',
                },
            },
            {
                $project: {
                    category: 1,
                    totalSales: {
                        $sum: { $map: { input: '$salesData', as: 'sale', in: '$$sale.totalAmount' } },
                    },
                },
            },
            {
                $group: {
                    _id: '$category',
                    totalSales: { $sum: '$totalSales' },
                },
            },
        ]);

        if (categorySales.length === 0) {
            return res.status(404).json({ message: 'Aucune vente trouvée pour les catégories.' });
        }

        const totalSalesAmount = categorySales.reduce((acc, cat) => acc + cat.totalSales, 0);

        const categoryPercentages = categorySales.map((cat) => ({
            category: cat._id,
            totalSales: cat.totalSales,
            percentage: parseFloat(((cat.totalSales / totalSalesAmount) * 100).toFixed(2)),
        }));

        res.json(categoryPercentages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch category sales' });
    }
};
