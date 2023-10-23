import { Result } from "../../core/logic/Result";
import IFloorDTO from "../../dto/IFloorDTO";

export default interface IFloorService  {
  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  listFloors(buildingId: string): Promise<Result<Array<IFloorDTO>>>;
}
