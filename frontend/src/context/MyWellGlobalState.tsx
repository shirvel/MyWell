import React, { createContext, useState, ReactNode } from 'react';

export interface GlobalState {
    didWeeklyReflection?: boolean;
}

interface GlobalStateContextProps {
    globalState: GlobalState;
    setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

export const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [globalState, setGlobalState] = useState<GlobalState>({});

    return (
        <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
            {children}
        </GlobalStateContext.Provider>
    );
};
