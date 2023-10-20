import { Service, Inject } from 'typedi';
import config from "../../config";
import IBuildingConnectionDTO from '../dto/IBuildingConnectionDTO';
import { BuildingConnection } from "../domain/buildingConnection";
import IBuildingConnectionRepo from '../services/IRepos/IBuildingConnectionRepo';
import IBuildingConnectionService from './IServices/IBuildingConnectionService';
import { Result } from "../core/logic/Result";
import { BuildingConnectionMap } from "../mappers/BuildingConnectionMap";
import IFloorRepo from '../services/IRepos/IFloorRepo';

@Service()
export default class BuildingConnectionService implements IBuildingConnectionService {
  constructor(
      @Inject(config.repos.buildingConnection.name) private buildingConnectionRepo : IBuildingConnectionRepo,
      @Inject(config.repos.floor.name) private floorRepo : IFloorRepo
  ) {}

  public async createBuildingConnection(buildingConnectionDTO: IBuildingConnectionDTO): Promise<Result<IBuildingConnectionDTO>> {
    try {

        const floorOrError1 = await this.floorRepo.findByDomainId(buildingConnectionDTO.floor1Id);

        if (floorOrError1 === null) {
            return Result.fail<IBuildingConnectionDTO>(buildingConnectionDTO);
        }

        const floorOrError2 = await this.floorRepo.findByDomainId(buildingConnectionDTO.floor2Id);

        if (floorOrError2 === null) {
            return Result.fail<IBuildingConnectionDTO>(buildingConnectionDTO);
        }

        if (floorOrError1.buildingId === floorOrError2.buildingId) {
            return Result.fail<IBuildingConnectionDTO>(buildingConnectionDTO);
        }

        const sameFloorsOrError = await this.buildingConnectionRepo.findAll();

        if (sameFloorsOrError.length != 0) {
            let failed = false;
            for (let i = 0; i < sameFloorsOrError.length; i++) {
                if ((sameFloorsOrError[i].floor1Id == buildingConnectionDTO.floor1Id && sameFloorsOrError[i].floor2Id == buildingConnectionDTO.floor2Id) || (sameFloorsOrError[i].floor1Id == buildingConnectionDTO.floor2Id && sameFloorsOrError[i].floor2Id == buildingConnectionDTO.floor1Id)) {
                    failed = true;
                    break;
                }
            }
            if (failed) {
                return Result.fail<IBuildingConnectionDTO>(sameFloorsOrError);
            }
        }

        const buildingConnectionOrError = await BuildingConnection.create( buildingConnectionDTO );

        if (buildingConnectionOrError.isFailure) {
            return Result.fail<IBuildingConnectionDTO>(buildingConnectionOrError.errorValue());
        }

        const buildingConnectionResult = buildingConnectionOrError.getValue();

        await this.buildingConnectionRepo.save(buildingConnectionResult);

        const buildingConnectionDTOResult = BuildingConnectionMap.toDTO( buildingConnectionResult ) as IBuildingConnectionDTO;
        return Result.ok<IBuildingConnectionDTO>( buildingConnectionDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async listBuildingConnections(): Promise<Result<IBuildingConnectionDTO[]>> {
    try {
      const buildingConnectionResult = await this.buildingConnectionRepo.findAll();

      const buildingConnections=[];

      if(buildingConnectionResult.length != 0){
        buildingConnectionResult.forEach((element) => {
          buildingConnections.push(BuildingConnectionMap.toDTO(element));
        })
      }
      return Result.ok<IBuildingConnectionDTO[]>( buildingConnections );
    } catch (e) {
      throw e;
    }
  }

  public async updateBuildingConnection(buildingConnectionDTO: IBuildingConnectionDTO): Promise<Result<IBuildingConnectionDTO>> {
      try{
        const buildingConnectionResult= await this.buildingConnectionRepo.findByDomainId(buildingConnectionDTO.id);

        if(buildingConnectionResult == null){
            return Result.fail<IBuildingConnectionDTO>("BuildingConnection Id does not exist");
        }

        if(!!buildingConnectionDTO.floor1Id){
            buildingConnectionResult.floor1Id = buildingConnectionDTO.floor1Id;
        }

        if(!!buildingConnectionDTO.floor2Id){
            buildingConnectionResult.floor2Id = buildingConnectionDTO.floor2Id;
        }

        await this.buildingConnectionRepo.save(buildingConnectionResult);

        const buildingConnectionDTOResult = BuildingConnectionMap.toDTO( buildingConnectionResult ) as IBuildingConnectionDTO;
        return Result.ok<IBuildingConnectionDTO>( buildingConnectionDTOResult )
      }catch(e){
        throw e;
      }
  }

}
