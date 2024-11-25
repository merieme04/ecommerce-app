import csv from 'csv-parser';
import * as fs from 'fs';
import connectDB from '../config/db';
import Product from '../models/Product';
import Sale from '../models/Sale';


async function importData() {
    try {
        // Lire et importer les produits depuis le fichier CSV
        const products: any[] = [];
        fs.createReadStream('src/data/products.csv')  
            .pipe(csv())
            .on('data', (row) => {
                products.push({
                    productID: row.ProductID,
                    productName: row.ProductName,
                    category: row.Category,
                    price: parseFloat(row.Price) 
                });
            })
            .on('end', async () => {
                try {
                    const productPromises = products.map(async (product) => {
                        const newProduct = new Product({
                            productID: product.productID,
                            productName: product.productName,
                            category: product.category,
                            price: product.price
                        });
                        await newProduct.save();
                    });
                    await Promise.all(productPromises);  // Attendre que tous les produits soient enregistrés
                    console.log('Produits importés avec succès');
                } catch (error) {
                    console.error('Erreur lors de l\'importation des produits:', error);
                }
            });

        // Lire et importer les ventes depuis le fichier CSV
        const sales: any[] = [];
        fs.createReadStream('src/data/sales.csv')  
            .pipe(csv())
            .on('data', (row) => {
                sales.push({
                    saleID: row.SaleID,
                    productID: row.ProductID,  
                    quantity: parseInt(row.Quantity, 10), 
                    date: new Date(row.Date),  // Convertir la date en format Date
                    totalAmount: parseFloat(row.TotalAmount) 
                });
            })
            .on('end', async () => {
                try {
                    const salePromises = sales.map(async (sale) => {
                        const product = await Product.findOne({ productID: sale.productID });
                        if (product) {
                            const newSale = new Sale({
                                saleID: sale.saleID,
                                productID: product._id,  // Utilisez l'ID MongoDB du produit
                                quantity: sale.quantity,
                                date: sale.date,
                                totalAmount: sale.totalAmount
                            });
                            await newSale.save();
                        } else {
                            console.log(`Produit non trouvé pour SaleID ${sale.saleID} avec ProductID ${sale.productID}`);
                        }
                    });
                    await Promise.all(salePromises);  // Attendre que toutes les ventes soient enregistrées
                    console.log('Ventes importées avec succès');
                } catch (error) {
                    console.error('Erreur lors de l\'importation des ventes:', error);
                }
            });
    } catch (error) {
        console.error('Erreur lors de l\'importation des données:', error);
    }

    
}

// Connectez-vous à MongoDB avant d'appeler importData
connectDB().then(() => {
    importData();  // Une fois connecté, lancez l'importation
});
