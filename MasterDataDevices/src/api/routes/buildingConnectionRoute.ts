import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IBuildingConnectionController from '../../controllers/IControllers/IBuildingConnectionController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/buildingConnections', route);

  const ctrl = Container.get(config.controllers.buildingConnection.name) as IBuildingConnectionController;

  route.post('',
    celebrate({
      body: Joi.object({
        floor1Id: Joi.string().required(),
        floor2Id: Joi.string().required(),
        description:Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createBuildingConnection(req, res, next) );

    route.get('/:id1/:id2',(req,res,next) => ctrl.listBuildingConnections(req,res,next));

    route.put('',celebrate({
      body:Joi.object({
        id: Joi.string().required(),
        floor1Id: Joi.string().required(),
        floor2Id: Joi.string().required(),
        description:Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.updateBuildingConnection(req, res, next) );

    route.patch('',celebrate({
      body:Joi.object({
        id: Joi.string().required(),
        floor1Id: Joi.string(),
        floor2Id: Joi.string(),
        description:Joi.string(),
      })
    }),
    (req, res, next) => ctrl.updateBuildingConnection(req, res, next) );
};