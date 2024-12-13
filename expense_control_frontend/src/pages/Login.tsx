/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { useStylesGlobal } from '../Styles'
import { Box,
    Paper,
    } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode  } from 'jwt-decode';
import { JwtPayload } from "../types";
import { UserContext } from '../context/UserContext';
import useUser from '../hooks/useUser';

export default function Login () {
    
    const { classes } = useStylesGlobal();
    const { loginUser } = useUser()
    const { setGmailUserLogged } = useContext<any>(UserContext);
    const [, setOpenErrorModal] = useState(false); 
    const [, setErrorData] = useState("");

    
    useEffect(() => {
        setOpenErrorModal(false)
        setErrorData("")
        
    }, [])
    
    const handleLoginGoogleFailure = (error: any) => {
        console.log(error)
        // Handle the failure/error during Google login here
    }; 

    const handleLoginGoogleSuccess = async (response: any) => {
        // Handle the successful Google login response here
        const googleDecodedToken:JwtPayload = jwtDecode(response.credential);
        const userEmailData = googleDecodedToken
        setGmailUserLogged(userEmailData)     //////////// check for what is this
        const login = async() => {
        const rta = await loginUser(googleDecodedToken.email, "", false, googleDecodedToken)
        if(!rta.loadingSuccess){
            setOpenErrorModal(true) // Open the modal for duplicate product error
            setErrorData(rta.errorCode)
        }
        }
        login();
    };
    
    return (
        <Paper style={{ margin: 0 }}>
            <Box className={classes.customBoxRow}>
                <GoogleLogin
                    onError={() => handleLoginGoogleFailure}
                    onSuccess={handleLoginGoogleSuccess}
                    locale= "es"
                />
            </Box>
        </Paper>
    )
}