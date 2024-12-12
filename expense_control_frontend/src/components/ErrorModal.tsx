import { Box,
         Modal, 
         Typography,
        } from '@mui/material';
import { 
         CancelButton, 
        } from './Buttons';
import { useStylesGlobal } from '../Styles'
import { useNavigate } from 'react-router-dom';

type ErrorModalProps = {
    openErrorModal: boolean;
    closeErrorModal: (newData?: boolean) => void;
    errorData: string
}
// languagechangessearch
export default function ErrorModal( props: ErrorModalProps) {
    const { openErrorModal, closeErrorModal, errorData } = props;
    const { classes } = useStylesGlobal();
    let title = ""
    let subTitle = ""
    const navigate = useNavigate()
    
    if(errorData === 'missing_data'){
        title='Faltan datos requeridos'
        subTitle='Nombre*'
    } else if (errorData === 'negative_amount'){
        title='Precio'
        subTitle='La cantidad no puede ser negativa'
    } else if (errorData === 'missing_data_price_primary'){
        title='Faltan datos requeridos'
        subTitle='Precio*'
    } else if (errorData === 'missing_user_name'){
        title='Faltan datos requeridos'
        subTitle='Nombre*'
    } else if (errorData === 'missing_user_access_level'){
        title='Faltan datos requeridos'
        subTitle='Nivel de acceso*'
    } else if (errorData === 'missing_user_user'){
        title='Faltan datos requeridos'
        subTitle='Usuario*'
    } else if (errorData === 'missing_user_name_email'){
        title='Faltan datos requeridos'
        subTitle='Usuario o Email*'
    } else if (errorData === 'missing_user_password'){
        title='Faltan datos requeridos'
        subTitle='Contraseña*'
    } else if (errorData === 'missing_email'){
        title='Faltan datos requeridos'
        subTitle='Email*'
    } else if (errorData === 'confirm_password_must_match'){
        title='No hay coincidencia'
        subTitle='Confirmación de contraseña*'
    } else if (errorData === 'missing_terms_and_privacy'){
        title='Debe aceptar los términos de privacidad'
        subTitle='Términos de privacidad*'
    } else if (errorData === 'invalid_email_format'){
        title='Formato de email inválido'
        subTitle=''
    } else if (errorData === 'email_duplicated'){
        title=''
        subTitle='Email ya está en uso'
    } else if (errorData === 'user_duplicated'){
        title=''
        subTitle='Usuario ya está en uso'
    } else if (errorData === 'user_deleted'){
        title=''
        subTitle='Usuario eliminado'
    }  else if (errorData === 'user_disabled'){
        title=''
        subTitle='Usuario deshabilitado'
    } else if (errorData === 'login_failed'){
        title='Acceso fallido'
        subTitle='Usuario o contraseña incorrecta'
    } else if (errorData === 'missing_actual_pass'){
        title='Faltan datos requeridos'
        subTitle='Contraseña actual*'
    } else if (errorData === 'missing_new_pass'){
        title='Faltan datos requeridos'
        subTitle='Nueva contraseña*'
    } else if (errorData === 'missing_confirm_new_pass'){
        title='Faltan datos requeridos'
        subTitle='Confirmación de nueva contraseña*'
    } else if (errorData === 'not_confirmed_pass'){
        title='No hay coincidencia'
        subTitle='Confirmación de contraseña debe coincidir'
    }  else if (errorData === 'invalid_password'){
        title=''
        subTitle='Contraseña actual incorrecta'
    }  else if (errorData === 'email_not_found'){
        title=''
        subTitle='Email no encontrado'
    } else if (errorData === 'expired_validation'){
        title='Enlace de activación inválido'
        subTitle='Puedes registrarte nuevamente'
    } else if (errorData === 'invalid_user_format'){
        title='Formato de usuario inválido'
        subTitle='Contiene caracteres inválidos'
    } else if (errorData === 'invalid_pass_format'){
        title='Formato de contraseña inválido'
        subTitle='Debe tener al menos 6 caracteres'
    } else if (errorData === 'missing_verification_code'){
        title='Faltan datos requeridos'
        subTitle='Código de verificación*'
    } else if (errorData === 'expired_code_validation'){
        title='Código vencido'
    } else if (errorData === 'invalid_code'){
        title='Código inválido'
    }
    
    const handleCloseErrorModal = () => {

        closeErrorModal()            
        if (errorData === "expired_validation") {
            navigate('/signup')
        }
    }

    return (
        <Modal
            className={classes.subModalExternal}
            open={openErrorModal} 
            onClose={() => handleCloseErrorModal()}
        > 
            <form
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.code === "Space") {
                        e.preventDefault();
                        handleCloseErrorModal();
                        e.stopPropagation() 
                    }
                }}
            >
                <Box className={classes.subModalInternal}>
                    <Typography align="center" variant="h6" >
                        {title}
                    </Typography>
                    <Typography align="center" >
                        {subTitle}
                    </Typography>
                    <Box className={classes.finishButtons}>
                        <CancelButton
                        clicked={() => handleCloseErrorModal()}
                        />
                    </Box> 
                </Box>
            </form>
        </Modal>
    )
}