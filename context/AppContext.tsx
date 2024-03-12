import { Dispatch, SetStateAction, createContext } from "react";

type AppContextType = {
    selectedDriverId: string | null;
    setSelectedDriverId: Dispatch<SetStateAction<string | null>>;
    driver: any;
    setDriver: Dispatch<SetStateAction<any>>;
    commentByDriver: any;
    setCommentByDriver: Dispatch<SetStateAction<any>>;
    activeRide: any;
    setActiveRide: Dispatch<SetStateAction<any>>;
};

export const AppContext = createContext<AppContextType | undefined>(
    undefined
);
