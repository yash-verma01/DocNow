import mongoose from "mongoose";
const connectDB = async ()=> {
    console.log("✅ MONGO URI:", process.env.MONGODB_URI)
    mongoose.connection.on('connected',()=>console.log("database connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/docnow`)
}
export default connectDB

