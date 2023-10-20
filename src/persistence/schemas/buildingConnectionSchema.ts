import { IBuildingConnectionPersistence } from '../../dataschema/IBuildingConnectionPersistence';
import mongoose from 'mongoose';

const BuildingConnectionSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    floor1Id: { type: String, unique: false },
    floor2Id: { type: String, unique: false }
  }, 
  {
    timestamps: true
  }
);

export default mongoose.model<IBuildingConnectionPersistence & mongoose.Document>('BuildingConnection', BuildingConnectionSchema);