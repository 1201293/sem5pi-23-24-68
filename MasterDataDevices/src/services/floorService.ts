import { Service, Inject } from 'typedi';
import config from "../../config";
import IFloorDTO from '../dto/IFloorDTO';
import { Floor } from "../domain/floor";
import IFloorRepo from '../services/IRepos/IFloorRepo';
import IFloorService from './IServices/IFloorService';
import { Result } from "../core/logic/Result";
import { FloorMap } from "../mappers/FloorMap";
import IBuildingRepo from './IRepos/IBuildingRepo';
import IBuildingConnectionRepo from './IRepos/IBuildingConnectionRepo';
import IElevatorDTO from '../dto/IElevatorDTO';
import IRoomDTO from '../dto/IRoomDTO';
import IElevatorRepo from './IRepos/IElevatorRepo';
import IRoomRepo from './IRepos/IRoomRepo';
import IBuildingConnectionDTO from '../dto/IBuildingConnectionDTO';

@Service()
export default class FloorService implements IFloorService {
  constructor(
      @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
      @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo,
      @Inject(config.repos.buildingConnection.name) private buildingConnectionRepo : IBuildingConnectionRepo,
      @Inject(config.repos.elevator.name) private elevatorRepo : IElevatorRepo,
      @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
  ) {}

  public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {

      const buildingOrError= await this.buildingRepo.findByDomainId(floorDTO.buildingId);

      if(buildingOrError == null){
        return Result.fail<IFloorDTO>({"error": "Must provide a valid building id"});
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
          return Result.fail<IFloorDTO>({"error": "Duplicated Floor in that building"});
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

  public async listFloors(buildingId: string): Promise<Result<IFloorDTO[]>> {
    try {

      const floorlist = [];

      const buildingResult = await this.buildingRepo.findByDomainId(buildingId);

      if (buildingResult === null) {
        return Result.fail<IFloorDTO[]>({"error":"Building does not exist!"});
      }

      const floors = await this.floorRepo.findByBuildingId(buildingId);

      if (floors.length != 0) {
        floors.forEach((element) => {
          floorlist.push(FloorMap.toDTO(element));
        })
      }
      return Result.ok<IFloorDTO[]>(floorlist);
    } catch (e) {
      throw e;
    }
  }


  public async listFloorsWithBuildingConnections(buildingId: string): Promise<Result<IFloorDTO[]>> {
    try {

      const floorsWithBuildingConnections = [];

      const buildingResult = await this.buildingRepo.findByDomainId(buildingId);

      if (buildingResult === null) {
        return Result.fail<IFloorDTO[]>({"error": "Building does not exist!"});
      }

      const floors = await this.floorRepo.findByBuildingId(buildingId);

      if (floors.length != 0) {
        const buildingConnections = await this.buildingConnectionRepo.findAll();
        if (buildingConnections.length != 0) {
          for (let i = 0; i < buildingConnections.length; i++) {
            for (let j = 0; j < floors.length; j++) {
              if (((buildingConnections[i].floor1Id === floors[j].id.toString()) || (buildingConnections[i].floor2Id === floors[j].id.toString())) && !floorsWithBuildingConnections.includes(floors[j])) {
                floorsWithBuildingConnections.push(FloorMap.toDTO(floors[j]));
              }
            }
          }
        }
      }

      return Result.ok<IFloorDTO[]>(floorsWithBuildingConnections);
    } catch (e) {
      throw e;
    }
  }

  public async listFloorsWithElevator(buildingId: string): Promise<Result<IFloorDTO[]>> {
    try {

      const floorsWithElevator = [];

      const buildingResult = await this.buildingRepo.findByDomainId(buildingId);

      if (buildingResult === null) {
        return Result.fail<IFloorDTO[]>({"error": "Building does not exist!"});
      }

      const elevatorsResult = await this.elevatorRepo.findByBuildingId(buildingId);

      if (elevatorsResult.length != 0) {
        for (let j = 0; j < elevatorsResult[0].floorsIds.length; j++) {
          const floor = await this.floorRepo.findByDomainId(elevatorsResult[0].floorsIds[j]);
          if(floor != null){
            floorsWithElevator.push(FloorMap.toDTO(floor));
          }
        }
     }

      return Result.ok<IFloorDTO[]>(floorsWithElevator);
    } catch (e) {
      throw e;
    }
  }


  public async loadMap(floorId: string, map: number[][], initialPosition: number[], initialDirection: number, roomsDTO: IRoomDTO[], elevatorDTO: IElevatorDTO, buildingConnectionsDTO: IBuildingConnectionDTO[]): Promise<Result<IFloorDTO>> {
      try {
        const floorOrError= await this.floorRepo.findByDomainId(floorId);

        if(floorOrError == null){
          return Result.fail<IFloorDTO>({"error":"Must provide a valid floor id!"});
        }

        const buildingOrError= await this.buildingRepo.findByDomainId(floorOrError.buildingId);

        if(buildingOrError == null){
          return Result.fail<IFloorDTO>({"error":"Something went wrong! Please contact the administrators"});
        }

        if (initialPosition.length !== 2) {
          return Result.fail<IFloorDTO>({"error":"Initial position must be an array of two numbers"});
        }

        if(buildingOrError.depth === map.length-1 && buildingOrError.width === map[0].length-1){
          
          let  rooms=[]

          for(let i=0;i<roomsDTO.length;i++){
             const roomOrError =  await this.roomRepo.findByDomainId(roomsDTO[i].id);

             if(roomOrError == null){
                return Result.fail<IFloorDTO>({"error":"Must provide a valid room id!"});
             }

             if(roomOrError.floorId != floorId){
                return Result.fail<IFloorDTO>({"error":"Must provide a room id that is located in the same building of the floor!"});
             }

            roomOrError.posX=roomsDTO[i].posX;
            roomOrError.posY=roomsDTO[i].posY;
            roomOrError.height=roomsDTO[i].height;
            roomOrError.width=roomsDTO[i].width;
            roomOrError.doorPosX=roomsDTO[i].doorPosX;
            roomOrError.doorPosY=roomsDTO[i].doorPosY;
             
            rooms.push(roomOrError);
          }

          let buildingConnections=[]

          for(let i=0;i<buildingConnectionsDTO.length;i++){
            const buildingConnectionOrError =  await this.buildingConnectionRepo.findByDomainId(buildingConnectionsDTO[i].id);

            if(buildingConnectionOrError == null){
               return Result.fail<IFloorDTO>({"error":"Must provide a valid building connection id!"});
            }

            if(buildingConnectionOrError.floor1Id != floorId){
              if(buildingConnectionOrError.floor2Id != floorId){
                return Result.fail<IFloorDTO>({"error":"Must provide a building connection that is located in the floor!"});
              }
            }

            buildingConnectionOrError.posX=buildingConnectionsDTO[i].posX;
            buildingConnectionOrError.posY=buildingConnectionsDTO[i].posY;

            buildingConnections.push(buildingConnectionOrError);
          }

         if(elevatorDTO != null){
          const elevatorOrError= await this.elevatorRepo.findByDomainId(elevatorDTO.id);

          if(elevatorOrError == null){
            return Result.fail<IFloorDTO>({"error":"Must provide a valid elevator id!"});
          }

          if(elevatorOrError.buildingId != floorOrError.buildingId){
            return Result.fail<IFloorDTO>({"error":"Must provide an elevator that is installed in the same  building of the floor!"});
          }

          elevatorOrError.posX=elevatorDTO.posX;
          elevatorOrError.posY=elevatorDTO.posY;

          await this.elevatorRepo.save(elevatorOrError);
          }

          for(let i=0;i<rooms.length;i++){
            await this.roomRepo.save(rooms[i]);
          }

          for(let i=0;i<buildingConnections.length;i++){
            await this.buildingConnectionRepo.save(buildingConnections[i]);
          }

          floorOrError.map=map;

          await this.floorRepo.save(floorOrError);

          return   Result.ok<IFloorDTO>(FloorMap.toDTO(floorOrError));

        }else{
          return Result.fail<IFloorDTO>({"error":"Map size does not match with building dimensions!"});
        }

        

      } catch (e) {
        throw e;
      }
  }


  public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try{
      const floorResult = await this.floorRepo.findByDomainId(floorDTO.id);

      if(floorResult == null){
          return Result.fail<IFloorDTO>("Floor does not exist");
      }

      if(!!floorDTO.buildingId){ 
        floorResult.buildingId = floorDTO.buildingId;
      }

      if(!!floorDTO.number){
        floorResult.number = floorDTO.number;
      }

      if(!!floorDTO.description){
        floorResult.description = floorDTO.description;
      }

      await this.floorRepo.save(floorResult);

      const floorDTOResult = FloorMap.toDTO( floorResult ) as IFloorDTO;
      return Result.ok<IFloorDTO>( floorDTOResult )
    }catch(e){
      throw e;
    }
  }

}
