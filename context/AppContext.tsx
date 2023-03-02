import { createContext, useContext } from 'react';

type AppContextD = {
  projectKey: any;
};

export const AppContext = createContext<AppContextD>({
  projectKey: null,
});

export const useApp = () => {
  return useContext(AppContext);
};
