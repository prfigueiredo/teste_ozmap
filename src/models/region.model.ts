
import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user.model';

interface IRegion extends Document {
  name: string;
  coordinates: [number, number];
  owner: IUser['_id'];
}

const regionSchema = new Schema<IRegion>(
  {
    name: { type: String, required: true },
    coordinates: { type: [Number, Number], required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const RegionModel = mongoose.model<IRegion>('Region', regionSchema);

export { RegionModel, IRegion };
