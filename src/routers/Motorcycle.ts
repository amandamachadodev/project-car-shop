import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle';
import MotorcycleModel from '../models/Motorcycle';
import MotorcycleService from '../services/Motorcycle';

const route = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

const rota = '/motorcycles/:id';

route.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
route.get('/motorcycles', (req, res) => motorcycleController.list(req, res));
route.get(rota, (req, res) => motorcycleController.readOne(req, res));
route.put(rota, (req, res) => motorcycleController.update(req, res));
route.delete(rota, (req, res) => motorcycleController.delete(req, res));

export default route;