import mongoose from 'mongoose';


const connect = async () => {
    try {

        const MONGO_URI = process.env.MONGO_URI as string;
        await mongoose.connect(MONGO_URI);
        const connection = mongoose.connection;
        
    } catch (error) {
        console.log("MongoDB Connection failed", error);
    }
}
mongoose.connection.on('connected', () => {
    console.log("MongoDB is connected");
});

mongoose.connection.on('error', (error) => {
    console.error("MongoDB Connection failed", error);
});

export default connect;