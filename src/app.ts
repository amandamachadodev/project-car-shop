import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import carRouter from './routers/Cars';
import motorcycleRoute from './routers/Motorcycle';

const app = express();
app.use(express.json());
app.use(carRouter);
app.use(motorcycleRoute);
app.use(errorHandler);

export default app;
