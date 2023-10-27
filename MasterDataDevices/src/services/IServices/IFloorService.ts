import { Result } from "../../core/logic/Result";
import IBuildingConnectionDTO from "../../dto/IBuildingConnectionDTO";
import IElevatorDTO from "../../dto/IElevatorDTO";
import IFloorDTO from "../../dto/IFloorDTO";
import IRoomDTO from "../../dto/IRoomDTO";

export default interface IFloorService  {
  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  loadMap(floorId: string,map: number[][],roomsDTO: IRoomDTO[],elevatorDTO: IElevatorDTO,buildingConnectionsDTO: IBuildingConnectionDTO[]) : Promise<Result<IFloorDTO>>;
  listFloors(buildingId: string): Promise<Result<Array<IFloorDTO>>>;
  listFloorsWithBuildingConnections(buildingId: string): Promise<Result<Array<IFloorDTO>>>;
  updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  listFloorsWithElevator(buildingId: string): Promise<Result<Array<IFloorDTO>>>;
}
