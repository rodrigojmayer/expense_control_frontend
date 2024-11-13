/* eslint-disable @typescript-eslint/no-unused-vars */
// import dayjs, { Dayjs } from 'dayjs';// Import dayjs
import { useContext, useEffect, useRef, useState } from 'react';
import { Box,
        //  Grid,
        //  TextField,
         Typography,
        //  InputAdornment,
         Button, 
        //  Modal 
        } from "@mui/material";
// import { UpButton } from './Buttons';
import { useStylesGlobal } from '../Styles'
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
    articlesCart: unknown
}

export default function CartMenuModal(
    {   
        hiddenPanel, 
        articlesCart
    }: ChildProps )  {
    // const breakpointLG = useMediaQuery('(min-width:1024px)')
    const { classes } = useStylesGlobal();
    // const firstInputRef = useRef<HTMLInputElement>(null)
    // const { user } = useContext<any>(UserContext); 
    // const { labelsManageStock } = useContext<any>(LanguageLabelsContext)

      console.log("articlesCart: ", articlesCart)
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

    return (
      <div  hidden= {hiddenPanel}>
        <Box className={`${classes.customBoxRow} ${classes.customBoxRowArticlesHeader}`}>
          <h2>
            Carrito
          </h2>
        </Box>
      </div>
    )
}