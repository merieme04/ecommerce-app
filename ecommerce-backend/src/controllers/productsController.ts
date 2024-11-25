import { Request, Response } from 'express';
import Product from '../models/Product';
import Sale from '../models/Sale';

export const getProducts = async (req: Request, res: Response) => {
  try {
    // Récupérer les paramètres de pagination depuis la requête
    const { page = 1, limit = 10 } = req.query;

    // Convertir les paramètres `page` et `limit` en nombres
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    // Récupérer les produits paginés
    const products = await Product.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    // Calculer les ventes totales pour chaque produit
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

    // Calculer le nombre total de produits pour la pagination
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limitNumber);

    // Renvoyer les produits paginés avec les métadonnées
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
