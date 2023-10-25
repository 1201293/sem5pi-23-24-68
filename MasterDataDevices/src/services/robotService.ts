import { Service, Inject } from 'typedi';
import config from "../../config";
import IRobotDTO from '../dto/IRobotDTO';
import { Robot } from "../domain/robot";
import IRobotRepo from '../services/IRepos/IRobotRepo';
import IRobotService from './IServices/IRobotService';
import { Result } from "../core/logic/Result";
import { RobotMap } from "../mappers/RobotMap";

@Service()
export default class RobotService implements IRobotService {
  constructor(
      @Inject(config.repos.robot.name) private robotRepo : IRobotRepo
  ) {}

  public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {

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

  public async disableRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {
      const robotOrError = await this.robotRepo.findByDomainId(robotDTO.id);

      if (robotOrError === null) {
        return Result.fail<IRobotDTO>('Could not find robot');
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