import { Result } from "../../core/logic/Result";
import { Building } from "../../domain/building";
import { BuildingId } from "../../domain/buildingId";
import IFloorDTO from "../../dto/IFloorDTO";

export default interface IFloorService  {
  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  listFloors(buildingId: BuildingId): Promise<Result<Array<IFloorDTO>>>;
}
