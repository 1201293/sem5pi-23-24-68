import { Result } from "../../core/logic/Result";
import IElevatorDTO from "../../dto/IElevatorDTO";

export default interface IElevatorService {
    createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
    updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
    listElevators(buildingId: string): Promise<Result<Array<IElevatorDTO>>>;
}