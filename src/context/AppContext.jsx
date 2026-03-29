import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [preSelectedAddons, setPreSelectedAddons] = useState([]);
  const [serviceNote, setServiceNote] = useState('');

  const addAddon = (addon) => {
    setPreSelectedAddons(prev => prev.includes(addon) ? prev : [...prev, addon]);
    setTimeout(() => {
      document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const setService = (note) => {
    setServiceNote(note);
    setTimeout(() => {
      document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <AppContext.Provider value={{ preSelectedAddons, serviceNote, addAddon, setService, setPreSelectedAddons, setServiceNote }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
