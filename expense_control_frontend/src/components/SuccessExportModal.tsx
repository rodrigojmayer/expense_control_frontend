import { Box,
         Modal, 
         Typography,
        } from '@mui/material';
import { 
         OkButton, 
        } from './Buttons';
import { useStylesGlobal } from '../Styles'
import { useNavigate } from 'react-router-dom';

type SuccessExportModalProps = {
    openSuccessExportModal: boolean;
    closeSuccessExportModal: (newData?: boolean) => void;
    businessSelected: string
}
// languagechangessearch
export default function SuccessExportModal( props: SuccessExportModalProps) {
    const { openSuccessExportModal, closeSuccessExportModal, businessSelected } = props;
    const { classes } = useStylesGlobal();
    let title = "Datos exportados"
    let id_business = ""
    const navigate = useNavigate()
    
    if(businessSelected === "Agustin"){
        id_business='80649782'
    } else if(businessSelected === "Belen"){
        title='Datos exportados'
        id_business='1050605019'
    } else if(businessSelected === "Cande"){
        id_business='700029908'
    } else if(businessSelected === "Facha Gaucha"){
        id_business='1416761792'
    } 
    

    const handleCloseSuccessExportModal = () => {

        closeSuccessExportModal()            
        // if (businessSelected === "expired_validation") {
            navigate('/')
        // }
    }

    return (
        <Modal
            className={classes.subModalExternal}
            open={openSuccessExportModal} 
            onClose={() => handleCloseSuccessExportModal()}
        > 
            <form
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.code === "Space") {
                        e.preventDefault();
                        handleCloseSuccessExportModal();
                        e.stopPropagation() 
                    }
                }}
            >
                <Box className={classes.subModalInternal}>
                    <Typography align="center" variant="h6" >
                        {title}
                    </Typography>
                    <Typography align="center" >
                        <a 
                            href={`https://docs.google.com/spreadsheets/d/1glanSEOov9B7xm3EvGUmImvGvyMIGNN7d_opIV1L93w/edit?gid=${id_business}#gid=${id_business}`}
                            target="_blank"
                        >
                            Link
                        </a>
                    </Typography>
                    <Box className={classes.finishButtons}>
                        <OkButton
                            clicked={() => handleCloseSuccessExportModal()}
                        />
                        {/* https://docs.google.com/spreadsheets/d/1glanSEOov9B7xm3EvGUmImvGvyMIGNN7d_opIV1L93w/edit?gid=80649782#gid=80649782 */}
                    </Box> 
                </Box>
            </form>
        </Modal>
    )
}