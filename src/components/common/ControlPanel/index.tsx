import { Button } from 'react-bootstrap';
import './style.scss';
import { FormEvent, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AppContext } from '../../../context';
import garageService from '../../../services/garageService';
import { generateRandomCars } from '../../../utils/generateRandomCars';
import engineService from '../../../services/engineService';
import { EngineStatusEnum } from '../../../enums/engineEnum';
import { Car } from '../../../interfaces/carInterface';

export default function ControlPanel() {
  const { garage, setGarage, inputState, setInputState } = useContext(AppContext);
  const [canRace, setCanRace] = useState(true);

  const selectedCar = garage.cars.find((car) => car.id === garage.selectedCarId);

  useEffect(() => {
    if (selectedCar) {
      console.log(`selectedCar`, selectedCar);
      setInputState((prev) => ({ ...prev, carUpdate: { name: selectedCar.name, color: selectedCar.color } }));
    }
  }, [selectedCar, setInputState]);

  useEffect(() => {
    setCanRace(true);
  }, [garage.page]);

  async function handleCreateCar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const payload = {
        name: inputState.carCreate.name,
        color: inputState.carCreate.color,
      };

      if (payload.name === '' || payload.color === '') {
        toast.error('Please fill in all fields');
        return;
      }

      const res = await garageService.create(payload);

      if (garage.cars.length < 5) {
        setGarage((prev) => ({ ...prev, cars: [...prev.cars, res] }));
      }

      setInputState((prev) => ({ ...prev, carCreate: { name: '', color: '#000000' } }));

      toast.success('Car created');
    } catch (error) {
      const errorMsg = (error as { message: string }).message;

      setGarage((prev) => ({ ...prev, error: errorMsg, loading: false }));
    }
  }

  async function handleUpdateCar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (typeof garage.selectedCarId !== 'number') {
        toast.error('Please select a car to update');
        return;
      }

      const payload = {
        name: inputState.carUpdate.name,
        color: inputState.carUpdate.color,
      };

      console.log(payload);

      if (payload.name === '' || payload.color === '') {
        toast.error('Please fill in all fields');
        return;
      }
      const res = await garageService.update(garage.selectedCarId, payload);

      setGarage((prev) => ({
        ...prev,
        cars: prev.cars.map((car) => (car.id === garage.selectedCarId ? res : car)),
        selectedCarId: null,
      }));

      setInputState((prev) => ({ ...prev, carUpdate: { name: '', color: '#000000' } }));

      toast.success('Car updated');
    } catch (error) {
      const errorMsg = (error as { message: string }).message;

      setGarage((prev) => ({ ...prev, loading: false, error: errorMsg }));
    }
  }

  async function handleGenerateCars() {
    toast.promise(
      (async (): Promise<Car[]> => {
        setGarage((prev) => ({ ...prev, loading: true }));

        const randomCars = generateRandomCars(100);
        const promises = randomCars.map((car) => garageService.create(car));
        const cars = await Promise.all(promises);

        if (garage.cars.length < 7) {
          setGarage((prev) => ({
            ...prev,
            loading: false,
            cars: [...prev.cars, ...cars.slice(0, 7 - garage.cars.length)],
            totalCount: prev.totalCount + 100,
          }));
        } else {
          setGarage((prev) => ({
            ...prev,
            loading: false,
            totalCount: prev.totalCount + 100,
          }));
        }
        return cars;
      })(),
      {
        loading: 'Generating...',
        success: <b>100 random cars created</b>,
        error: <b>Error on generating cars, please try again.</b>,
      },
    );
  }

  function handleRace() {
    async function startRace() {
      console.log('started');

      try {
        setCanRace(false);
        setGarage((prev) => ({ ...prev, loading: true, raceWinner: null, error: null }));
        const carStartPromises = garage.cars.map((car) => engineService.startEngine(car.id));
        const carStartResults = await Promise.all(carStartPromises);

        console.log(`handleRace(carStartResults)`, carStartResults, {
          ...carStartResults[0].data,
          status: EngineStatusEnum.STARTED,
          carId: garage.cars[0].id,
        });

        setGarage((prev) => ({
          ...prev,
          raceData: carStartResults.map((item, index) => ({
            ...item.data,
            status: EngineStatusEnum.STARTED,
            carId: garage.cars[index].id,
          })),
        }));
      } catch (error) {
        const errorMsg = (error as { message: string }).message;
        setGarage((prev) => ({ ...prev, loading: false, error: errorMsg }));
      }
    }
    toast.promise(startRace(), {
      loading: 'Starting...',
      success: <b>Race started!</b>,
      error: <b>Error on start, please try again.</b>,
    });
  }

  function handleAbort() {
    setCanRace(true);
    setGarage((prev) => ({ ...prev, raceData: [] }));
  }

  return (
    <div className="sub-navbar">
      <div className="sub-navbar__control-buttons">
        <Button variant="primary" onClick={handleRace} disabled={garage.loading || !canRace}>
          Race
        </Button>
        <Button variant="secondary" onClick={handleAbort} disabled={garage.loading || canRace}>
          Reset
        </Button>
      </div>

      <form className="sub-navbar__create-buttons" onSubmit={handleCreateCar}>
        <input
          placeholder="TYPE CAR BRAND"
          type="text"
          value={inputState.carCreate.name}
          onChange={(e) =>
            setInputState((prev) => ({ ...prev, carCreate: { ...prev.carCreate, name: e.target.value } }))
          }
        />
        <input
          type="color"
          value={inputState.carCreate.color}
          onChange={(e) =>
            setInputState((prev) => ({ ...prev, carCreate: { ...prev.carCreate, color: e.target.value } }))
          }
        />
        <Button type="submit" variant="warning" disabled={garage.loading}>
          Create
        </Button>
      </form>

      <form className="sub-navbar__update-buttons" onSubmit={handleUpdateCar}>
        <input
          placeholder="TYPE CAR BRAND"
          type="text"
          value={inputState.carUpdate.name}
          onChange={(e) =>
            setInputState((prev) => ({ ...prev, carUpdate: { ...prev.carUpdate, name: e.target.value } }))
          }
        />
        <input
          type="color"
          value={inputState.carUpdate.color}
          onChange={(e) =>
            setInputState((prev) => ({ ...prev, carUpdate: { ...prev.carUpdate, color: e.target.value } }))
          }
        />
        <Button type="submit" variant="success" disabled={garage.loading}>
          Update
        </Button>
      </form>

      <div className="sub-navbar__generate-cars">
        <Button onClick={handleGenerateCars} disabled={garage.loading}>
          Generate Cars
        </Button>
      </div>
    </div>
  );
}
