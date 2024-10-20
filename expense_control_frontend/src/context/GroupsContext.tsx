/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useEffect, useContext } from 'react';
import { GroupData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
import { UserContext } from './UserContext';

export const GroupsContext = createContext<object | undefined>(undefined);

type GroupsProviderProps = {
  children: React.ReactNode;
};

export const GroupsProvider: React.FC<GroupsProviderProps> = ({ children }) => {
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
  const { user } = useContext<any>(UserContext);
  
  const [groups, setGroups] = useState<GroupData[]>([])

  const fetchGroups = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/groups/`)
      if (response.ok) {
        const json = await response.json()
        setGroups(json)
      } else {
        // Handle the case where the response is not OK (e.g., show an error message)
      }
    } catch (error: unknown) {
      setGroups([])
      // Handle any network or fetch-related errors
    } finally {
      setIsLoading((prevLoading: any) => ({
        ...prevLoading,
        groups: false,
      }));
    }
  }

  
  useEffect(() => {
    fetchGroups();
  }, []);
  

  return (
    <GroupsContext.Provider value={{ groups }}>
      {children}
    </GroupsContext.Provider>
  )
};
