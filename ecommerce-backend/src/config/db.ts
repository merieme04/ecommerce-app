import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri = 'mongodb+srv://ecommerce:1234@cluster0.92vlj.mongodb.net/?retryWrites=true&w=majority';
        await mongoose.connect(uri);
        console.log('MongoDB Atlas connected successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
