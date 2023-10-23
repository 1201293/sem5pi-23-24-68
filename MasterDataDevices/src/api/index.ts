import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import building from './routes/buildingRoute';
import floor from './routes/floorRoute';
import room from './routes/roomRoute';
import buildingConnection from './routes/buildingConnectionRoute';
import robotType from './routes/robotTypeRoute';

export default () => {
	const app = Router();

	robotType(app);
	buildingConnection(app);
	room(app);
	floor(app);
	building(app);
	auth(app);
	user(app);
	role(app);
	
	return app
}