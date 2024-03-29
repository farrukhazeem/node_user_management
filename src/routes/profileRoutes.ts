import express from 'express';
import { getUserById, getUsers,updateUser,updateAvatar,getAvatarById } from '../controllers/profile';
import { upload } from "../middleware/uploader";

const router = express.Router();
router.get('/getUsers', getUsers);
router.get('/getUserbyId/:id', getUserById);
router.patch('/updateUser/:id',updateUser);
router.patch('/updateAvatar/:id',upload.single("file"),updateAvatar);
router.get('/getImage/:id', getAvatarById);


export default router;