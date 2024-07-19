import User, { IUser } from '../models/user_model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Document } from 'mongoose';

const register = async (req: Request, res: Response) => {

    // Check if the user is valid
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;

    if (email == null || password == null || name == null) {
        return res.status(400).send("Missing email, password or name!!!");
    }

   // Check if it not already registred
   try {
       const user = await User.findOne( {'email': email} );
       if (user != null) {
        return res.status(406).send("Email already exists");
       }
       const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ 'email': email, 'password': encryptedPassword, 'name': name, 'imageUrl': imageUrl });
        return res.status(201).send(newUser);

   } catch(err) {
    return res.status(400).send("Error: Missing email, password or name");
   }
}

export default { register };