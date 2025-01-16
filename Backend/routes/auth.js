import express from 'express';
import { createRateLimiter } from '../middleware/rate-limitting.js';
import { signUp, signIn, verifyEmail, resetPasswordEmail, logout, forgotPasswordEmail, resendOtp } from '../controllers/auth.js';
import { tokenVerify } from '../middleware/token.js';
const authRouter = express.Router();

authRouter.post('/signup', createRateLimiter(5 * 60 * 1000, 5, "Too much signup request hit, please try again after five minute"), signUp);
authRouter.post('/signin', createRateLimiter(4 * 60 * 1000, 10, "Too much signin request hit, please try again after four minute"), signIn);
authRouter.post('/logout', createRateLimiter(5 * 60 * 1000, 5, "Too much signin request hit, please try again after five minute"), logout);
authRouter.post('/verifyEmail', tokenVerify, verifyEmail);
authRouter.post('/forgotPass', forgotPasswordEmail);
authRouter.post('/resetPass/:token', resetPasswordEmail);
authRouter.post('/resendOtp', createRateLimiter(2 * 60 * 1000, 5, "Too much otp request hit, please try again after two minute"), resendOtp);
// authRouter.get("/checkAuth", tokenVerify, checkAuth);

export default authRouter;