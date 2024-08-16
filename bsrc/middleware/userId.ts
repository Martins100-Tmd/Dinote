import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'ABCXXX00';

interface JwtPayload {
   userId: string;
}

const userAuthMiddleWare = (req: Request, res: Response, next: Function) => {
   const token = req.headers.authorization?.replace('Bearer ', '');
   if (!token) res.status(403).json({ success: false, msg: 'Token authentication failed!' });
   else {
      try {
         const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
         req.body.userId = decoded.userId;
         next();
      } catch (err: any) {
         res.status(401).json({ message: 'Token is not valid', err });
      }
   }
};
export default userAuthMiddleWare;
