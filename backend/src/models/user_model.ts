import mongoose from 'mongoose';

export interface IUser {
    email: string;
    password: string;
    name: string;
    // birthday: string,
    // gender: string,
    // mainGoal: string,
    // specialDiets: string,
    // healthConditions: string,
    // comment: string,
    _id?: string;
    refreshTokens?: string[];
    expiredTokens?: string[];
    imageUrl?: string;
  }

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    // birthday: {
    //     type: String,
    //     required: true
    // },
    // gender: {
    //     type: String,
    //     required: true
    // },
    // mainGoal: {
    //     type: String,
    //     required: true
    // },
    // specialDiets: {
    //   type: String,
    //   required: true
    // },
    // healthConditions: {
    //   type: String,
    //   required: true
    // },
    // comment: {
    //   type: String,
    //   required: true
    // },
    refreshTokens: {
        type: [String],
        required: false,
      },
    expiredTokens: {
      type: [String],
      required: false
    },
      imageUrl: {
        type: String,
      },
   
});

export default mongoose.model<IUser>('User', userSchema);