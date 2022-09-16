import { z } from 'zod';
import vehicleZodSchema from './IVehicle';

const carZodSchema = vehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().gte(2500),
});

type IMotorcycle = z.infer<typeof carZodSchema>;

export default carZodSchema;
export { IMotorcycle };