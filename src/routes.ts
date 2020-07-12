import express from 'express';
import knex from './database/connection';

import PointsController from './controllers/PointsControllers';
import ItemsControllers from './controllers/ItemsControllers';

const routes = express.Router();
const pointsController = new PointsController();
const itemsControllers = new ItemsControllers();

routes.get('/items', itemsControllers.index);

routes.post('/points',  pointsController.create);

 export default routes;
 