import { IRobotPersistence } from '../../dataschema/IRobotPersistence';
import mongoose from 'mongoose';

const RobotSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    code: { type: String, unique: true, maxLength: 30},
    name: { type: String, unique: true, maxLength: 30},
    type: { type: String, unique: false },
    number: { type: String, unique: false , maxLength: 50},
    status: { type: String, unique: false },
    description: { type: String, unique: false , maxLength: 250},
  }, 
  {
    timestamps: true
  }
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', RobotSchema);