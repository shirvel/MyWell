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

// const putUserById = async (req: Request, res: Response) => {
//        try {
//            let user;
//         if (req.body.email) {
//              user = await User.findOneAndUpdate({_id: req.params.id}, {"email" :req.body.email, "name": req.body.name});
        
//         }
//         res.status(204).json({"message": user});
            
//     } catch (err) {
//         res.status(500).json( {message: err.message} );
//     }
// };

    const putUserById = async (req: Request, res: Response) => {
    //     try {
    //         let user;
    //     if (req.body.email) {
    //         user = await User.findOneAndUpdate({_id: req.params.id}, {"email" :req.body.email, "name": req.body.name});
        
    //     }
    //     res.status(204).json({"message": user});
            
    // } 
    try {
        const updateFields: any = {};

        if (req.body.email) updateFields.email = req.body.email;
        if (req.body.name) updateFields.name = req.body.name;
        if (req.body.birthday) updateFields.birthday = req.body.birthday;
        if (req.body.gender) updateFields.gender = req.body.gender;
        if (req.body.mainGoal) updateFields.mainGoal = req.body.mainGoal;
        if (req.body.specialDiets) updateFields.specialDiets = req.body.specialDiets;
        if (req.body.healthConditions) updateFields.healthConditions = req.body.healthConditions;
        if (req.body.comment) updateFields.comment = req.body.comment;

        const user = await User.findOneAndUpdate({ _id: req.params.id }, updateFields, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(204).json({ "message": user });
    } 
    
    catch (err) {
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

// TODO: delete it, it's not relevent anymore
const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export default { getAllUsers, getUserById, putUserById, deleteUserById, getUserByName, createUser };