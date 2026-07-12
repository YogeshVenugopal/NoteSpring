import jwt from 'jsonwebtoken';

const useAuth = async(req, res, next) => {
    const { token } = req.cookies;

    if(!token){
        return res.json({
            success: false,
            message: "Not authorized Login again"
        })
    }

    try {
        
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecoded.id){
            req.body.userId = tokenDecoded.id;
        }
        else{
            return res.json({
                success: false,
                message: 'Not authorized login again'
            })
        }

        return next();

    } catch (error) {
        return res.json({
            success: false,
            message: "Internal server error"
        })
    }
}


export default useAuth;