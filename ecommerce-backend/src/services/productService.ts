import Product from '../models/Product';
import Sale from '../models/Sale';

export const fetchPaginatedProducts = async (pageNumber: number, limitNumber: number) => {
    const products = await Product.find()
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

    const productsWithSales = await Promise.all(
        products.map(async (product) => {
            const totalSales = await Sale.aggregate([
                { $match: { productId: product._id } },
                { $group: { _id: null, total: { $sum: '$quantity' } } },
            ]);

            return {
                productId: product._id,
                productName: product.productName,
                price: product.price,
                totalSales: totalSales.length > 0 ? totalSales[0].total : 0,
                category: product.category,
            };
        })
    );

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limitNumber);

    return { productsWithSales, totalPages };
};
