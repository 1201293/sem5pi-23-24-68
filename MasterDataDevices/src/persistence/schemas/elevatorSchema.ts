import { IElevatorPersistence } from "../../dataschema/IElevatorPersistence";
import mongoose from 'mongoose';

const elevatorSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        name: { type: String, unique: false },
        code: { type: String, unique: false },
        description: { type: String, unique: false },
        buildingId: { type: String, unique: false },
        floorsIds: { type: Array, unique: false }
    },

    {
        timestamps: true
    }
);

export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator', elevatorSchema);