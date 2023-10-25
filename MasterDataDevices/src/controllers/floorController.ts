import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IFloorController from "./IControllers/IFloorController";
import IFloorService from '../services/IServices/IFloorService';
import IFloorDTO from '../dto/IFloorDTO';

import { Result } from "../core/logic/Result";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import IRoomDTO from '../dto/IRoomDTO';
import IElevatorDTO from '../dto/IElevatorDTO';
import IBuildingConnectionDTO from '../dto/IBuildingConnectionDTO';

@Service()
export default class FloorController implements IFloorController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.floor.name) private floorServiceInstance : IFloorService
  ) {}

  public async createFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const floorOrError = await this.floorServiceInstance.createFloor(req.body as IFloorDTO) as Result<IFloorDTO>;
        
      if (floorOrError.isFailure) {
        return res.status(402).send();
      }

      const floorDTO = floorOrError.getValue();
      return res.status(201).json( floorDTO );
    }
    catch (e) {
      return next(e);
    }
  }

  public async listFloorsWithBuildingConnections(req: Request, res: Response, next: NextFunction) {
    try{
      let aux = req.url.substring(10, req.url.length);
      
      const floorOrError = await this.floorServiceInstance.listFloorsWithBuildingConnections(aux) as Result<Array<IFloorDTO>>;
        
      if (floorOrError.isFailure) {
        return res.json(floorOrError.errorValue()).status(402).send();
      }

      const floorsDTO = floorOrError.getValue();
      return res.json( floorsDTO ).status(200);
    }catch(e){
      return next(e);
    }
  }
  
  public async loadMap(req: Request, res: Response, next: NextFunction) {
      try {
        let rooms=[];

        if(req.body.rooms!=null){
          for(let i=0;i<req.body.rooms.length;i++){
            rooms.push(req.body.rooms[i] as IRoomDTO);
          }
        }

        let connections=[];
        if(req.body.buildingConnections!=null){
          for(let i=0;i<req.body.buildingConnections.length;i++){
            connections.push(req.body.buildingConnections[i] as IBuildingConnectionDTO);
          }
        }

        const floorOrError = await this.floorServiceInstance.loadMap(req.body.id,req.body.map,rooms,req.body.elevator as IElevatorDTO,connections) as Result<IFloorDTO>;

        if (floorOrError.isFailure) {
          return res.status(402).json(floorOrError.errorValue()).send();
        }
  
        const floorDTO = floorOrError.getValue();
        return  res.json(floorDTO).status(200); 
      } catch (e) {
        return  next(e);
      }
  }
}