import { Container} from 'typedi';

import winston from 'winston';

import config from '../../../config';

import IUserRepo from '../../services/IRepos/IUserRepo';

import jwt  from 'jsonwebtoken';
import { IUserDTO } from '../../dto/IUserDTO';


const getTokenFromHeader = req => {
  /**
   * @TODO Edge and Internet Explorer do some weird things with the headers
   * So I believe that this should handle more 'edge' cases ;)
   */
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};


/**
 * Attach user to req.user
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const checkUserRole = async (req, res, next) => {
  const Logger = Container.get('logger') as winston.Logger;
  try {
    
    const userRepo = Container.get(config.repos.user.name) as IUserRepo

    if( getTokenFromHeader == undefined){
      next( new Error("Token inexistente ou inválido ") );
    }

    const token=getTokenFromHeader(req);

    const payload = jwt.verify(token, config.jwtSecret);

 
    const user=payload as IUserDTO;

    if(user.email!=null){
      if((await userRepo.findByEmail(user.email)).role.name==="Gestor de Frota"){
        next();
      }else{
        next( new Error("Token não corresponde a um Gestor de frota") );
      }
    }else{
      next( new Error("Token não corresponde a qualquer utilizador do sistema") );
    }     
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default checkUserRole;
