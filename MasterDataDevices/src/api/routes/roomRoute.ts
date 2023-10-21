import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRoomController from '../../controllers/IControllers/IRoomController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/rooms', route);

  const ctrl = Container.get(config.controllers.room.name) as IRoomController;

  route.post('',
    celebrate({
      body: Joi.object({
        floorId: Joi.string().required(),
        name: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.createRoom(req, res, next));

    route.get('',(req,res,next) => ctrl.listRooms(req,res,next));

    route.put('',celebrate({
      body:Joi.object({
        id: Joi.string().required(),
        floorId: Joi.string().required(),
        name: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.updateRoom(req, res, next));

    route.patch('',celebrate({
      body:Joi.object({
        id: Joi.string().required(),
        floorId: Joi.string().required(),
        name: Joi.string(),
        category: Joi.string(),
        description: Joi.string(),
      })
    }),
    (req, res, next) => ctrl.updateRoom(req, res, next));
};