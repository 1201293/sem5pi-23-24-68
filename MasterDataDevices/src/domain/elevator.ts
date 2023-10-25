import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { ElevatorId } from "./elevatorId";

import IElevatorDTO from "../dto/IElevatorDTO";
import { BuildingId } from "./buildingId";
import { Code } from "mongodb";

interface ElevatorProps {
    code: string;
    buildingId: string;
    floorsIds: string[];
    name: string;
    description: string;
    posX:number;
    posY:number;
}

export class Elevator extends AggregateRoot<ElevatorProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get elevatorId (): ElevatorId {
        return new ElevatorId(this.elevatorId.toValue());
    }

    get code (): string {
        return this.props.code;
    }

    get buildingId (): string {
        return this.props.buildingId;
    }

    get floorsIds (): string[] {
        return this.props.floorsIds;
    }

    get name (): string {
        return this.props.name;
    }

    get description (): string {
        return this.props.description;
    }

    get posX():number{
        return this.props.posX;
    }

    get posY():number{
        return this.props.posY;
    }

    set code (code: string) {
        this.props.code = code;
    }

    set buildingId (buildingId: string) {
        this.props.buildingId = buildingId;
    }

    set floorsIds (floorsIds: string[]) {
        this.props.floorsIds = floorsIds;
    }

    set name (name: string) {
        this.props.name = name;
    }

    set description (description: string) {
        this.props.description = description;
    }

    set  posX(value:number){
        this.props.posX=value;
    }

    set  posY(value:number){
        this.props.posY=value;
    }


    private constructor (props: ElevatorProps, id?: UniqueEntityID){
        super(props,id);
    }

    public static create (elevatorDTO: IElevatorDTO, id?: UniqueEntityID): Result<Elevator> {
    
        if(!!elevatorDTO.code === false || elevatorDTO.code.length === 0 || elevatorDTO.code.length > 5){
            return Result.fail<Elevator>("Must provide a elevator code(max 5 characters)");
        } else if(!!elevatorDTO.description === false){
            return Result.fail<Elevator>("Must provide a elevator description");
        } else if(elevatorDTO.name.length > 50){
            return Result.fail<Elevator>("Elevator name can't have more than 50 characters");
        } else {
            const elevator = new Elevator({code: elevatorDTO.code, name: elevatorDTO.name, buildingId: elevatorDTO.buildingId, floorsIds: elevatorDTO.floorsIds, description: elevatorDTO.description,posX: undefined,posY: undefined}, id);
            return Result.ok<Elevator>(elevator);
        }
    }

}