import User from '../models/user_model';
import { Request, Response } from 'express';

const getAllUsers = async (req: Request, res: Response) => {
    try {
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

const getUserByName = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ name: req.params.name });
        res.send(user);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

const putUserById = async (req: Request, res: Response) => {
    try {
        let user;
        if (req.body.email) {
            user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { email: req.body.email, name: req.body.name },
                { new: true } // To return the updated document
            );
        }
        res.status(204).json({ message: user });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

const deleteUserById = async (req: Request, res: Response) => {
    console.log("deleteUserById");
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.send(user);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export default { getAllUsers, getUserById, putUserById, deleteUserById, getUserByName, createUser };
