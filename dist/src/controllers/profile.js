"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvatarById = exports.updateAvatar = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const User_1 = require("../models/User");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield User_1.User.findAll();
            if (!foundUser) {
                res.status(401).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: 'All Users record found successfully', data: foundUser });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.getUsers = getUsers;
;
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield User_1.User.findByPk(req.params.id);
            if (!foundUser) {
                res.status(401).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: 'User found successfully', data: foundUser });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.getUserById = getUserById;
;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email } = req.body;
        try {
            const foundUser = yield User_1.User.findOne({ where: { id: req.params.id } });
            if (!foundUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (username) {
                foundUser.username = username;
            }
            if (email) {
                foundUser.email = email;
            }
            yield foundUser.save();
            return res.status(200).json({ message: 'User updated successfully', data: foundUser });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.updateUser = updateUser;
;
function updateAvatar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        try {
            const port = process.env.PORT;
            const baseUrl = `${req.protocol}://${req.hostname}:${port}`;
            const imageUrl = `${baseUrl}/uploads/${image}`; // Assuming 'uploads' is the folder where images are saved
            const foundUser = yield User_1.User.findOne({ where: { id: req.params.id } });
            if (!foundUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Extract filename from existing avatar URL, if it exists
            const existingImageUrl = foundUser === null || foundUser === void 0 ? void 0 : foundUser.dataValues.avatar;
            let existingImageFilename = null;
            if (existingImageUrl) {
                existingImageFilename = existingImageUrl.split('/').pop();
            }
            // Remove the old image file from the upload folder if it exists
            if (existingImageFilename) {
                const uploadPath = path_1.default.resolve('uploads');
                const imagePath = uploadPath + '/' + existingImageFilename;
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            // Update the user's avatar in the database
            const update = yield User_1.User.update({ avatar: imageUrl }, { where: { id: req.params.id } });
            return res.status(200).json({ message: 'User avatar updated successfully', data: update });
        }
        catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.updateAvatar = updateAvatar;
;
function getAvatarById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield User_1.User.findByPk(req.params.id);
            const imageUrl = foundUser === null || foundUser === void 0 ? void 0 : foundUser.dataValues.avatar;
            if (!foundUser) {
                res.status(401).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: 'User found successfully', data: imageUrl });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.getAvatarById = getAvatarById;
;
