import React, { createContext, useState, useMemo, Dispatch, SetStateAction, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Car, RaceData } from '../interfaces/carInterface';
import { WinnerCars } from '../interfaces/winnerInterface';

interface AppContextType {
  garage: GarageStateType;
  setGarage: Dispatch<SetStateAction<GarageStateType>>;
  winner: WinnerStateType;
  setWinner: Dispatch<SetStateAction<WinnerStateType>>;
}

type GarageStateType = {
  cars: Car[];
  raceData: RaceData[];
  raceWinner: Car | null;
  error: string | null;
  loading: boolean;
  selectedCarId?: number | null;
  totalCount: number;
  page: number;
};

type WinnerStateType = {
  winners: WinnerCars[];
  error: string | null;
  loading: boolean;
  totalCount: number;
  page: number;
};

const defaultGarageState: GarageStateType = {
  cars: [],
  raceData: [],
  raceWinner: null,
  error: null,
  loading: false,
  selectedCarId: null,
  totalCount: 0,
  page: 1,
};

const defaultWinnerState: WinnerStateType = {
  winners: [],
  error: null,
  loading: false,
  totalCount: 0,
  page: 1,
};

export const AppContext = createContext<AppContextType>({
  garage: defaultGarageState,
  setGarage: () => {},
  winner: defaultWinnerState,
  setWinner: () => {},
});

function AppContextProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [garage, setGarage] = useState<GarageStateType>(defaultGarageState);
  const [winner, setWinner] = useState<WinnerStateType>(defaultWinnerState);

  useEffect(() => {
    if (garage.error) {
      toast.error(garage.error);
    }
  }, [garage.error]);

  const value = useMemo(() => ({ garage, setGarage, winner, setWinner }), [garage, setGarage, winner, setWinner]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
