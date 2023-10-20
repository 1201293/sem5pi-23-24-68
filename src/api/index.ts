import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import building from './routes/buildingRoute';
import floor from './routes/floorRoute';
import room from './routes/roomRoute';
import buildingConnection from './routes/buildingConnectionRoute';

export default () => {
	const app = Router();

	buildingConnection(app);
	room(app);
	floor(app);
	building(app);
	auth(app);
	user(app);
	role(app);
	
	return app
}