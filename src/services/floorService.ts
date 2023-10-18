import { Service, Inject } from 'typedi';
import config from "../../config";
import IFloorDTO from '../dto/IFloorDTO';
import { Floor } from "../domain/floor";
import IFloorRepo from '../services/IRepos/IFloorRepo';
import IFloorService from './IServices/IFloorService';
import { Result } from "../core/logic/Result";
import { FloorMap } from "../mappers/FloorMap";
import IBuildingRepo from './IRepos/IBuildingRepo';
import { write } from 'fs';

@Service()
export default class FloorService implements IFloorService {
  constructor(
      @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
      @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
  ) {}

  public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {

      const buildingOrError= await this.buildingRepo.findByDomainId(floorDTO.buildingId);

      if(buildingOrError == null){
        return Result.fail<IFloorDTO>(floorDTO);
      }

      const floorsSaved= await this.floorRepo.findByBuildingId(floorDTO.buildingId);

      let fail = false;

      if(floorsSaved.length !=0){
        for (const element of floorsSaved) {
          if (element.number === floorDTO.number) {
            fail = true;
            break;
          }
        }
        if(fail){
          return Result.fail<IFloorDTO>(floorDTO);
        }
      }

      const floorOrError = await Floor.create( floorDTO );

      if (floorOrError.isFailure) {
        return Result.fail<IFloorDTO>(floorOrError.errorValue());
      }

      const floorResult = floorOrError.getValue();

      await this.floorRepo.save(floorResult);

      const floorDTOResult = FloorMap.toDTO( floorResult ) as IFloorDTO;
      return Result.ok<IFloorDTO>( floorDTOResult )
    } catch (e) {
      throw e;
    }
  }
}
