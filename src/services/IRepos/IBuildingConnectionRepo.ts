import { Repo } from "../../core/infra/Repo";
import { BuildingConnection } from "../../domain/buildingConnection";
import { BuildingConnectionId } from "../../domain/buildingConnectionId";

export default interface IBuildingConnectionRepo extends Repo<BuildingConnection> {
  save(buildingConnection: BuildingConnection): Promise<BuildingConnection>;
  findByDomainId (buildingConnectionId: BuildingConnectionId | string): Promise<BuildingConnection>;
  findAll():Promise<Array<BuildingConnection>>;
}