import express from 'express';

const app = express();

app.use(express.json());

//routes



import authRoutes from "./modules/auth/auth.routes.js";

app.use(authRoutes);

//error handlers

export default app;
