import { Box,
         CircularProgress,
         Modal, 
        } from '@mui/material';
import { useStylesGlobal } from '../Styles'

type LoadingModalProps = {
    openLoadingModal: boolean;
}
// languagechangessearch
export default function LoadingModal( props: LoadingModalProps) {
    const { openLoadingModal } = props;
    const { classes } = useStylesGlobal();

    return (
        <Modal
            className={classes.subModalExternal}
            open={openLoadingModal} 
        > 
            <Box className={classes.center}>
                <CircularProgress />
            </Box>
        </Modal>
    )
}