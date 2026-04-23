import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://erlbpvtltd_db_user:j9sbhgVHVOOFbW20@cluster0.mmx30ys.mongodb.net/?appName=Cluster0').then(()=>{console.log('connected DB')});
}