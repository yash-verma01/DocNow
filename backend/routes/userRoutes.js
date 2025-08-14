import express from 'express';
import { registerUser,loginUser, getUserProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

// Route to register a new user
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile',authUser,getUserProfile);
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile);
userRouter.post('/book-appointment',authUser,bookAppointment);
userRouter.get('/list-appointments', authUser, listAppointment);
userRouter.post('/cancel-appointment', authUser, cancelAppointment);
// userRouter.post('/payment-razorpay', authUser, payment);
// userRouter.post('/verify-razorpay', authUser, verifyRazorpayPayment);

export default userRouter;