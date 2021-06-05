import React, {
  Context,
  createContext,
  FunctionComponent,
  useContext,
} from 'react';

interface StoreWrapperProps {}

const StoreContext: Context<Partial<StoreWrapperProps>> = createContext({});

export const useStore = (): Partial<StoreWrapperProps> =>
  useContext(StoreContext);

const StoreWrapper: FunctionComponent = ({ children }) => {
  const value = {};
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreWrapper;
