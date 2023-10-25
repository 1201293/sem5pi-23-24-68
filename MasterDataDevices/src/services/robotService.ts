import { Service, Inject } from 'typedi';
import config from "../../config";
import IRobotDTO from '../dto/IRobotDTO';
import { Robot } from "../domain/robot";
import IRobotRepo from '../services/IRepos/IRobotRepo';
import IRobotTypeRepo from '../services/IRepos/IRobotTypeRepo';
import IRobotService from './IServices/IRobotService';
import { Result } from "../core/logic/Result";
import { RobotMap } from "../mappers/RobotMap";

@Service()
export default class RobotService implements IRobotService {
  constructor(
      @Inject(config.repos.robot.name) private robotRepo : IRobotRepo,
      @Inject(config.repos.robotType.name) private robotTypeRepo : IRobotTypeRepo
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

      robotOrError.status = false;

      await this.robotRepo.save(robotOrError);

      const robotDTOResult = RobotMap.toDTO( robotOrError ) as IRobotDTO;
      return Result.ok<IRobotDTO>( robotDTOResult )
    } catch (e) {
        throw e;
    }
  }
}