import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import recordRoutes from "./routes/record.routes.js";
import indexRoutes from "./routes/index.routes.js";

const app = express();

 app.use(cors(
   {
   //  origin: 'https://react-frontend-production-c86d.up.railway.app',
    origin: 'http://localhost:5173',
    credentials:true }
 ));
 app.use(morgan('dev'));
 app.use(express.json());
 app.use(cookieParser());

 app.use("/api",authRoutes);
//  app.use("/api",taskRoutes);
 app.use("/api",recordRoutes);
//  app.use(indexRoutes);

export default app;