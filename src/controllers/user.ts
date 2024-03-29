import { Request, Response } from 'express';
import { hashPassword, comparePasswords } from '../middleware/authentication';
import { generateToken } from '../utils/token';
import { User } from '../models/User';

export async function register(req: Request, res: Response): Promise<void> {
    const { username,email, password } = req.body;

    try {
        const hashedPassword = await hashPassword(password);
        const user= await User.create({ username,email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully',data:user });
    } catch (error:any) {
        const errorMessage = error.errors[0].message;
        res.status(500).json({ message: 'Failed to register user', error: errorMessage });
    }
}

export async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    console.log(email,password)

    try {
        const foundUser = await User.findOne({ where: { email } });
        const user= foundUser?.dataValues;
        if (!foundUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const passwordMatch = await comparePasswords(password, foundUser.password);
        if (!passwordMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = generateToken({ email: foundUser.email });
        res.status(200).json({  message: 'Login successful', user, token });
    } catch (error:any) {
        const errorMessage = error.errors[0].message;
        res.status(500).json({ message: 'Failed to login' , error: errorMessage });
    }
}

// export async function uploads(req: Request, res: Response){
//     try {
//         const userId: number = parseInt(req.params.userId);
//         const user: User | null = await User.findByPk(userId);
//         console.log(userId)
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Check if file is uploaded
//         const avatarFile = req.file;
//         if (!avatarFile) {
//             return res.status(400).json({ error: 'Avatar file not uploaded' });
//         }

//         // Save avatar path to the user record
//         user.avatar = avatarFile.path;
//         await user.save();

//         res.status(200).json({ message: 'Avatar updated successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


