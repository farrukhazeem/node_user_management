"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authentication_1 = require("../middleware/authentication");
const token_1 = require("../utils/token");
const User_1 = require("../models/User");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        try {
            const hashedPassword = yield (0, authentication_1.hashPassword)(password);
            const user = yield User_1.User.create({ username, email, password: hashedPassword });
            res.status(201).json({ message: 'User registered successfully', data: user });
        }
        catch (error) {
            const errorMessage = error.errors[0].message;
            res.status(500).json({ message: 'Failed to register user', error: errorMessage });
        }
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        console.log(email, password);
        try {
            const foundUser = yield User_1.User.findOne({ where: { email } });
            const user = foundUser === null || foundUser === void 0 ? void 0 : foundUser.dataValues;
            if (!foundUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const passwordMatch = yield (0, authentication_1.comparePasswords)(password, foundUser.password);
            if (!passwordMatch) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }
            const token = (0, token_1.generateToken)({ email: foundUser.email });
            res.status(200).json({ message: 'Login successful', user, token });
        }
        catch (error) {
            const errorMessage = error.errors[0].message;
            res.status(500).json({ message: 'Failed to login', error: errorMessage });
        }
    });
}
exports.login = login;
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
