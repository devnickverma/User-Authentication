import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import bcryptjs from "bcryptjs";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
       const {email, password, name} = req.body;

       try{
         if(!email || !password || !name){
            return new Error("All fields are required");
         }

         const userAlreadyExists = await User.findOne({email});
         console.log("userAlreadyExists", userAlreadyExists);

         if(userAlreadyExists){
            return res.status(400).json({success: false, message: "User already exists"});
         }

         const hashedPassword = await bcryptjs.hash(password, 10);
         const verificationToken = Math.floor(Math.random() * 900000).toString();
        
         const user = new User({
            email, 
            password: hashedPassword, 
            name,
            verificationToken,
            verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000
        })

        await user.save();
    
        // JWT token generation
        generateTokenAndSetCookie(res, user._id);

        // Send verification email
        await sendVerificationEmail(user.email, verificationToken);

        return res.status(200).json({
            success: true, 
            message: "User created successfully",
            user: {
                ...user._id,
                password: undefined
            }
        }); // continue from here

       }catch(error){
        return res.status(400).json({success: false, message: error.message});
       }
};

export const verifyEmail = async (req, res) => {
       const { code } = req.body;

       try{
           const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpireAt: {$gt: Date.now()}
           });
           
           if(!user){
            return res.status(400).json({success: false, message: "Invalid or expired verification code"});
           }

           user.isVerified = true;
           user.verificationToken = undefined;
           user.verificationTokenExpireAt = undefined;

           await user.save();

          await sendWelcomeEmail(user.email, user.name);

          res.status(200).json({
            success: true, 
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined
            }
          });

        } catch(error){
          console.log("Error in verifyEmail : ", error);
          return res.status(400).json({success: false, message: error.message});
       }
}



export const login = async (req, res) => {
    res.send("Login route");
};
export const logout = async (req, res) => {
    res.send("Logout route");
};


// Continue from here :- change the temp mail with new on

// export const verifyEmail = async (req, res) => {
//     const { code } = req.body;

//     try {
//         const user = await User.findOne({
//             verificationToken: code,
//             verificationTokenExpireAt: { $gt: Date.now() },
//         });

//         if (!user) {
//             return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
//         }

//         user.isVerified = true;
//         user.verificationToken = undefined;
//         user.verificationTokenExpireAt = undefined;

//         await user.save();

//         try {
//             await sendWelcomeEmail(user.email, user.name);
//         } catch (error) {
//             return res.status(500).json({ success: false, message: `Error sending welcome email: ${error.message}` });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Email verified successfully",
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//             },
//         });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };

