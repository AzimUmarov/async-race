import { EngineStatusEnum } from '../enums/engineEnum';

export interface NewCar {
  name: string;
  color: string;
}

export interface Car extends NewCar {
  id: number;
}

export interface RaceData {
  carId: number;
  distance: number;
  velocity: number;
  status: EngineStatusEnum;
}
