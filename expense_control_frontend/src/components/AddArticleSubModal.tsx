/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import dayjs, { Dayjs } from 'dayjs';// Import dayjs
import { useContext, useEffect, useRef, useState } from 'react';
import { Box,
        //  Grid,
        //  TextField,
         Typography,
        //  InputAdornment,
         Button,
         Modal, 
        //  Modal 
        } from "@mui/material";
// import { UpButton } from './Buttons';
import { useStylesGlobal } from '../Styles'
import { ProductData } from '../types';
import { CancelButton, EditButton, OkButton } from './Buttons';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import useMediaQuery from '@mui/material/useMediaQuery'
// import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
// import Switch from '@mui/material/Switch';
// import { UserContext } from '../context/UserContext';
// import { LanguageLabelsContext } from '../context/LanguageLabelsContext';

interface ChildProps {
    hiddenPanel:  boolean
    close: any
    selectedArticle: ProductData
    setOpenOptionSubModal: (newData: any) => void
    // selectPayment: (newData: number) => void
}

export default function AddArticleSubModal(
    {   
        hiddenPanel, 
        close,
        selectedArticle,
        setOpenOptionSubModal
        // selectPayment
    }: ChildProps )  {
    // const breakpointLG = useMediaQuery('(min-width:1024px)')
    const { classes } = useStylesGlobal();
    const [multiplier, setMultiplier] = useState<number>(1)

  // const firstInputRef = useRef<HTMLInputElement>(null)
    // const { user } = useContext<any>(UserContext); 
    // const { labelsManageStock } = useContext<any>(LanguageLabelsContext)

    // const close = () => {}
    // const DatePickerComponent = breakpointLG ? DatePicker : MobileDatePicker;
    // const [openDatePicker, setOpenDatePicker] = useState(false);  
    // const [openSaveChanges, setOpenSaveChanges] = useState(false);  
    // const handleCloseSaveChanges = (ans?:boolean) => {
    //     if(ans){
    //         close()
    //     }
    //     setOpenSaveChanges(false);
    // }
    // const handleOpenSaveChanges = () => setOpenSaveChanges(true);
    
    // const writeStockAlertAmount = (e:any) => {
    //     let newValue = parseInt(e.target.value.replace(/[+\-e]/g, ''), 10);
    //     const topValue = 999 
    //     if (isNaN(newValue)) {
    //         newValue = 0;
    //     } else if (newValue > topValue) {
    //         newValue = topValue;
    //     }
    //     onStockAlertAmountChange(newValue);
    // }
    // const handleDatePickerChange = (newDate:any) => { 
    //     const adjustedDate = newDate.add(2, 'hour').toISOString(); // Adding 2 hours because the GMT comes in +0200 and returns the day before
    //     onStockAlertDateChange(adjustedDate);
    //   };
    // const handleHiddenOptions = (changeTo:string) =>  {
    //     openOptionsCreate(changeTo)
    // }
    // const updateMultiplier = () => {
    //   setMultiplier(multiplier < 9 ? multiplier+1 : 1)
    // }

    useEffect(() => {
      setMultiplier(1)
    }, [hiddenPanel])

    return (
      // <div
      //   hidden= {hiddenPanel}
      //   className={classes.subModalExternal}
      // >
      <Modal
        className={classes.subModalExternal}
        open={!hiddenPanel} 
        onClose={close} 
      >
        <Box className={classes.subModalInternal}>
          <Box className={classes.customBoxRow}>
            <h3>
            Agregar al carrito
            </h3>
          </Box>
          <Box className={classes.customBoxRow}>
            {selectedArticle.product}
            <Button 
              className={classes.buttonMultiplier}
              onClick={() => setMultiplier(multiplier < 99 ? multiplier+1 : 1)}  
            >
              x{multiplier}
            </Button>
          </Box>
          <Box className={classes.customBoxRow}>
             {selectedArticle.price_primary} dkk
          </Box>
          
         
          <Box className={classes.customBoxRow}>
            <EditButton
              // clicked={() => alert("qsy")}
              // clicked={() => setOpenOptionSubModal({manageArticleSubModal: false})}
              
              clicked={() => setOpenOptionSubModal((prevOpenOptionSubModal: any) => ({
                ...prevOpenOptionSubModal,
                manageArticleSubModal: false,
              }))}
            />
            <CancelButton
              // clicked={() => handleOpenEditStock()}
              clicked={close}
            />
            <OkButton
              // clicked={() => handleOpenEditStock()}
              clicked={() => alert("pepi")}
            />
          </Box>
        </Box>
      </Modal>
      // </div>
    )
}