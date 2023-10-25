import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from '../../../config';
import IElevatorController from '../../controllers/IControllers/IElevatorController';

const route = Router();

export default (app: Router) => {
    app.use('/elevators', route);

    const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;

    route.post('', 
        celebrate({
            body: Joi.object({
                name: Joi.string(),
                code: Joi.string().required(),
                description: Joi.string(),
                buildingId: Joi.string().required(),
                floorsIds: Joi.array().items(Joi.string()).required()
                })
            }),
            (req, res, next) => ctrl.createElevator(req, res, next)
    );    

    
}
