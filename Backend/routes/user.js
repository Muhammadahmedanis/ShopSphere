import express from 'express';
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middleware/token.js';
import { deletetUser, fetchUsersByMonth, getAllUser, getUser, updatetUser} from '../controllers/user.js';

const userRouter = express.Router();

userRouter.put("/:id", verifyTokenAndAuthorization, updatetUser);
userRouter.delete("/:id", verifyTokenAndAuthorization, deletetUser);
userRouter.get("/find/:id", verifyTokenAndAdmin, getUser);
userRouter.get("/", getAllUser);
userRouter.get("/stats", fetchUsersByMonth);

export default userRouter;