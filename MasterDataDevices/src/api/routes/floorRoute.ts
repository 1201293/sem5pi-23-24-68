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

    route.get('/:id', (req, res, next) => ctrl.listFloors(req, res, next) );

    route.get('/withConnections/:id', (req, res, next) => ctrl.listFloorsWithBuildingConnections(req, res, next) );

    route.get('/buildings/elevator/:id', (req, res, next) => ctrl.listFloorsWithElevator(req, res, next) );

    route.patch('/load-maps',celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        map: Joi.array().items(
          Joi.array().items(Joi.number())
        ).required(),
        initialPosition: Joi.array().items(Joi.number()).required(),
        initialDirection: Joi.number().required(),
        rooms: Joi.array().items(
          Joi.object({
              id: Joi.string(),
              posX: Joi.number().integer(),
              posY: Joi.number().integer(),
              width: Joi.number().integer(),
              height: Joi.number().integer(),
              doorPosX: Joi.number().integer(),
              doorPosY: Joi.number().integer(),
          })
        ),
        elevators:Joi.array().items( Joi.object({
          id: Joi.string(),
          posX: Joi.number().required(),
          posY: Joi.number().required()
        })),
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

    route.put('',celebrate({
      body:Joi.object({
        id: Joi.string().required(),
        buildingId: Joi.string().required(),
        number: Joi.number().required(),
        description: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.updateFloor(req, res, next) );

    route.patch('',celebrate({
      body:Joi.object({
        id: Joi.string().required(),
        buildingId: Joi.string(),
        number: Joi.number(),
        description: Joi.string(),
      })
    }),
    (req, res, next) => ctrl.updateFloor(req, res, next) );
};