import { Car, NewCar } from '../interfaces/carInterface';
import serviceFactory from './serviceFactory';

const garageService = serviceFactory<Car, NewCar>({ baseURL: '/garage' });

export default garageService;
