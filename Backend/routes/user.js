import express from 'express';
import { deletetUser, editUser, getAllUser, updatetUser} from '../controllers/user.js';
import { verifyAdmin } from '../middleware/token.js';
const userRouter = express.Router();

userRouter.get("/getUsers", verifyAdmin, getAllUser);
userRouter.get("/editUser/:id", verifyAdmin, editUser);
userRouter.put("/updUser/:id", updatetUser);
userRouter.delete("/deleteUser/:id", verifyAdmin, deletetUser);

export default userRouter;