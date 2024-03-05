import { Dispatch, SetStateAction, createContext } from "react";

type AppContextType = {
    selectedDriverId: string | null;
    setSelectedDriverId: Dispatch<SetStateAction<string | null>>;
    driver: any;
    setDriver: Dispatch<SetStateAction<any>>;
};

export const AppContext = createContext<AppContextType | undefined>(
    undefined
);
