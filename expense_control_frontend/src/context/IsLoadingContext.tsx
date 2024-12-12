import { createContext, useState } from 'react';

export const IsLoadingContext = createContext<object | undefined>(undefined);

type IsLoadingProviderProps = {
  children: React.ReactNode;
};
  
export const IsLoadingProvider: React.FC<IsLoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState({
    user: true,
    products: true,
    groups: true
  }); // New state for loading status
  
  const [openBackdrop, setOpenBackdrop] = useState(true)
  
  return  (
    <IsLoadingContext.Provider value={{ isLoading, setIsLoading, openBackdrop, setOpenBackdrop }}>
      {children}
    </IsLoadingContext.Provider>)
};