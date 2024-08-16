import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '/env') });

const JWT_SECRET = process.env.JWT_SECRET;

export function JWT(id: string) {
   const token = jwt.sign({ userId: id }, JWT_SECRET ?? 'ABCXXX00', { expiresIn: '1h' });
   return token;
}
