import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import { carMock, carMockForChange, carMockForChangeWithId, carMockWithId } from '../../unit/mocks/carMock';
import CarController from '../../../controllers/Car';
import CarService from '../../../services/Car';
import CarModel from '../../../models/Car';


describe('Car Controller', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMock);
    sinon.stub(carService, 'readOne').resolves(carMock);
    sinon.stub(carService, 'update').resolves(carMockForChangeWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create Car', () => {
    it('Success', async () => {
      req.body = carMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('Update Car', () => {
    it('Success', async () => {
      req.params = { id: carMockForChangeWithId._id };
      req.body = carMockForChange;
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockForChangeWithId)).to.be.true;
    });
  });

});