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

    route.get('/building/:id', (req, res, next) => ctrl.listFloorsWithBuildingConnections(req, res, next) );

    route.patch('/load-maps',celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        map: Joi.array().items(
          Joi.array().items(Joi.number())
        ).required(),
        rooms: Joi.array().items(
          Joi.object({
              id: Joi.string(),
              posX: Joi.number().integer(),
              posY: Joi.number().integer(),
              width: Joi.number().integer(),
              height: Joi.number().integer(),
          })
        ),
        elevator: Joi.object({
          id: Joi.string(),
          posX: Joi.number().required(),
          posY: Joi.number().required()
        }),
        buildingConnections: Joi.array().items(
          Joi.object({
              id: Joi.string(),
              posX: Joi.number().integer(),
              posY: Joi.number().integer(),
          })
        )
      })
    }),
    (req,res,next)=> ctrl.loadMap(req,res,next));
};