import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { RoomId } from "./roomId";

import IRoomDTO from "../dto/IRoomDTO";
import { floor } from "lodash";

interface RoomProps {
  floorId: string;
  name: string;
  category: string;
  description: string;
}

export class Room extends AggregateRoot<RoomProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get roomId (): RoomId {
    return new RoomId(this.roomId.toValue());
  }

  get floorId (): string {
    return this.props.floorId;
  }

  get name (): string {
    return this.props.name;
  }

  get category (): string{
    return this.props.category;
  }

  get description (): string{
    return this.props.description;
  }

  set floorId ( value: string) {
    this.props.floorId = value;
  }

  set name ( value: string) {
    this.props.name = value;
  }

  set category ( value: string) {
    this.props.category = value;
  }

  set description ( value: string) {
    this.props.description = value;
  }

  private constructor (props: RoomProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (roomDTO: IRoomDTO, id?: UniqueEntityID): Result<Room> {

    if (!!roomDTO.floorId === false) {
      return Result.fail<Room>('Must provide a floor id')
    }else if (!!roomDTO.category === false) {
      return Result.fail<Room>('Must provide a room cegory');
    }else if(!!roomDTO.description === false){
      return Result.fail<Room>('Must provide a room description');
    }else if(roomDTO.name.length > 4){
      return Result.fail<Room>('Room name cant have more than 4 characters');
    }else {
      const room = new Room({floorId: roomDTO.floorId, name: roomDTO.name, category: roomDTO.category, description:roomDTO.description}, id);
      return Result.ok<Room>( room );
    }
  }
}
