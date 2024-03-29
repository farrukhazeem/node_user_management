import { Request, Response } from 'express';
import { User } from '../models/User';
import * as fs from 'fs';
import path from 'path';


export async function getUsers(req: Request, res: Response){
    try {
       const foundUser = await User.findAll();
       if(!foundUser){
        res.status(401).json({ message: 'User not found' });

       }           
        return res.status(200).json({ message: 'All Users record found successfully', data: foundUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


    export async function getUserById(req: Request, res: Response){
        try {
           const foundUser = await User.findByPk(req.params.id);
           if(!foundUser){
            res.status(401).json({ message: 'User not found' });

           }           
            return res.status(200).json({ message: 'User found successfully', data: foundUser });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
};

export async function updateUser(req: Request, res: Response){
    const { username, email } = req.body;
        try {
            const foundUser = await User.findOne({ where: { id: req.params.id } });

            if (!foundUser) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            if (username) {
                foundUser.username = username;
            }
            if (email) {
                foundUser.email = email;
            }
            await foundUser.save(); 
        return res.status(200).json({ message: 'User updated successfully', data: foundUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export async function updateAvatar(req: Request, res: Response) {
    const image = req.file?.filename;

    try {
        const port = process.env.PORT;
        const baseUrl = `${req.protocol}://${req.hostname}:${port}`;
        const imageUrl = `${baseUrl}/uploads/${image}`; // Assuming 'uploads' is the folder where images are saved

        const foundUser = await User.findOne({ where: { id: req.params.id } });
        
        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract filename from existing avatar URL, if it exists
        const existingImageUrl = foundUser?.dataValues.avatar;
        let existingImageFilename = null;
        if (existingImageUrl) {
            existingImageFilename = existingImageUrl.split('/').pop();
        }

        // Remove the old image file from the upload folder if it exists
        if (existingImageFilename) {
            const uploadPath= path.resolve('uploads')
            const imagePath = uploadPath+'/'+existingImageFilename;
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

                // Update the user's avatar in the database
                const update= await User.update(
                    { avatar: imageUrl },
                    { where: { id: req.params.id } }
                );

        return res.status(200).json({ message: 'User avatar updated successfully', data:update });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export async function getAvatarById(req: Request, res: Response){
    try {
       const foundUser = await User.findByPk(req.params.id);
       const imageUrl= foundUser?.dataValues.avatar;
       if(!foundUser){
        res.status(401).json({ message: 'User not found' });

       }           
        return res.status(200).json({ message: 'User found successfully', data: imageUrl });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



