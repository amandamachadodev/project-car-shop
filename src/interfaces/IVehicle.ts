import { z } from 'zod';

const vehicleZodSchema = z.object({
  model: z.string().min(3, { message: 'model must be 3 or more characters long' }),
  year: z.number().int().gte(1900).lte(2022),
  color: z.string().min(3, { message: 'color must be 3 or more characters long' }),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

type IVehicle = z.infer<typeof vehicleZodSchema>;

export default vehicleZodSchema;
export { IVehicle };