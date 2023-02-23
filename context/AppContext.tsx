import { createContext, useContext } from 'react';

type AppContextD = {
  projectId: any;
};

export const AppContext = createContext<AppContextD>({
  projectId: null,
});

export const useApp = () => {
  return useContext(AppContext);
};
