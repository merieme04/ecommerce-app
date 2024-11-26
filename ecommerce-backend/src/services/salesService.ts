import Sale from '../models/Sale';
import Product from '../models/Product';

export const calculateTotalSales = async (days: number) => {
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

    return totalSales[0]?.total || 0;
};

export const fetchTrendingProducts = async () => {
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

    return trendingProducts;
};

export const calculateCategorySales = async () => {
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

    const totalSalesAmount = categorySales.reduce((acc, cat) => acc + cat.totalSales, 0);

    return categorySales.map((cat) => ({
        category: cat._id,
        totalSales: cat.totalSales,
        percentage: parseFloat(((cat.totalSales / totalSalesAmount) * 100).toFixed(2)),
    }));
};
