import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IFloorController from '../../controllers/IControllers/IFloorController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/floors', route);

  const ctrl = Container.get(config.controllers.floor.name) as IFloorController;

  route.post('',
    celebrate({
      body: Joi.object({
        buildingId: Joi.string().required(),
        number: Joi.number().required(),
        description: Joi.string(),
      })
    }),
    (req, res, next) => ctrl.createFloor(req, res, next) );

    route.patch('/maps',celebrate({
      body: Joi.object({
        floorId: Joi.string().required(),
        map: Joi.array().items(
          Joi.array().items(Joi.number())
        ).required(),
        rooms: Joi.array().items(
          Joi.object({
            roomId: Joi.string(),
            dimensions: Joi.object({
              positionX: Joi.number().integer(),
              positionY: Joi.number().integer(),
              width: Joi.number().integer(),
              height: Joi.number().integer(),
            }),
          })
        ),
        elevator: Joi.object({
          elevatorId: Joi.string(),
          positionX: Joi.number().required(),
          positionY: Joi.number().required(),
          direction: Joi.string().required(),
        }).required(),
        exits: Joi.array().items(
          Joi.array().items(Joi.number())
        ).required(),
        exitLocation: Joi.array().items(Joi.number()).required(),
      })
    }),
    (req,res,next)=> ctrl.loadMap(req,res,next));

};