import { NewCar } from '../interfaces/carInterface';

const carNamePart1 = [
  'Tesla',
  'Ford',
  'Chevrolet',
  'Toyota',
  'Honda',
  'Nissan',
  'Audi',
  'BMW',
  'Mercedes',
  'Porsche',
  'Chevrolet',
  'Gentra',
  'Damas',
  'Kia',
  'BYD',
];
const carNamePart2 = [
  'Model S',
  'Mustang',
  'Camaro',
  'Corolla',
  'Civic',
  'Altima',
  'A4',
  'X5',
  'C-Class',
  '911',
  '1.6',
  '1.8',
  '1.2',
  'K2',
  'Champion',
];

export function getRandomCarName() {
  const part1 = carNamePart1[Math.floor(Math.random() * carNamePart1.length)];
  const part2 = carNamePart2[Math.floor(Math.random() * carNamePart2.length)];
  return `${part1} ${part2}`;
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function generateRandomCars(n: number = 100): NewCar[] {
  const cars = [];

  for (let i = 0; i < n; i += 1) {
    cars.push({
      name: getRandomCarName(),
      color: getRandomColor(),
    });
  }
  return cars;
}
