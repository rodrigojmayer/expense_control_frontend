// import { useContext } from 'react';
import { Box,
         Modal, 
         Typography,
        } from '@mui/material';
import { OkButton,
         CancelButton, 
        } from './Buttons';
import { useStylesGlobal } from '../Styles'

type SaveChangesProps = {
    openSaveChanges: boolean;
    closeSaveChanges: (newData?: boolean) => void;
    messageBeforeSave?: string;
}
export default function SaveChanges( props: SaveChangesProps) {
    const { openSaveChanges, closeSaveChanges, messageBeforeSave } = props;
    const { classes } = useStylesGlobal();

    return (
        <Modal
            className={classes.subModalExternal}
            open={openSaveChanges} 
            onClose={() => closeSaveChanges()}
        > 
            <form
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        closeSaveChanges(true); // Call your save function
                        e.stopPropagation()
                    }
                }}
            >
                <Box className={classes.subModalInternal}>
                    <Typography align="center" variant="h6" className={classes.title}>
                        Guardar cambios?
                    </Typography>
                    <Typography align="center" >
                        {messageBeforeSave}
                    </Typography>
                    <Box className={classes.finishButtons}>
                        <CancelButton
                        clicked={() => closeSaveChanges(false)}
                        />
                        <OkButton
                        clicked={() => closeSaveChanges(true)}
                        />
                    </Box> 
                </Box>
            </form>
        </Modal>
    )
}