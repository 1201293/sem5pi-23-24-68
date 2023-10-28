import { Result } from "../../core/logic/Result";
import IRobotDTO from "../../dto/IRobotDTO";

export default interface IRobotService  {
  createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  disableRobot(robotId: string): Promise<Result<IRobotDTO>>;
  listAllRobots(): Promise<Result<IRobotDTO[]>>;
}
