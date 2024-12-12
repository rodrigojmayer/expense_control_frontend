/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-finally */
import  { useContext}  from 'react'
import { UserContext } from '../context/UserContext';
import { IsLoadingContext } from '../context/IsLoadingContext';
import { JwtPayload } from '../types';
import AuthContext from "../context/AuthProvider"
import axios from '../api/axios'
import { useLocation, useNavigate } from 'react-router-dom';

export default function useUser () {
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setAuth } = useContext(AuthContext)
  const { user } = useContext<any>(UserContext)
  const { setIsLoading } = useContext<any>(IsLoadingContext);

  const loginUser = async (userNameEmail: string, userPass: string, rememberUser: boolean, googleDecodedToken?: JwtPayload) => {
    const rta = {loadingSuccess: false, errorCode: "", field: ""}        
    try {
      const response = await axios.post('/auth',
        // JSON.stringify({userNameEmail, userPass}),
        JSON.stringify({
          "user_email": userNameEmail,
          "pass": userPass,
          "rememberUser": rememberUser,          
          "googleDecodedToken": googleDecodedToken,
        }),
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        }
      )
      const accessToken = response?.data.accessToken
      const _id = response?.data._id
      setAuth({ userNameEmail, accessToken, _id})
      navigate(from, { replace: true });
      rta.loadingSuccess = true
    } catch (err:any) {
      console.log("error email not found: ", err)
      //   // Handle any network or fetch-related errors
      if (!err?.response) {
        // setErrMsg('No Server Response')
      } else if (err.response?.status === 400) {
        rta.errorCode = err.response.data.error
      } else {
        rta.errorCode = "login_failed"
      }
    } finally {
      setIsLoading((prevLoading:any) => ({
        ...prevLoading,
        user: rta.loadingSuccess,
      }));
      return rta
    }
  };

  return {
    isLogged: Boolean(user._id),
    user: user,
    loginUser
  }
}