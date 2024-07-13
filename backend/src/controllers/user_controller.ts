import User from '../models/user_model';
import { Request, Response } from 'express';

const getAllUsers = async (req: Request, res: Response) => {
    try {
        let users;
         if (req.params.email) {
             users = await User.find( { email: req.params.email } );
         }
         else if (req.params.id) {
             users = await User.find( { _id: req.params._id } );
         }
         else {
            users = await User.find();
        }
        res.send(users);
    } catch (err) {
        res.status(500).json( {message: err.message} );
    }
  
};

const getUserByName = async (req: Request, res: Response) => {
    try {
        const users = await User.findOne({name: req.params.name});
        res.send(users);
    } catch (err) {
        res.status(500).json( {message: err.message} );
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const users = await User.findById(req.params.id);
        res.send(users);
    } catch (err) {
        res.status(500).json( {message: err.message} );
    }
};

const putUserById = async (req: Request, res: Response) => {
       try {
           let user;
        if (req.body.email) {
             user = await User.findOneAndUpdate({_id: req.params.id}, {"email" :req.body.email, "name": req.body.name});
        
        }
        res.status(204).json({"message": user});
            
    } catch (err) {
        res.status(500).json( {message: err.message} );
    }
   };

   const deleteUserById = async (req: Request, res: Response) => {
    console.log("deleteUserById");
    try {
        const users = await User.findByIdAndDelete(req.params.id);
        res.send(users);
    } catch (err) {
        res.status(500).json( {message: err.message} );
    }
};

export default { getAllUsers, getUserById, putUserById, deleteUserById, getUserByName };