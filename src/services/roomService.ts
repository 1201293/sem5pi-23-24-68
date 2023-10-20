import { Service, Inject } from 'typedi';
import config from "../../config";
import IRoomDTO from '../dto/IRoomDTO';
import { Room } from "../domain/room";
import IRoomRepo from '../services/IRepos/IRoomRepo';
import IRoomService from './IServices/IRoomService';
import { Result } from "../core/logic/Result";
import { RoomMap } from "../mappers/RoomMap";
import IFloorRepo from './IRepos/IFloorRepo';

@Service()
export default class RoomService implements IRoomService {
  constructor(
      @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
      @Inject(config.repos.floor.name) private floorRepo : IFloorRepo
  ) {}

  public async createRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
    try {

      const floorOrError = await this.floorRepo.findByDomainId(roomDTO.floorId);

      if (floorOrError === null) {
        return Result.fail<IRoomDTO>(roomDTO);
      }

      const roomOrError = await Room.create( roomDTO );

      if (roomOrError.isFailure) {
        return Result.fail<IRoomDTO>(roomOrError.errorValue());
      }

      const roomResult = roomOrError.getValue();

      await this.roomRepo.save(roomResult);

      const roomDTOResult = RoomMap.toDTO( roomResult ) as IRoomDTO;
      return Result.ok<IRoomDTO>( roomDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async listRooms(): Promise<Result<IRoomDTO[]>> {
    try {
      const roomResult = await this.roomRepo.findAll();

      const rooms=[];

      if(roomResult.length != 0){
        roomResult.forEach((element) => {
          rooms.push(RoomMap.toDTO(element));
        })
      }
      return Result.ok<IRoomDTO[]>( rooms );
    } catch (e) {
      throw e;
    }
  }

  public async updateRoom(roomDTO: IRoomDTO): Promise<Result<IRoomDTO>> {
      try{
        const roomResult= await this.roomRepo.findByDomainId(roomDTO.id);

        if(roomResult == null){
            return Result.fail<IRoomDTO>("Room Id does not exist");
        }

        if(!!roomDTO.category){
          roomResult.category = roomDTO.category;
        }

        if(!!roomDTO.description){
          roomResult.description = roomDTO.description;
        }

        if(!!roomDTO.name){
          roomResult.name = roomDTO.name;
        }

        await this.roomRepo.save(roomResult);

        const roomDTOResult = RoomMap.toDTO( roomResult ) as IRoomDTO;
        return Result.ok<IRoomDTO>( roomDTOResult )
      }catch(e){
        throw e;
      }
  }

}
