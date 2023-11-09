import { IBuildingConnectionPersistence } from '../../dataschema/IBuildingConnectionPersistence';
import mongoose from 'mongoose';

const BuildingConnectionSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    floor1Id: { type: String, unique: false },
    floor2Id: { type: String, unique: false },
    description: {type:String, unique:false},
    posX:{type: Number,unique:false},
    posY:{type: Number,unique:false},
  }, 
  {
    timestamps: true
  }
);

export default mongoose.model<IBuildingConnectionPersistence & mongoose.Document>('BuildingConnection', BuildingConnectionSchema);