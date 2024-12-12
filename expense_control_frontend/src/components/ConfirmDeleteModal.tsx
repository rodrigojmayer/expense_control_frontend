import { useState, useEffect } from 'react';
import { Box, 
         Modal, 
         Typography, 
        } from '@mui/material';
import { CancelButton } from './Buttons';
import { useStylesGlobal } from '../Styles'
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 25,
    borderRadius: '7px',
    '& .MuiSlider-track': {
      border: 'none',
      borderRadius: '7px 0 0 7px',
    },
    '& .MuiSlider-thumb': {
      height: 25,
      width: 40,
      borderRadius: '7px',
      backgroundColor: '#fff',
      border: '1px solid currentColor',
      '&:before': {
        display: 'none',
      },
    },
  });

type ConfirmDeleteModalProps = {
    openConfirmDeleteModal: boolean;
    closeConfirmDeleteModal: (newData?: boolean) => void;
}
export default function ConfirmDeleteModal( props: ConfirmDeleteModalProps) {
    const { openConfirmDeleteModal, closeConfirmDeleteModal } = props;
    const { classes } = useStylesGlobal();
    const [isThumbPressed, setIsThumbPressed] = useState(true);
    const [valueSlider, setValueSlider] = useState(0);
    
    const handleThumbMouseDown = () => {
      setIsThumbPressed(true);
    };
  
    const handleThumbMouseUp = () => {
        if(valueSlider<100)
            setValueSlider(0)
        setIsThumbPressed(false);
    };
  
    const handleSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        const value = typeof newValue === 'number' ? newValue : newValue[activeThumb];
         if (isThumbPressed) {
            if(valueSlider-20 <= value && value <= valueSlider+35){
                setValueSlider(value)
            }
        } else {
            setValueSlider(0)
        }
    };

    useEffect(() => {
        if(valueSlider===100 && !isThumbPressed){
            closeConfirmDeleteModal(true)
        }
    }, [valueSlider, isThumbPressed])
    useEffect(() => {
        const handleMouseUp = () => {
            if (isThumbPressed && valueSlider < 100) {
                setValueSlider(0);
                setIsThumbPressed(false);
            } else if(valueSlider===100){
                closeConfirmDeleteModal(true)
                setValueSlider(0);
            }
        };

        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isThumbPressed, valueSlider]);
    
    return (
        <Modal
            className={classes.subModalExternal}
            open={openConfirmDeleteModal} 
            onClose={() => closeConfirmDeleteModal()}
        > 
            <Box className={`${classes.subModalInternal} ${classes.subModalDelete}`}>
                <Typography   sx={{ marginTop: 2 }} align="center" >
                    Eliminar
                </Typography> 
                <Box 
                    margin="auto"
                    sx={{ width: 100 }}
                >
                    <PrettoSlider
                        aria-label="Temperature"
                        value={valueSlider}
                        onMouseDown={handleThumbMouseDown} // Attach the event handler when thumb is pressed
                        onMouseUp={handleThumbMouseUp}     // Attach the event handler when thumb is released
                        onTouchStart={handleThumbMouseDown} // Attach the event handler when thumb is pressed
                        onTouchEnd={handleThumbMouseUp}     // Attach the event handler when thumb is released
                        onChange={handleSliderChange}
                    />
                </Box>
                <Box className={classes.deleteButtons}>
                    <CancelButton
                    clicked={() => closeConfirmDeleteModal(false)}
                    />
                </Box> 
            </Box>
        </Modal>
    )
}