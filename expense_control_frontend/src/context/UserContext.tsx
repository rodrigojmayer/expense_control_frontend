/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useEffect, useContext } from 'react';
import { UserData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
import AuthContext from "../context/AuthProvider"

const INITIAL_USER = {
  _id: "",
  id: NaN,
  id_client: 0,
  name: '',
  last_name: '',
  email: '',
  id_access_level: NaN,
  user: '',
  pass: '',
  deleted: false,
  enabled: true,
  ordered_fields: [],
  language: 0,
  background_color: 0,
  alerts_enabled: false,
};

// export const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserContext = createContext<object | undefined>(undefined);

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { auth } = useContext(AuthContext)
  const [user, setUser] = useState<UserData>(INITIAL_USER)
  const { isLoading,  setIsLoading } = useContext<any>(IsLoadingContext);
  const [_IdUserLogged, set_IdUserLogged] = useState<string|number>(INITIAL_USER._id);
  const [gmailUserLogged, setGmailUserLogged] = useState<UserData>(INITIAL_USER);

  const fetchUserByUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/users/${auth._id}`)
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const json = await response.json();
      if(json.name===undefined) json.name = ""
      if(json.last_name===undefined) json.last_name = ""
      setUser(json);
    } catch (error: any) {
      // Handle any network or fetch-related errors
    } finally {
      setIsLoading((prevLoading:any) => ({
        ...prevLoading,
        user: false,
      }));
    }
  }
  useEffect(() => {
    if(auth.accessToken) {
      fetchUserByUser()      
    }
  }, [auth]); 

  useEffect(() => {
    if(auth.accessToken && isLoading.fieldsFetchEditUsersFieldsOrder) {
      fetchUserByUser()   
        setIsLoading((prevLoading: any) => ({
          ...prevLoading,
          fieldsFetchEditUsersFieldsOrder: false,
      }));   
    }
  }, [isLoading.fieldsFetchEditUsersFieldsOrder]); 

  return (
    <UserContext.Provider value={{ INITIAL_USER, user, setUser, setGmailUserLogged, gmailUserLogged, _IdUserLogged, set_IdUserLogged }}>
      {children}
    </UserContext.Provider>
  )
};