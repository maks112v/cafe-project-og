/* eslint-disable no-unused-vars */
import firebase from 'firebase';
import { createContext, FunctionComponent, useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSession } from './auth';

const storeContext = createContext({});

export const useStore = () => useContext(storeContext);

const MenuMethods = () => {
  const selectableDrinks = {
    kr29rjgsqx: {
      id: 'kr29rjgsqx',
      name: 'Espresso',
      available: true,
      image: '/items/expresso.svg',
    },
    borwbinnx5: {
      id: 'borwbinnx5',
      name: 'Cortado',
      available: true,
      image: '/items/cortado.svg',
    },
    pv6zms5cyy: {
      id: 'pv6zms5cyy',
      name: 'Americano',
      available: true,
      image: '/items/americano.svg',
    },
    aohv0owt7h: {
      id: 'aohv0owt7h',
      name: 'Latte',
      available: true,
      image: '/items/latte.svg',
    },
    fq6my5ts27: {
      id: 'fq6my5ts27',
      name: 'Iced Latte',
      available: true,
      image: '/items/iced-latte.svg',
    },
    q5xv91wql3: {
      id: 'q5xv91wql3',
      name: 'Cold Brew',
      available: false,
      image: '/items/cold-brew.svg',
    },
    e3yqr9fn31: {
      id: 'e3yqr9fn31',
      name: 'Tea',
      available: true,
      image: '/items/tea.svg',
    },
    piuy88zw7n: {
      id: 'piuy88zw7n',
      name: 'AeroPress',
      available: true,
      image: '/items/aeropress.svg',
    },
    cy1zgxn96m: {
      id: 'cy1zgxn96m',
      name: 'Hot Chocolate',
      available: true,
      image: '/items/hot-coco.svg',
    },
  };

  const teaFlavors = {
    wk0s59hzwg: {
      id: 'wk0s59hzwg',
      name: 'Refresh Mint',
      details: 'Herbal',
    },
    u5552y9pbq: {
      id: 'u5552y9pbq',
      name: 'Awake English Breakfast',
      details: 'Black',
    },
    w10jguil7i: {
      id: 'w10jguil7i',
      name: 'Zen',
      details: 'Green',
    },
  };

  function getDrinkbyId(id) {
    return selectableDrinks[id];
  }

  function getTeaFlavorbyId(id) {
    return teaFlavors[id];
  }

  return {
    selectableDrinks: Object.values(selectableDrinks),
    getDrinkbyId,
    teaFlavors: Object.values(teaFlavors),
    getTeaFlavorbyId,
  };
};

const OrdersMethods = () => {
  const { auth }: any = useSession();

  const [orders, loadingOrders, errors] = useCollectionData(
    auth &&
      firebase
        .firestore()
        .collection(`orders`)
        .where('userId', '==', auth?.uid)
        .orderBy('meta.createdAt', 'desc'),
    {
      idField: 'id',
    }
  );

  return { orders, loadingOrders };
};

export interface StoreType {
  selectableDrinks: DrinkType[];
  getDrinkbyId(id: string): DrinkType;
  teaFlavors: TeaFlavorType[];
  getTeaFlavorbyId(id: string): TeaFlavorType;
}

interface DrinkType {
  id: string;
  name: string;
  image?: string;
}

interface TeaFlavorType {
  id: string;
  name: string;
}

export const StoreWrapper: FunctionComponent = ({ children }) => {
  const Menu = MenuMethods();

  const Orders = OrdersMethods();

  const value: StoreType = { ...Menu, ...Orders };

  return (
    <storeContext.Provider value={value}>{children}</storeContext.Provider>
  );
};
