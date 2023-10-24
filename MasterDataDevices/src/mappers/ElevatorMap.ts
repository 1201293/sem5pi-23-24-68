import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';

import IElevatorDTO from "../dto/IElevatorDTO";
import { Elevator } from "../domain/elevator";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class ElevatorMap extends Mapper<Elevator>{

    public static toDto(elevator: Elevator): IElevatorDTO {
        return {
            id: elevator.id.toString(),
            code: elevator.code,
            name: elevator.name,
            description: elevator.description,
            buildingId: elevator.buildingId.toString(),
            floorsIds: elevator.floorsIds.map(floorId => floorId.toString())
        } as IElevatorDTO;
    }

    public static toDomain(elevator: any | Model<IElevatorPersistence & Document>): Elevator {
        const elevatorOrError = Elevator.create(
            elevator,
            new UniqueEntityID(elevator.domainId)
        );

        elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';

        return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
    }

    public static toPersistence(elevator: Elevator): any {
        return {
            domainId: elevator.id.toString(),
            name: elevator.name,
            code: elevator.code,
            description: elevator.description,
            buildingId: elevator.buildingId.toString(),
            floorsIds: elevator.floorsIds.map(floorId => floorId.toString())
        }
    }

}