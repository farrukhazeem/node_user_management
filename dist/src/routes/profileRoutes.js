"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_1 = require("../controllers/profile");
const uploader_1 = require("../middleware/uploader");
const router = express_1.default.Router();
router.get('/getUsers', profile_1.getUsers);
router.get('/getUserbyId/:id', profile_1.getUserById);
router.patch('/updateUser/:id', profile_1.updateUser);
router.patch('/updateAvatar/:id', uploader_1.upload.single("file"), profile_1.updateAvatar);
router.get('/getImage/:id', profile_1.getAvatarById);
exports.default = router;
