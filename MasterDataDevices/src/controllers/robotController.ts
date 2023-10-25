import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRobotController from "./IControllers/IRobotController";
import IRobotService from '../services/IServices/IRobotService';
import IRobotDTO from '../dto/IRobotDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RobotController implements IRobotController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.robot.name) private robotServiceInstance : IRobotService
  ) {}

  public async createRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = await this.robotServiceInstance.createRobot(req.body as IRobotDTO) as Result<IRobotDTO>;
        
      if (robotOrError.isFailure) {
        return res.status(402).json(robotOrError.errorValue()).send();
      }

      const robotDTO = robotOrError.getValue();
      return res.status(201).json( robotDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async disableRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = await this.robotServiceInstance.disableRobot(req.body.id) as Result<IRobotDTO>;
        
      if (robotOrError.isFailure) {
        return res.status(402).json(robotOrError.errorValue()).send();
      }

      const robotDTO = robotOrError.getValue();
      return res.status(200).json( robotDTO );
    }
    catch (e) {
      return next(e);
    }
  }
}