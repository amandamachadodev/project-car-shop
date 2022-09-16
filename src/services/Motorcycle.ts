import { IService } from '../interfaces/IService';
import motorcycleZodSchema, { IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = motorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._motorcycle.create(obj);
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._motorcycle.read();
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const car = await this._motorcycle.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = motorcycleZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const result = await this._motorcycle.update(_id, obj);
    if (!result) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return result;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const result = await this._motorcycle.delete(_id);
    if (!result) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return result;
  }
}

export default MotorcycleService;