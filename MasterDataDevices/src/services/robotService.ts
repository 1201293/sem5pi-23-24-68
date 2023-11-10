import { Service, Inject } from 'typedi';
import config from "../../config";
import IRobotDTO from '../dto/IRobotDTO';
import { Robot } from "../domain/robot";
import IRobotRepo from '../services/IRepos/IRobotRepo';
import IRobotTypeRepo from '../services/IRepos/IRobotTypeRepo';
import IRobotService from './IServices/IRobotService';
import { Result } from "../core/logic/Result";
import { RobotMap } from "../mappers/RobotMap";
import ITaskRepo from './IRepos/ITaskRepo';

@Service()
export default class RobotService implements IRobotService {
  constructor(
      @Inject(config.repos.robot.name) private robotRepo : IRobotRepo,
      @Inject(config.repos.robotType.name) private robotTypeRepo : IRobotTypeRepo,
      @Inject(config.repos.task.name) private taskRepo : ITaskRepo
  ) {}

  public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {

      const robotTypeOrError = await this.robotTypeRepo.findByDomainId(robotDTO.robotTypeId);

      if (robotTypeOrError === null) {
        return Result.fail<IRobotDTO>({"error": "Must provide a valid robot type id"});
      }

      const robotNumberOrError = await this.robotRepo.findAll();

      if (robotNumberOrError.length != 0) {
        for (let i = 0; i < robotNumberOrError.length; i++) {
          if (robotNumberOrError[i].robotTypeId === robotDTO.robotTypeId && robotNumberOrError[i].number === robotDTO.number) {
            return Result.fail<IRobotDTO>({"error": "That serial number is already being used"});
          }
        }
      }

      robotDTO.status=true;

      const robotOrError = await Robot.create( robotDTO );

      if (robotOrError.isFailure) {
        return Result.fail<IRobotDTO>(robotOrError.errorValue());
      }

      const robotResult = robotOrError.getValue();

      await this.robotRepo.save(robotResult);

      const robotDTOResult = RobotMap.toDTO( robotResult ) as IRobotDTO;
      return Result.ok<IRobotDTO>( robotDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async disableRobot(robotId: string): Promise<Result<IRobotDTO>> {
    try {
      const robotOrError = await this.robotRepo.findByDomainId(robotId);

      if (robotOrError === null) {
        return Result.fail<IRobotDTO>({"error": "Could not find robot"});
      }

      if (robotOrError.status===false) {
        return Result.fail<IRobotDTO>({"error": "The robot is already disabled"});
      }

      robotOrError.status = false;

      await this.robotRepo.save(robotOrError);

      const robotDTOResult = RobotMap.toDTO( robotOrError ) as IRobotDTO;
      return Result.ok<IRobotDTO>( robotDTOResult )
    } catch (e) {
        throw e;
    }
  }

  public async listAllRobots(): Promise<Result<IRobotDTO[]>> {

    try{

      const robotResult = await this.robotRepo.findAll();

      const robots=[];

      if(robotResult.length != 0){
        robotResult.forEach((element) => {
          robots.push(RobotMap.toDTO(element));
        })
      }

      return Result.ok<IRobotDTO[]>( robots );

    } catch (e) {
      throw e;
    }
  }


  public async listRobotsByTaskOrDesignation(taskId: string): Promise<Result<IRobotDTO[]>> {

    try{

      const robotTypes = await this.robotTypeRepo.findAll();
      const robots = await this.robotRepo.findAll();
      const robotsResult = []
      const typesResult = []

      const taskOrError=await this.taskRepo.findByDomainId(taskId);

      if(taskOrError==null){
        return Result.fail<IRobotDTO[]>({"error": "Must provide a valid task"});
      }

/*
      if(robots.length != 0) {
        for(let i = 0; i < robots.length; i++) {
          if(robots[i].robotTypeId === TaskOrDesignation) {
            robotsResult.push(RobotMap.toDTO(robots[i]))
          }
        }
      }
*/

      if(robotTypes.length != 0) {
        for(let j = 0; j < robotTypes.length; j++) {
          for(let k = 0; k < robotTypes[j].possibleTasks.length; k++) {
            if(robotTypes[j].possibleTasks[k] === taskId) {
              typesResult.push(robotTypes[j].id.toString())
            }
          }
        }
      }

      if(typesResult.length != 0) {
        for(let l = 0; l < typesResult.length; l++) {
          for(let m = 0; m < robots.length; m++) {
            if(robots[m].robotTypeId === typesResult[l]) {
              robotsResult.push(RobotMap.toDTO(robots[m]))
            }
          }
        }
      }

      return Result.ok<IRobotDTO[]>( robotsResult );

    } catch (e) {
      throw e;
    }
  }


}