import { createContext, useContext } from 'react';

type AppContextD = {
  appId: any;
};

export const AppContext = createContext<AppContextD>({
  appId: null,
});

export const useApp = () => {
  return useContext(AppContext);
};
