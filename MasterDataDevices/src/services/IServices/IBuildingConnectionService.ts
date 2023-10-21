import { Result } from "../../core/logic/Result";
import IBuildingConnectionDTO from "../../dto/IBuildingConnectionDTO";

export default interface IBuildingConnectionService  {
  createBuildingConnection(buildingConnectionDTO: IBuildingConnectionDTO): Promise<Result<IBuildingConnectionDTO>>;
  listBuildingConnections(): Promise<Result<Array<IBuildingConnectionDTO>>>;
  updateBuildingConnection(buildingConnectionDTO: IBuildingConnectionDTO): Promise<Result<IBuildingConnectionDTO>>;
}
