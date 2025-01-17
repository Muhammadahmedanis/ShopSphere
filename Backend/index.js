import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import { StatusCodes } from 'http-status-codes';
import { sendError } from './utils/responses.js';
import { connectDB } from './config/dbConfig.js';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import cartRouter from './routes/cart.js';
import orderRouter from './routes/order.js';
import productRouter from './routes/product.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(mongoSanitize());
app.use(cookieParser());
app.use(helmet());
connectDB();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product",productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/cart", cartRouter);

app.all("*", (req, res) => {
    res.status(StatusCodes.NOT_FOUND).send(sendError({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    }))
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server working");
})