import { Service, Inject} from "typedi";
import config from "../../config";
import IElevatorDTO from "../dto/IElevatorDTO";
import { Elevator } from "../domain/elevator";
import IElevatorRepo from "./IRepos/IElevatorRepo";
import IElevatorService from "./IServices/IElevatorService";
import { Result } from "../core/logic/Result";
import { ElevatorMap } from "../mappers/ElevatorMap";
import IFloorRepo from "./IRepos/IFloorRepo";
import IFloorDTO from "../dto/IFloorDTO";
import IBuildingRepo from "./IRepos/IBuildingRepo";
import IBuildingDTO from "../dto/IBuildingDTO";

@Service()
export default class ElevatorService implements IElevatorService{
    constructor(
        @Inject(config.repos.elevator.name) private elevatorRepo : IElevatorRepo,
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo

    ){}

    public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {

        try{

            // Check if Building Exists
            const buildingOrError= await this.buildingRepo.findByDomainId(elevatorDTO.buildingId);

            if(buildingOrError == null){
                return Result.fail<IElevatorDTO>(elevatorDTO);
            }

            // Check if Floors Exists

            elevatorDTO.floorsIds.forEach(async (floorId) => {
                const floorOrError = await this.floorRepo.findByDomainId(floorId);
                if(floorOrError == null){
                    return Result.fail<IElevatorDTO>(elevatorDTO);
                }
            });

            // TO-DO Check if an elevator was already made before

            const buildingHasElevator = await this.elevatorRepo.findByBuildingId(elevatorDTO.buildingId);

            // if building has elevator, then it will fail

            if(buildingHasElevator.length != 0){
                return Result.fail<IElevatorDTO>(elevatorDTO);
            }

            const elevatorOrError = await Elevator.create(elevatorDTO);

            if(elevatorOrError.isFailure){
                return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
            }

            const elevatorResult = elevatorOrError.getValue();

            await this.elevatorRepo.save(elevatorResult);

            const elevatorDTOResult = ElevatorMap.toDto(elevatorResult) as IElevatorDTO;
            return Result.ok<IElevatorDTO>(elevatorDTOResult);

        } catch(e){
            throw e;
        }
        
    }

    
}