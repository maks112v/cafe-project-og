/* eslint-disable no-unused-vars */
import firebase from 'firebase';
import { Context, createContext, FunctionComponent, useContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSession } from './auth';

export interface StoreType {
  selectableDrinks?: DrinkType[];
  getDrinkbyId(id: string): DrinkType;
  teaFlavors?: TeaFlavorType[];
  getTeaFlavorbyId(id: string): TeaFlavorType;
  syrupFlavors?: SyrupFlavorType[];
  getSyrupFlavorsbyId(id: string): SyrupFlavorType;
  syrupAmount?: SyrupAmountType[];
  getSyrupAmountbyId(id: string): SyrupAmountType;
}

const storeContext: Context<StoreType> = createContext(null);

export const useStore = () => useContext(storeContext);

const MenuMethods = () => {
  const selectableDrinks = {
    kr29rjgsqx: {
      id: 'kr29rjgsqx',
      name: 'Espresso',
      image: '/items/expresso.svg',
      available: true,
      description:
        'A strong, concentrated coffee made by forcing pressurized water through finely ground coffee beans. Meant to be taken like a shot.',
    },
    borwbinnx5: {
      id: 'borwbinnx5',
      name: 'Cortado',
      image: '/items/cortado.svg',
      available: true,
      description:
        'A double shot espresso with a drizzle of warm milk to soften the taste and reduce the degree of bitterness of the coffee.',
    },
    pv6zms5cyy: {
      id: 'pv6zms5cyy',
      name: 'Americano',
      image: '/items/americano.svg',
      available: true,
      description:
        'A double shot of espresso added to a cup of hot water. Many like to drink this as they would a regular brewed coffee with milk and sugar.',
    },
    aohv0owt7h: {
      id: 'aohv0owt7h',
      name: 'Latte',
      image: '/items/latte.svg',
      available: true,
      description:
        'A single shot of espresso with three parts steamed milk. It is usually bigger than a cappuccino because it contains more milk and can be ordered with flavoring.',
    },
    fq6my5ts27: {
      id: 'fq6my5ts27',
      name: 'Iced Latte',
      image: '/items/iced-latte.svg',
      available: true,
      description: 'Double shot espresso with milk served over ice.',
    },
    q5xv91wql3: {
      id: 'q5xv91wql3',
      name: 'Cold Brew',
      image: '/items/cold-brew.svg',
      available: false,
      description:
        'Cold brew is brewed by soaking coffee beans cold or room-temperature water for 12 hours minimum to extract sugars, oils and caffeine.',
    },
    e3yqr9fn31: {
      id: 'e3yqr9fn31',
      name: 'Tea',
      image: '/items/tea.svg',
      available: true,
      description: 'It really is a serious problem if tea can’t fix it.',
    },
    piuy88zw7n: {
      id: 'piuy88zw7n',
      name: 'Drip Coffee',
      image: '/items/aeropress.svg',
      available: true,
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

  const syrupFlavors = {
    r2u841mxif: {
      id: 'r2u841mxif',
      name: 'Mocha',
      isAvailable: true,
    },
    miyvy7edgu: {
      id: 'miyvy7edgu',
      name: 'Vanilla',
      isAvailable: true,
    },
    rbkh5xsd5m: {
      id: 'rbkh5xsd5m',
      name: 'Caramel',
      isAvailable: true,
    },
    mb286bojil: {
      id: 'mb286bojil',
      name: 'Hazelnut',
      isAvailable: false,
    },
  };

  const syrupAmount = {
    ubseohgs5t: {
      id: 'ubseohgs5t',
      amount: '1 - Light',
    },
    w9aac3id0p: {
      id: 'w9aac3id0p',
      amount: '2 - Regular',
    },
    uiqsses52e: {
      id: 'uiqsses52e',
      amount: '3 - Extra',
    },
  };

  function getDrinkbyId(id) {
    return selectableDrinks[id];
  }

  function getTeaFlavorbyId(id) {
    return teaFlavors[id];
  }

  function getSyrupFlavorsbyId(id) {
    return syrupFlavors[id];
  }

  function getSyrupAmountbyId(id) {
    return syrupAmount[id];
  }

  return {
    selectableDrinks: Object.values(selectableDrinks),
    getDrinkbyId,
    teaFlavors: Object.values(teaFlavors),
    getTeaFlavorbyId,
    syrupFlavors: Object.values(syrupFlavors),
    getSyrupFlavorsbyId,
    syrupAmount: Object.values(syrupAmount),
    getSyrupAmountbyId,
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

interface DrinkType {
  id: string;
  name: string;
  image?: string;
  available: boolean;
}

interface TeaFlavorType {
  id: string;
  name: string;
}

interface SyrupFlavorType {
  id: string;
  name: string;
}

interface SyrupAmountType {
  id: string;
  amount: string;
}

export const StoreWrapper: FunctionComponent = ({ children }) => {
  const Menu = MenuMethods();

  const Orders = OrdersMethods();

  const value: StoreType = { ...Menu, ...Orders };

  return (
    <storeContext.Provider value={value}>{children}</storeContext.Provider>
  );
};
