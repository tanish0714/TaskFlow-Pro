import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import createTokenAndSaveCookie from '../jwt/generateToken.js'
export const signup=async (req,res)=>{
    const {fullname,email,password,confirmPassword} = req.body; // post request hai to direct body se hi apan maang rhe h
    try {
           if(password!==confirmPassword){
        return res.status(400).json({error:"Password did not Match"})
    }
    const user =await User.findOne({email})
    if(user) return res.status(400).json({error:"User Already Exists"})
        const hashPassword = await bcrypt.hash(password,10) // password ko hash krega
   
        const newUser = await new User({ // agar user exist nahi krta to hi naya user banega
        fullname,
        email,
        password:hashPassword,
        role: "employee",
    })
    await newUser.save()
    if(newUser){
        createTokenAndSaveCookie(newUser._id,res) //user ki id se token bana dega 
        res.status(201).json({message:"User created successfully",
            user:{
            _id:newUser._id,
            fullname:newUser.fullname,
            email:newUser.email,
            role:newUser.role
    }})
    }
    
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
}
export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                error: "Invalid credentials"
            });
        }

        createTokenAndSaveCookie(user._id, res);

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Internal server error"
        });
    }
}
export const logout = async (req,res)=>{
    try {
        res.clearCookie("jwt")
        res.status(200).json({message:"User logout successfull"})
    } catch (error) {
         console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
}
export const AllUsers = async (req,res) =>{
    try {
        const loggedInUser = req.user._id
        const filteredUsers = await User.find({_id:{$ne:loggedInUser}}).select('-password')
        res.status(201).json({filteredUsers})
    } catch (error) {
        console.log("Error in allusers controller" + error)
    }
}