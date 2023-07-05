require('dotenv').config();



const jwt = require ('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.spliy(' ')[1]
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = decode
        next()
    }
    catch (error){
        res.status(403).json({
                message: 'Authentication failed'
        })
    }
}

module.exports= authenticate