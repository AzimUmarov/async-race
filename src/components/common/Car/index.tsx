import { Button } from 'react-bootstrap';
import './style.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { Car as CarInterface } from '../../../interfaces/carInterface';
import CarObject from '../CarObject';
import { AppContext } from '../../../context';
import garageService from '../../../services/garageService';
import EngineEnum, { EngineStatusEnum } from '../../../enums/engineEnum';
import engineService from '../../../services/engineService';
import calculateTime from '../../../utils/realtiveTImeGenarator';
import winnerService from '../../../services/winnerService';

export default function Car({ index, car }: { index: number; car: CarInterface }) {
  const carRef = useRef<HTMLDivElement>(null);
  const { setGarage, garage } = useContext(AppContext);
  const [canStart, setCanStart] = useState(true);
  console.log(`car`, car);
  const animateCar = (second: number) => {
    if (carRef.current) {
      if (second === 0) {
        carRef.current.style.animation = 'none';
      } else if (second < 0) {
        carRef.current.style.animationPlayState = 'paused';
      } else {
        carRef.current.style.animation = `moveCar ${second}s linear forwards`;
        setCanStart(false);
      }
    }
  };

  const handleDeleteCar = async (id: number) => {
    try {
      setGarage((prev) => ({ ...prev, loading: true }));

      await garageService.delete(id);
      const response = await garageService.getAll(garage.page);

      setGarage((prev) => ({
        ...prev,
        cars: response?.data || [],
        loading: false,
        error: null,
        totalCount: response?.totalCount || 0,
      }));
    } catch (error) {
      const errorMsg = (error as { message: string }).message;
      setGarage((prev) => ({ ...prev, loading: false, error: errorMsg }));
    }
  };

  const controlCarDrive = async (id: number) => {
    try {
      setGarage((prev) => ({ ...prev, loading: true }));

      const response = await engineService.switchToDriveMode(id);
      await engineService.stopEngine(id);

      setGarage((prev) => ({
        ...prev,
        raceData: prev.raceData.map((item) =>
          item.carId === id ? { ...item, status: EngineStatusEnum.STOPPED } : item,
        ),
        loading: false,
        error: null,
      }));
      console.log(`log(id, response)`, id, response);
    } catch (error) {
      if ((error as AxiosError).response?.status === 500) {
        setGarage((prev) => ({
          ...prev,
          raceData: prev.raceData.map((item) =>
            item.carId === id ? { ...item, status: EngineStatusEnum.BROKEN } : item,
          ),
          loading: false,
          error: null,
        }));
        await engineService.stopEngine(id);
      }
      console.log(`log(id, error)`, id, error);
    }
  };

  async function handleStartCar(id: number, status: EngineEnum) {
    try {
      setGarage((prev) => ({ ...prev, loading: true }));

      if (status === EngineEnum.STARTED) {
        const response = await engineService.startEngine(id);
        const currentCarRaceData = response?.data;

        setGarage((prev) => ({
          ...prev,
          raceData: [
            ...prev.raceData,
            {
              ...currentCarRaceData,
              status: status === EngineEnum.STARTED ? EngineStatusEnum.STARTED : EngineStatusEnum.STOPPED,
              carId: id,
            },
          ],
          loading: false,
          error: null,
        }));
        const time = calculateTime(currentCarRaceData.velocity, currentCarRaceData.distance);
        console.log(`log(time, currentCarRaceData)`, time, currentCarRaceData);
        animateCar(time);
        controlCarDrive(id);
      } else {
        setGarage((prev) => ({ ...prev, raceData: prev.raceData.filter((item) => item.carId !== id) }));
        setCanStart(true);
      }
    } catch (error) {
      const errorMsg = (error as { message: string }).message;
      setGarage((prev) => ({ ...prev, loading: false, error: errorMsg }));
    }
  }

  useEffect(() => {
    const currentCarRaceData = garage.raceData.find((item) => item.carId === car.id);
    console.log('engine_updated(id, currentCarRaceData)', car.id, currentCarRaceData);
    if (currentCarRaceData?.status === EngineStatusEnum.BROKEN) {
      animateCar(-1);
    } else if (currentCarRaceData?.status === EngineStatusEnum.STARTED) {
      const time = calculateTime(currentCarRaceData.velocity, currentCarRaceData.distance);
      console.log(`log(time, currentCarRaceData)`, time, currentCarRaceData);
      animateCar(time);
      controlCarDrive(car.id);
    }
    if (!currentCarRaceData) {
      animateCar(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [garage.raceData.find((item) => item.carId === car.id)?.status]);

  const defineWinner = () => {
    const saveWinnerRecord = async () => {
      const winnerData = garage.raceData.find((item) => item.carId === car.id);
      const time = parseInt(calculateTime(winnerData?.velocity || 0, winnerData?.distance || 0).toFixed(0), 10);
      console.log(`log(winnerData, time)`, winnerData, time);
      try {
        const winner = await winnerService.get(car.id);

        await winnerService.update(car.id, {
          wins: winner?.wins ? winner.wins + 1 : 1,
          time: winner?.time < time ? winner.time : time,
        });
      } catch (error) {
        if ((error as AxiosError).response?.status === 404) {
          await winnerService.create({
            id: car.id,
            wins: 1,
            time,
          });
        } else {
          const errorMsg = (error as { message: string }).message;
          setGarage((prev) => ({ ...prev, loading: false, error: errorMsg }));
        }
      }
    };
    if (!garage.raceWinner) {
      setGarage((prev) => ({ ...prev, raceWinner: car }));
      toast(`🏆 The winner is ${car?.name}`, {
        duration: 7000,
      });
      saveWinnerRecord();
    }
  };

  return (
    <div className={`car border-bottom ${index === 0 && ' border-top'}`}>
      <div>
        <Button variant="outline-primary" onClick={() => setGarage((prev) => ({ ...prev, selectedCarId: car.id }))}>
          SELECT
        </Button>
        <Button
          variant="outline-success"
          disabled={car.id === garage.selectedCarId && garage.loading}
          onClick={() => handleDeleteCar(car.id)}
        >
          REMOVE
        </Button>
      </div>

      <div>
        <Button variant="outline-info" onClick={() => handleStartCar(car.id, EngineEnum.STARTED)} disabled={!canStart}>
          A
        </Button>
        <Button
          variant="outline-success"
          onClick={() => handleStartCar(car.id, EngineEnum.STOPPED)}
          disabled={canStart}
        >
          B
        </Button>
      </div>

      <div className="car__container">
        <span className={garage.selectedCarId === car.id ? 'text-primary' : ''}>{car.name}</span>
        <div ref={carRef} className="car__container_box w-100 " onAnimationEnd={defineWinner}>
          <CarObject color={car.color} className="car__container_box--object" />
        </div>
      </div>
    </div>
  );
}
