import { createContext, ReactNode, useContext } from 'react';
import { Units } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface UnitsContextType {
    units: Units;
    setUnits: (units: Units) => void;
    toggle: () => void;
}

export const UnitsContext = createContext<UnitsContextType |
    undefined>(undefined);

export function UnitsProvider({ children }: { children: ReactNode }) {
    const [units, setUnits] = useLocalStorage<Units>('units', 'metric');
    const toggle = () => setUnits(prev => prev === 'metric' ? 'imperial' : 'metric');

    return (
        <UnitsContext.Provider value={{ units, setUnits, toggle }}>
            {children}
        </UnitsContext.Provider>
    );
}

export const useUnits = () => {
    const context = useContext(UnitsContext);
    if (!context) throw new Error('useUnits must be used within UnitsProvider');
    return context;
};