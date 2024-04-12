import jwt from 'jsonwebtoken';
import jwtSecret from '../config/jwt.mjs';

function verifyToken(req,res,next){
    try {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, jwtSecret)
        next()
    } catch (error) {
        res.send({ message: error.message })
    }
}
export default verifyToken