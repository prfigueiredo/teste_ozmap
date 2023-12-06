
import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  address?: string;
  coordinates?: [number, number];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: String,
    coordinates: [Number, Number],
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>('User', userSchema);

export { UserModel, IUser };
