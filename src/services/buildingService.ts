import { Service, Inject } from 'typedi';
import config from "../../config";
import IBuildingDTO from '../dto/IBuildingDTO';
import { Building } from "../domain/building";
import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import IBuildingService from './IServices/IBuildingService';
import { Result } from "../core/logic/Result";
import { BuildingMap } from "../mappers/BuildingMap";

@Service()
export default class BuildingService implements IBuildingService {
  constructor(
      @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
  ) {}

  public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {

      const buildingOrError = await Building.create( buildingDTO );

      if (buildingOrError.isFailure) {
        return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
      }

      const buildingResult = buildingOrError.getValue();

      await this.buildingRepo.save(buildingResult);

      const buildingDTOResult = BuildingMap.toDTO( buildingResult ) as IBuildingDTO;
      return Result.ok<IBuildingDTO>( buildingDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async listBuildings(): Promise<Result<IBuildingDTO[]>> {
    try {
      const buildingResult = await this.buildingRepo.findAll();

      const buildings=[];

      if(buildingResult.length != 0){
        buildingResult.forEach((element) => {
          buildings.push(BuildingMap.toDTO(element));
        })
      }
      return Result.ok<IBuildingDTO[]>( buildings );
    } catch (e) {
      throw e;
    }
  }

  public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
      try{
        const buildingResult= await this.buildingRepo.findByDomainId(buildingDTO.id);

        if(buildingResult == null){
            return Result.fail<IBuildingDTO>("Building Id does not exist");
        }

        if(!!buildingDTO.code){
          buildingResult.code = buildingDTO.code;
        }

        if(!!buildingDTO.description){
          buildingResult.description=buildingDTO.description;
        }

        if(!!buildingDTO.dimensions){
          buildingResult.dimensions=buildingDTO.dimensions;
        }

        if(!!buildingDTO.name){
          buildingResult.name=buildingDTO.name;
        }


        await this.buildingRepo.save(buildingResult);

        const buildingDTOResult = BuildingMap.toDTO( buildingResult ) as IBuildingDTO;
        return Result.ok<IBuildingDTO>( buildingDTOResult )
      }catch(e){
        throw e;
      }
  }

}
