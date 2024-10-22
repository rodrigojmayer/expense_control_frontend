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
        //  Modal 
        } from "@mui/material";
// import { UpButton } from './Buttons';
import { useStylesGlobal } from '../Styles'
import { ProductData, GroupData } from '../types';
import React from 'react';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import useMediaQuery from '@mui/material/useMediaQuery'
// import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
// import Switch from '@mui/material/Switch';
// import { LanguageLabelsContext } from '../context/LanguageLabelsContext';

interface ChildProps {
    hiddenPanel:  boolean
    selectArticles: (newData: number) => void
    productsBusiness: ProductData[]
    groups: GroupData[]
}

export default function ArticlesMenuModal(
    {   
        hiddenPanel, 
        selectArticles,
        productsBusiness,
        groups
    }: ChildProps )  {
    // const breakpointLG = useMediaQuery('(min-width:1024px)')
    const { classes } = useStylesGlobal();
    // const firstInputRef = useRef<HTMLInputElement>(null)
    // console.log("productsBusiness: ", productsBusiness)
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

    // function splitTextOnSlash(text: string) {
    //   const parts = text.split('/');
    //   // const parts = text
    //   console.log("parts", parts)
    //   return parts.map((part, index) => (
    //     index < parts.length - 1 ? `${part}/` : part // Append '/' except for the last part
    //     // `${part}/` // Append '/' except for the last part
    //   ));
    // }
    // function splitTextOnSlash(text: string) {
    //   const parts = text.split('/');
    //   return parts.map((part, index) => (
    //     <span key={index}>
    //       {part}
    //       {index < parts.length - 1 && <br />} {/* Add a <br /> except for the last part */}
    //     </span>
    //   ));
    // }

    return (
      <div
        hidden= {hiddenPanel}
      >
        <Box className={classes.customBoxRow}>
          <h2>
            Artículos
          </h2>
        </Box>
        {/* {
          productsBusiness.map((element: ProductData) => {
            return(
              <Box 
                className={classes.customBoxRow}
                key={element._id}
              >
                {element.product}
              </Box>
            )
          })
        } */}
        <Box sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 3 equal columns
          gap: 2, // Equal gap horizontally and vertically
          width: "100%",
          // backgroundColor: "lightgrey",
        }}>
          {
            groups.map((element: GroupData) => (
                <Box className={classes.customBoxGroup}
                  key={element._id}
                  onClick={() =>selectArticles(0)}
                  sx={{
                    fontSize: (element.name && element.name.length > 9) ? "16px" : "22px",   
                  }}
                >
                  {element.name.split('/').map((part, index) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < element.name.split('/').length - 1 && '/'}
                      {index < element.name.split('/').length - 1 && <br />}
                      
                    </React.Fragment>
                  ))}
                </Box>
              )
            )
          }

{
            productsBusiness.map((element: ProductData) => (
                <Box 
                  className={classes.customBoxProduct}
                  key={element._id}
                  onClick={() =>selectArticles(0)}
                  sx={{
                    fontSize: (element.product && element.product.length > 9) ? "16px" : "22px",    
                  }}
                >
                  {element.product.split('/').map((part, index) => (
                    <React.Fragment key={index}>
                      {part}
                      {/* {index < element.product.split('/').length - 1 && '/'}
                      {index < element.product.split('/').length - 1 && <br />} */}
                      
                    </React.Fragment>
                  ))}
                </Box>
              )
            )
          }
        </Box>
      </div>
    )
}