import { Request, Response, NextFunction } from "express";
import { Inject, Service } from "typedi";
import config from "../../config";

import IElevatorController from "./IControllers/IElevatorController";
import IElevatorService from "../services/IServices/IElevatorService";
import IElevatorDTO from "../dto/IElevatorDTO";

import { Result } from "../core/logic/Result";
import IBuildingDTO from "../dto/IBuildingDTO";
import IFloorDTO from "../dto/IFloorDTO";

@Service()
export default class ElevatorController implements IElevatorController /* TODO: extends ../core/infra/BaseController */ {

    constructor(
        @Inject(config.services.elevator.name) private elevatorServiceInstance : IElevatorService
    ) {}
    
    public async createElevator(req: Request, res: Response, next: NextFunction) {
        try{        
            
            const elevatorOrError = await this.elevatorServiceInstance.createElevator(req.body as IElevatorDTO) as Result<IElevatorDTO>;

            if (elevatorOrError.isFailure) {
                return res.status(402).send();
            }

            const elevatorDTO = elevatorOrError.getValue();
            return res.status(201).json( elevatorDTO );
            
            }catch(e){
                
            return next(e);
        }
    }
    


}