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
import { ArticleCartData } from '../types';
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
    articlesCart: ArticleCartData[]
    setArticlesCart: React.Dispatch<React.SetStateAction<ArticleCartData[]>>
}

export default function CartMenuModal(
    {   
        hiddenPanel, 
        articlesCart,
        setArticlesCart
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
    const handleRemoveArticleFromCart = (artIndex: number) => {
      // const newArticlesCart = articlesCart.filter((articleCart: ArticleCartData, index: number) => (index !== artIndex))
      const newArticlesCart = articlesCart.map((articleCart: ArticleCartData, index: number) => {
        if(index === artIndex){
          return {
            ...articleCart,
            multiplier: (articleCart.multiplier ?? 1) - 1,
          }
        }
        return articleCart;
      }).filter((articleCart: ArticleCartData) => articleCart.multiplier ?? 0 > 0);

      setArticlesCart(newArticlesCart)
    }
    return (
      <div  hidden= {hiddenPanel}>
        <Box className={`${classes.customBoxRow} ${classes.customBoxRowArticlesHeader}`}>
          <h2>
            Carrito
          </h2>
        </Box>
        <Box className={`${classes.customBoxRow} ${classes.customBoxCartArticles}`}>
          {articlesCart.map((articleCart: ArticleCartData, index: number) => (
            Array.from({ length: articleCart.multiplier ?? 0 }).map((_, i) => (
              
              <Box 
                // key={articleCart.selectedArticle._id}
                key={`${articleCart.selectedArticle._id}-${i}`}
                className={classes.customBoxCartArticle}
              >
                <Box
                  className={classes.buttonRemoveCartArticle}
                  onClick={() => handleRemoveArticleFromCart(index)}
                > 
                  X 
                </Box>
                <Box> 
                  { articleCart.selectedArticle.product.length > 17 ? articleCart.selectedArticle.product.slice(0, 17) + "..." : articleCart.selectedArticle.product } 
                </Box>
                <Box className={classes.underscore}></Box>
                <Box> {articleCart.selectedArticle.price_primary} </Box>
              </Box>
            ))
          ))}
        </Box>
        <Box className={`${classes.customBoxRow} ${classes.customBoxCartArticles} ${classes.customBoxCartTotal}`}>
          <Box 
            className={classes.customBoxCartArticle}
          >
            <Box> 
              Total
            </Box>
            <Box className={classes.underscore}></Box>
            <Box> 
              {articlesCart.reduce((acu: number, obj: ArticleCartData) => (obj.selectedArticle.price_primary ? obj.selectedArticle.price_primary + acu : 0), 0)} 
            </Box>
          </Box>
        </Box>
      </div>
    )
}