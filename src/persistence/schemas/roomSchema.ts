import { IRoomPersistence } from '../../dataschema/IRoomPersistence';
import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    name: { type: String, unique: true, maxLength: 4},
    floorId: { type: String, unique: false },
    category: { type: String, unique: false},
    description: { type: String, unique: false},
  }, 
  {
    timestamps: true
  }
);

export default mongoose.model<IRoomPersistence & mongoose.Document>('Room', RoomSchema);