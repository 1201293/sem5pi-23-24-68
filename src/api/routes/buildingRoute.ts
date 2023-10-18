import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IBuildingController from '../../controllers/IControllers/IBuildingController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/buildings', route);

  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string(),
        code: Joi.string().required(),
        dimensions: Joi.string().required(),
        description: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.createBuilding(req, res, next) );

    route.get('',(req,res,next) => ctrl.listBuildings(req,res,next));

    route.put('',celebrate({
      body:Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        code: Joi.string().required(),
        dimensions: Joi.string().required(),
        description: Joi.string().required(),
      })
    }),
    (req, res, next) => ctrl.updateBuilding(req, res, next) );

    route.patch('',celebrate({
      body:Joi.object({
        id: Joi.string().required(),
        name: Joi.string(),
        code: Joi.string(),
        dimensions: Joi.string(),
        description: Joi.string(),
      })
    }),
    (req, res, next) => ctrl.updateBuilding(req, res, next) );



};