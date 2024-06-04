import jwt from 'jsonwebtoken';
import httpStatusCode from '@/constants/httpStatusCode';

const VerifyToken = async (token: any) => {
    if (!token) {
        return null;
    }
    try {
        const JWT_SECRET = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        return decoded.user;
    } catch (error) {
        console.log("Error in verify token", error);
        return null;
    }
};

export default VerifyToken;
