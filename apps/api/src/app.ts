import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from "./modules/auth/auth.routes.js";
import { handleNotFound, handleError } from './middleware/errorHandler.js';
import { toNodeHandler } from 'better-auth/node';
import auth from './lib/auth.js';

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}))

app.use(morgan('dev'))

app.all('/api/v1/auth/*splat', toNodeHandler(auth));
app.use(express.json());

//routes
app.use('/api/v1/auth', authRoutes);

//error handlers
app.all("*splat", handleNotFound);
app.use(handleError);

export default app;
