import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import Users from '../models/user.js';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';
import { sendError, sendSuccess } from '../utils/responses.js';
import { responseMessages } from '../constant/responseMessages.js';
import { generateToken } from '../middleware/token.js';
const { MISSING_FIELDS, USER_NAME_EXISTS, UN_AUTHORIZED, SUCCESS_REGISTRATION, NO_USER, SUCCESS_LOGIN, INVALID_OTP, OTP_EXPIRED, EMAIL_VERIFY, SUCCESS_LOGOUT, MISSING_FIELD_EMAIL, NO_USER_FOUND, RESET_LINK_SUCCESS, PASSWORD_UPDATED, NOT_VERIFY, PASSWORD_AND_CONFIRM_NO_MATCH, RESET_OTP_SECCESS, INVALID_TOKEN } = responseMessages
import { v4 as uuidv4 } from 'uuid'
import { sendEmailOTP } from '../helpers/sendEmail.js';


// @desc    SIGNUP
// @route   POST /api/v1/auth/signup
// @access  Public

export const signUp = async (req, res) => {
    try {
        let { userName, email, password } = req?.body;
        if (!userName || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).send(sendError({ status: false, message: MISSING_FIELDS }));
        } else {
            let isNameExist = await Users.findOne({ email });
            if (isNameExist) {  // if user exist in db
                return res.send(StatusCodes.CONFLICT).status(sendError({ status: false, message: USER_NAME_EXISTS }))
            } else {
                if (password.length > 7) {
                    const hashedPassword = bcrypt.hashSync(password, 10); // Use a different variable
                    const doc = new Users({
                        ...req.body,
                        email: email,
                        password: hashedPassword, // Use the hashed password here
                    })
                    // OTP 
                    const otp = uuidv4().slice(0, 6);
                    doc.otp = otp;
                    doc.expiresIn = Date.now() + 600000; // OTP expires in 10 minutes
                    let savedUser = await doc.save()
                    if (savedUser.errors) {
                        return res.status(StatusCodes.BAD_REQUEST).send(sendError({ status: false, message: error.message, error }));
                    } else {
                        doc.isVerified = false;
                        const emailResponse = await sendEmailOTP(email, otp);
                        savedUser.password = undefined;
                        const token = generateToken({ data: savedUser._doc, res })
                        console.log(emailResponse, "email");
                        return res.status(StatusCodes.CREATED).send(sendSuccess({ status: true, message: SUCCESS_REGISTRATION, data: savedUser, token }));
                    }
                } else {
                    return res.status(StatusCodes.FORBIDDEN).send(sendError({ status: false, message: UN_AUTHORIZED }));
                }
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({ status: 500, message: error.message }));
    }
};




// @desc    VERIFY EMAIL
// @route   POST /api/auth/verifyEmail
// @access  Private

export const verifyEmail = async (req, res) => {
    try {
        const { otp } = req.body;
        if (otp) {
            // console.log(req);
            
            const user = await Users.findOne({ email: req.user.email });
            if (user) {
                const isOtpVerified = await Users.findOne({ otp });
                if (isOtpVerified) {
                    if (user.expiresIn > Date.now()) {
                        user.isVerified = true;
                        user.otp = undefined;
                        await user.save();
                        res.status(StatusCodes.OK).send(sendSuccess({ status: true, message: EMAIL_VERIFY, data: user }))
                    } else {
                        return res.status(StatusCodes.FORBIDDEN).send(sendError({ status: false, message: OTP_EXPIRED }))
                    }
                } else {
                    return res.status(StatusCodes.FORBIDDEN).send(sendError({status: "fail", message: INVALID_OTP }))
                }
            } else {
                return res.status(StatusCodes.FORBIDDEN).send(sendError({ status: false, message: INVALID_OTP }))
            }
        } else {
            return res.status(StatusCodes.BAD_REQUEST).send(sendError({ status: false, message: MISSING_FIELDS }))
        }

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({ status: false, message: error.message, error }))
    }
}



// @desc    SIGNIN
// @route   POST /api/v1/auth/signin
// @access  Public

export const signIn = async (req, res) => {
    try {
        const { email, password } = req?.body;
        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).send(sendError({ status: false, message: MISSING_FIELDS }))
        }
        let user = await Users.findOne({ email });  //find will give an array and findOne only give sile object
        if (user && user.isVerified) {
            const checkPassword = bcrypt.compareSync(password, user.password);
            if (checkPassword) {
                const token = generateToken({ data: user, res });
                user.password = undefined;
                return res.status(StatusCodes.OK).send(sendSuccess({ status: true, message: SUCCESS_LOGIN, data: user, token }))
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).send(sendError({ status: false, message: UN_AUTHORIZED }))
            }

        } else {
            return res.status(StatusCodes.NOT_FOUND).send(sendError({ status: false, message: NO_USER }))
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ status: 500, message: error.message })
    }
}



// @desc    LOGOUT
// @route   POST api/v1/auth/logout
// @access  Public

export const logout = async(req, res) => {
    try {
        res.clearCookie("token", {
            path: "/",
            httpOnly: true,
            secure: true,
        })
        return res.status(StatusCodes.OK).send(sendSuccess({status: true, message: SUCCESS_LOGOUT}));
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, error}));
    }
}




// @desc    FORGOT-PASSWORD-EMAIL
// @route   POST api/v1/auth/forgotPasswordEmail
// @access  Public

export const forgotPasswordEmail = async(req, res) => {
    try {
        const { email } = req.body;
        if (email) {
            const user = await Users.findOne({ email });
            if (user) {
                    if(user?.isVerified){

                const secret = user._id + process.env.JWT_SECRET_KEY;
                const token = generateToken({ data: secret, expiresIn: "30m"})
                const link = `${process.env.CLIENT_URL}/resetPass/${token}`
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.PORTAL_EMAIL,
                        pass: process.env.PORTAL_PASSWORD,
                    },
                });
                
                const mailOptions = {
                    from: process.env.PORTAL_EMAIL,        //email jis se bhejni ho
                    to: email,         //jisko email bhejni ho
                    subject: 'Reset Password',
                    html: `
                    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
                    <h2>Password Reset Request</h2>
                    <p>Hello,</p>
                    <p>We received a request to reset your password. Please click the link below to reset it. This link will expire in <strong>30 minutes</strong>.</p>
                    <p><a href="${link}" style="color: #007bff;">${link}</a></p>
                    <p>If you did not request this, please ignore this email.</p>
                    <p>Thank you,</p>
                    <p>Meraki</p>
                    </div>`
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).status(sendError({status: false, message: error}));
                    } else {
                        console.log(`email send at ${info.response}`);
                        return res.status(OK).send(sendSuccess({status: true, message: RESET_LINK_SUCCESS}))
                    }
                })
                } else{
                    return res.status(StatusCodes.NOT_FOUND).send(sendError({status: false, massage: NOT_VERIFY}))
                }

            } else {
                return res.status(StatusCodes.NOT_FOUND).send(sendError({status: false, message: NO_USER_FOUND}));
            }

        } else {
            req.status(StatusCodes.BAD_REQUEST).send({status: false, message: MISSING_FIELD_EMAIL});
        }

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error}));
    }
}




// @desc    RESET-PASSWORD-EMAIL
// @route   PUT api/v1/auth/resetPasswordEmail
// @access  Private

export const resetPasswordEmail = async(req, res) => {
    try {
        const { token } = req?.params;
        const { newPassword, confirmNewPassword } = req?.body;
        console.log(newPassword, confirmNewPassword, token );
        if(newPassword && confirmNewPassword && token){
            if(newPassword === confirmNewPassword){
                const { data } = jwt.verify(token, process.env.JWT_SECRET_KEY);
                console.log(data);
                const userId = data.slice(0, data.length - process.env.JWT_SECRET_KEY.length);
                const user = await Users.findById(userId)
                if(user){
                    const hashedPassword = bcrypt.hashSync(newPassword, 10);
                    await Users.findByIdAndUpdate(userId, {
                        $set: {password: hashedPassword}
                    })
                    return res.status(OK).send(sendSuccess({status: true, message: PASSWORD_UPDATED}))
                }else{
                    return res.status(StatusCodes.NOT_FOUND).send(sendError({ status: false, message: NO_USER}))
                }
            }else {
                return res.status(StatusCodes.UNAUTHORIZED).send(sendError({status: false, message: PASSWORD_AND_CONFIRM_NO_MATCH}))
            }
        }else{
            return res.status(StatusCodes.BAD_REQUEST).send({status: false, message: MISSING_FIELDS});
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}))
    }
}



// @desc    RESEND-OTP
// @route   POST api/v1/auth/resendOtp
// @access  Private

export const resendOtp = async (req, res) => {
    try {
       const { email, _id } = req.body  
       if(email && _id){
        const isUser = Users.findOne({email, _id});
        if(isUser){
            const newOtp = uuidv4().slice(0,6);
            const updOtp = await Users.findByIdAndUpdate({ _id }, 
                { $set: { otp: newOtp, expiresIn : Date.now() + 600000 }},
                { new: true },
            )
            if(updOtp){
                const emailResponse = await sendEmailOTP(email, newOtp);
                return res.status(StatusCodes.OK).send(sendSuccess({ status: true, message: RESET_OTP_SECCESS, data: newOtp}))
            }else{
                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).status({ status: false, message: INVALID_TOKEN})
            }
        }else{
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(sendError({status: false, message: NO_USER}))
        }
       }else{
        return res.status(StatusCodes.BAD_REQUEST).send(sendError({status: false, message: NO_USER}))
       }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: "fail", message: error.message}))
    }
}



// export const checkAuth = async (req, res) => {
//     try {
//         const user = await Users.findById(req.user._id);
//         if (user) {
//           return res.status(StatusCodes.OK).send(sendSuccess({status: true, data: {...user._doc, password: undefined}}));  
//         } else {
//             return res.status(StatusCodes.BAD_REQUEST).send(sendError({status: false, message: NO_USER}));
//         }
//     } catch (error) {
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(sendError({status: false, message: error.message}))   
//     }
// }