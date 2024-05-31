import { Car } from './carInterface';

export interface NewWinner {
  id?: number;
  wins: number;
  time: number;
}

export interface Winner extends NewWinner {}

export interface WinnerCars extends Winner {
  car: Car;
}
