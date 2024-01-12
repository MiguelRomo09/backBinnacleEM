// import mongoose from "mongoose";
import { createPool } from 'mysql2/promise'

// export const connectDB = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://miguelromo:V7jpfpsHNjekRnEl@mongodb.ld0nadh.mongodb.net/?retryWrites=true&w=majority');
//         console.log(">>>>>> DB is connected");
//     } catch (error) {
//         console.log(error);
//     }
// }

export const pool = createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'binnacle'
})