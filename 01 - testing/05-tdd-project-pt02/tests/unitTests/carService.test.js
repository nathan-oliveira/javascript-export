const { describe, it, before, beforeEach, afterEach } = require('mocha')
const { expect } = require('chai')
const { join } = require('path')
const sinon = require('sinon')

const CarService = require('../../src/service/carService')

const carsDatabase = join(__dirname, './../../database', 'cars.json')

const mocks = {
  validCarCategory: require('./../mocks/valid-carCategory.json'),
  validCar: require('./../mocks/valid-car.json'),
  validCustomer: require('./../mocks/valid-customer.json'),
}

describe('CarService Suite Tests', () => {
  let carService = {}
  let sandBox = {}

  before(() => {
    carService = new CarService({
      cars: carsDatabase,
    })
  })

  beforeEach(() => {
    sandBox = sinon.createSandbox()
  })

  afterEach(() => {
    sandBox.restore()
  })

  // bdd -> usar o chai
  it('should retrieve a random position from an array', () => {
    const data = [0, 1, 2, 3, 4]
    const result = carService.getRandomPositionFromArray(data)
    expect(result).to.be.lte(data.length).and.be.gte(0)
  })

  it('should choose the first id from carIds in carCategory', () => {
    const carCategory = mocks.validCarCategory
    const carIdIndex = 0

    sandBox.stub(
      carService,
      carService.getRandomPositionFromArray.name,
    ).returns(carIdIndex)

    const result = carService.chooseRandomCar(carCategory)
    const expected = carCategory.carIds[carIdIndex]

    expect(carCategory.getRandomPositionFromArray.calledOnce).to.be.ok
    expect(result).to.be.equal(expected)
  })

  it('given a carCategory it should return an available car', async () => {
    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.carIds = [car.id]

    sandBox.stub(
      carService.carRepository,
      carService.carRepository.find.name,
    ).resolves(car)

    sandBox.spy(
      carService,
      carService.chooseRandomCar.name,
    )

    const result = await carService.getAvailableCar(carCategory)
    const expected = car

    expect(carService.chooseRandomCar.calledOnce).to.be.ok
    expect(carService.carRepository.find.callWithExactly(car.id)).to.be.ok
    expect(result).to.be.deep.equal(expected)
  })
})
