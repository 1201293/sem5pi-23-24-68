import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { BuildingConnectionId } from "./buildingConnectionId";

import IBuildingConnectionDTO from "../dto/IBuildingConnectionDTO";

interface BuildingConnectionProps {
  floor1Id: string;
  floor2Id: string;
  posX: number;
  posY: number;
}

export class BuildingConnection extends AggregateRoot<BuildingConnectionProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get buildingConnectionId (): BuildingConnectionId {
    return new BuildingConnectionId(this.buildingConnectionId.toValue());
  }

  get floor1Id (): string {
    return this.props.floor1Id;
  }

  get floor2Id (): string {
    return this.props.floor2Id;
  }

  get posX():number{
    return this.props.posX; 
  }

  get posY():number{
    return this.props.posY;
  }

  set floor1Id ( value: string) {
    this.props.floor1Id = value;
  }

  set floor2Id ( value: string) {
    this.props.floor2Id = value;
  }

  set  posX(value:number){
    this.props.posX=value;
    }

  set  posY(value:number){
    this.props.posY=value;
  }

  private constructor (props: BuildingConnectionProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (buildingConnectionDTO: IBuildingConnectionDTO, id?: UniqueEntityID): Result<BuildingConnection> {

    if (!!buildingConnectionDTO.floor1Id === false || !!buildingConnectionDTO.floor2Id === false) {
        return Result.fail<BuildingConnection>('Must provide a floor id');
    }else {
      const buildingConnection = new BuildingConnection({ floor1Id: buildingConnectionDTO.floor1Id, floor2Id: buildingConnectionDTO.floor2Id,posX: undefined,posY:undefined },id);
      return Result.ok<BuildingConnection>( buildingConnection )
    }
  }
}
