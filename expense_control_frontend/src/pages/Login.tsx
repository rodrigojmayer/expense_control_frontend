/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal, modalLoginInternal  } from '../Styles'
import { Box,
    // Divider,
    Modal, 
    // IconButton,
    // TextField,
    Typography,
    // Switch,
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
    const { setGmailUserLogged, user } = useContext<any>(UserContext);
    const [openErrorModal, setOpenErrorModal] = useState(false); 
    const [errorData, setErrorData] = useState("");

    
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
            // setErrorTextFields((prevErrorTextFields: any) => ({
            //     ...prevErrorTextFields,
            //     [rta.field]: true,
            // }));
        }
        }
        login();
    };
    
    return (
        // <Modal 
        //     className={`${classes[`main_background_color`]} ${classes[`modal_color`]}`}
        //     open={true} 
        // >  
            <Paper style={{ margin: 0 }}>
                {/* <Box sx={modalStyleSaveExternal}> */}
                    
      {/* <Box 
      className={`${classes[`main_background_color`]} ${classes[`modal_color`]}`}
      sx={modalStyleSaveExternal}
      > */}
                    {/* <Box 
                        sx={{ ...modalStyleErrorInternal, ...modalLoginInternal }}
                        className={`${classes[`main_background_color` as keyof typeof classes]} ${classes[`modal_color` as keyof typeof classes]}`}
                    > */}
                        {/* <ErrorModal
                        openErrorModal={openErrorModal}
                        closeErrorModal={handleCloseErrorModal}
                        errorData={errorData} 
                        /> */}          
                        {/* <Typography className={classes.finishButtons} align="center" variant='h5' >
                            Login
                        </Typography> */}
                        <Box className={classes.customBoxRow}>
                            <GoogleLogin
                                onError={() => handleLoginGoogleFailure}
                                onSuccess={handleLoginGoogleSuccess}
                                locale= "es"
                            />
                        </Box>
                    {/* </Box> */}
                {/* </Box> */}
            </Paper>
        // </Modal> 
    )
}