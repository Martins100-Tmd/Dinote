import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { JWT } from '../util/jwt';
import { EventEmitter } from 'stream';
const JWT_SECRET = process.env.JWT_SECRET || 'ABCXXX123';

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
         if (err.message == 'Token Error jwt expired') {
            let tkn = JWT(req.body.userId);
            req.headers.authorization = 'Bearer ' + tkn;
            res.status(200).json({ message: 'Token Expired', token: tkn });
         }
      }
   }
};
export default userAuthMiddleWare;
