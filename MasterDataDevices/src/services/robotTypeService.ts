import { Service, Inject } from 'typedi';
import config from "../../config";
import IRobotTypeDTO from '../dto/IRobotTypeDTO';
import { RobotType } from "../domain/robotType";
import IRobotTypeRepo from '../services/IRepos/IRobotTypeRepo';
import IRobotTypeService from './IServices/IRobotTypeService';
import { Result } from "../core/logic/Result";
import { RobotTypeMap } from "../mappers/RobotTypeMap";

@Service()
export default class RobotTypeService implements IRobotTypeService {
  constructor(
      @Inject(config.repos.robotType.name) private robotTypeRepo : IRobotTypeRepo
  ) {}


  public async createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>> {
    try {

      const robotTypeOrError = await RobotType.create( robotTypeDTO );

      if (robotTypeOrError.isFailure) {
        return Result.fail<IRobotTypeDTO>({"error":robotTypeOrError.errorValue()});
      }

      const robotTypeResult = robotTypeOrError.getValue();

      await this.robotTypeRepo.save(robotTypeResult);

      const robotTypeDTOResult = RobotTypeMap.toDTO( robotTypeResult ) as IRobotTypeDTO;
      return Result.ok<IRobotTypeDTO>( robotTypeDTOResult )
    } catch (e) {
      throw e;
    }
  }

}
