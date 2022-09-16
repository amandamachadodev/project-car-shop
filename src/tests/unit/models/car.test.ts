import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import {
	carMock,
	carMockWithId,
	carMockForChange,
	carMockForChangeWithId
} from '../../../tests/unit/mocks/carMock';

describe('Car Model', () => {
	const carModel = new CarModel();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
		sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockForChangeWithId);
		sinon.stub(Model, 'findByIdAndDelete').resolves(carMockForChangeWithId);
	});

	after(() => {
		sinon.restore();
	});

	describe('creating a car', () => {
		it('successfully created', async () => {
			const carCreate = await carModel.create(carMock);
			expect(carCreate).to.be.deep.equal(carMockWithId);
		});
	});

	describe('searching a car', () => {
		it('successfully found', async () => {
			const carFound = await carModel.readOne('62cf1fc6498565d94eba52cd');
			expect(carFound).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

	describe('changing a car', () => {
		it('successfully change', async () => {
			const carChanged = await carModel.update(
				'62cf1fc6498565d94eba52cd', carMockForChange
			);
			expect(carChanged).to.be.deep.equal(carMockForChangeWithId);
		});

		it('_id not found to change', async () => {
			try {
				await carModel.update('123errado', carMockForChange);
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

	describe('deleting a car', () => {
		it('successfully delete', async () => {
			const carDeleted = await carModel.delete(
				'62cf1fc6498565d94eba52cd',
			);
			expect(carDeleted).to.be.deep.equal(carMockForChangeWithId);
		});

		it('_id not found to delete', async () => {
			try {
				await carModel.delete('123errado',);
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});
});