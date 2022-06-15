import {
    Document, model, Model, Schema
} from 'mongoose';

export class UserDocument extends Document {
    username: string;

    avatar: string;

    gender: number;
}

const schema = new Schema({
    username: { type: String, required: true },
    avatar: { type: String },
    gender: { type: Number }
});

const User: Model<UserDocument> = model<UserDocument, Model<UserDocument>>('User', schema);

export const updateUser = async (userId: string, user: UserDocument):
    Promise<UserDocument> => User.findOneAndUpdate({
    _id: userId
}, {
    $set: {
        username: user.username, avatar: user.avatar
    }
}, {
    new: true
});

export const createMulti = async (): Promise<void> => {
    const users = [
        {
            username: 'quan',
            avatar: '1',
            gender: 1
        },
        {
            username: 'tuan',
            avatar: '2',
            gender: 1
        },
        {
            username: 'name',
            avatar: '3',
            gender: 1
        }
    ];
    await User.create(users);
}

export const findById = async (id: string): Promise<UserDocument> => User.findOne({ _id: id });

export default User;