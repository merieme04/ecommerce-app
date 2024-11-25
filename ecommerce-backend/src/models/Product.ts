import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    productID: number;
    productName: string;
    category: string;
    price: number;
}

const productSchema: Schema = new Schema({
    productID: { type: Number, required: true, unique: true },
    productName: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
});

export default mongoose.model<IProduct>('Product', productSchema);
