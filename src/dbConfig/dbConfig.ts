import mongoose from 'mongoose';


const connect = async () => {
    try {

        const MONGO_URI = process.env.MONGO_URI as string;
        await mongoose.connect(MONGO_URI);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        })
        connection.on('error', (error) => {
            console.log("MongoDB Connection failed", error)
        })
    } catch (error) {
        console.log("MongoDB Connection failed", error);
    }
}

export default connect;