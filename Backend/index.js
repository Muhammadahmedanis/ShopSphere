// import { createRateLimiter } from './middleware/rate-limitting.js';
import express from 'express';
import authRouter from './routes/auth.js';
import 'dotenv/config';
import { connectDB } from './config/dbConfig.js';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { sendError } from './utils/responses.js';
import mongoSanitize from 'express-mongo-sanitize';
import userRouter from './routes/user.js';

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(mongoSanitize())
app.use(cookieParser()) // after this res.cokiesParser() return object need for use is cookies ma data bhj or le raha hain
app.use(helmet()); // use to secure out header like in our network tab we can x-powered by express so using header it will remove 
// Set Cross-Origin-Opener-Policy to avoid blocking issues
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups'); // Use this to allow window.close in popup windows
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp'); // Optional, for embedded content
    next();
});
connectDB();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", userRouter);

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



// const limiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 1 minutes
//     limit: 4, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
//     // standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
//     // legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
//     // store: ... , // Use an external store for consistency across multiple server instances.
//     message: "Too many requests, please try again later.",
// })
// Apply the rate limiting middleware to all requests.
// app.use(limiter)
