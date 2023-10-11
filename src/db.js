import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://miguelromo:V7jpfpsHNjekRnEl@mongodb.ld0nadh.mongodb.net/?retryWrites=true&w=majority');
        console.log(">>>>>> DB is connected");
    } catch (error) {
        console.log(error);
    }
}