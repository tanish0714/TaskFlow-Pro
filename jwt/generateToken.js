import jwt from 'jsonwebtoken'
// created for validation jiske pass token hoga whi chat kr payega
const createTokenAndSaveCookie=(userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_TOKEN,{
        expiresIn:"10d"
    })
    res.cookie('jwt',token,{
        httpOnly:true, // saves from accessive attacks
        secure:true,  
        sameSite:"none" // stricts same sites
    })
    
}
export default createTokenAndSaveCookie
