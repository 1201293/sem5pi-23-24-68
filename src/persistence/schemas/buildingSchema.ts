import { IRolePersistence } from '../../dataschema/IRolePersistence';
import mongoose from 'mongoose';

const BuildingSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    code: { type: String, unique: true, maxLength: 5},
    name: { type:String, unique:false, maxLength:50},
    dsescription: { type:String, unique:false }
  }, 
  {
    timestamps: true
  }
);

export default mongoose.model<IRolePersistence & mongoose.Document>('Building', BuildingSchema);