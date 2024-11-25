import mongoose, { Schema, Document } from 'mongoose';

export interface ISale extends Document {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    date: Date;
    totalAmount: number;
}

const saleSchema: Schema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
});

export default mongoose.model<ISale>('Sale', saleSchema);
