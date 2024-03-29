
import jwt from 'jsonwebtoken';

export function generateToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' });
}