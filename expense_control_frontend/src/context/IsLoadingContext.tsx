import { createContext, useState } from 'react';

export const IsLoadingContext = createContext<object | undefined>(undefined);

type IsLoadingProviderProps = {
  children: React.ReactNode;
};
  
export const IsLoadingProvider: React.FC<IsLoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState({
    user: true,
  }); // New state for loading status
  
  // console.log("realoading isLoadingContext???")
  const [openBackdrop, setOpenBackdrop] = useState(true)
  // console.log("openBackdrop", openBackdrop)
  // useEffect(() => {
  //   // console.log("isLoading.openFirstTimeValidateUser: ", isLoading.openFirstTimeValidateUser)
  // }, [isLoading])

  return  (
    <IsLoadingContext.Provider value={{ isLoading, setIsLoading, openBackdrop, setOpenBackdrop }}>
      {children}
    </IsLoadingContext.Provider>)
};