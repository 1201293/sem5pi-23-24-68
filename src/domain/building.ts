import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { BuildingId } from "./buildingId";

import IBuildingDTO from "../dto/IBuildingDTO";

interface BuildingProps {
  code: string;
  name: string;
  description: string;
  dimensions: string;
}

export class Building extends AggregateRoot<BuildingProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get buildingId (): BuildingId {
    return new BuildingId(this.buildingId.toValue());
  }

  get name (): string {
    return this.props.name;
  }

  get code (): string{
    return this.props.code;
  }

  get description (): string{
    return this.props.description;
  }

  get dimensions (): string{
    return this.props.dimensions;
  }

  set name ( value: string) {
    this.props.name = value;
  }

  set code ( value: string) {
    this.props.code = value;
  }

  set description ( value: string) {
    this.props.description = value;
  }

  set dimensions ( value: string) {
    this.props.dimensions = value;
  }
  private constructor (props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (buildingDTO: IBuildingDTO, id?: UniqueEntityID): Result<Building> {

    if (!!buildingDTO.code === false || buildingDTO.code.length === 0 || buildingDTO.code.length > 5) {
      return Result.fail<Building>('Must provide a building code(max 5 characters)');
    }else if(!!buildingDTO.description === false){
      return Result.fail<Building>('Must provide a building description');
    }else if(!!buildingDTO.dimensions === false ){
      return Result.fail<Building>('Must provide the building dimensions');
    } else if(buildingDTO.name.length>50){
      return Result.fail<Building>('Building name cant have more than 50 characters');
    }else {
      const building = new Building({ name: buildingDTO.name,code: buildingDTO.code,dimensions: buildingDTO.dimensions,description:buildingDTO.description }, id);
      return Result.ok<Building>( building )
    }
  }
}
