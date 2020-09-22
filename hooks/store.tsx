/* eslint-disable no-unused-vars */
import { createContext, useContext } from 'react';

const storeContext = createContext({});

export const useStore = () => useContext(storeContext);

const menuMethods = () => {
  const selectableDrinks = {
    kr29rjgsqx: {
      id: 'kr29rjgsqx',
      name: 'Expresso',
      image: '/items/expresso.svg',
    },
    borwbinnx5: {
      id: 'borwbinnx5',
      name: 'Cortado',
      image: '/items/cortado.svg',
    },
    pv6zms5cyy: {
      id: 'pv6zms5cyy',
      name: 'Americano',
      image: '/items/americano.svg',
    },
    aohv0owt7h: {
      id: 'aohv0owt7h',
      name: 'Latte',
      image: '/items/latte.svg',
    },
    fq6my5ts27: {
      id: 'fq6my5ts27',
      name: 'Iced Latte',
      image: '/items/iced-latte.svg',
    },
    q5xv91wql3: {
      id: 'q5xv91wql3',
      name: 'Cold Brew',
      image: '/items/cold-brew.svg',
    },
    e3yqr9fn31: { id: 'e3yqr9fn31', name: 'Tea', image: '/items/tea.svg' },
    piuy88zw7n: {
      id: 'piuy88zw7n',
      name: 'AeroPress',
      image: '/items/aeropress.svg',
    },
  };

  function getDrinkbyId(id) {
    return selectableDrinks[id];
  }

  return { selectableDrinks: Object.values(selectableDrinks), getDrinkbyId };
};

export interface StoreType {
  selectableDrinks: DrinkType[];
}

interface DrinkType {
  id: string;
  name: string;
  image?: string;
}

export const StoreWrapper = ({ children }) => {
  const Menu = menuMethods();

  const value = { ...Menu };

  return (
    <storeContext.Provider value={value}>{children}</storeContext.Provider>
  );
};
