/* eslint-disable react-hooks/exhaustive-deps */
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
    const [productsBusinessShow, setProductsBusinessShow] = useState<ProductData[]>([]);
    const [groupSelected, setGroupSelected] = useState<number>(0);
    
    const selectGroup = (groupId:number) => {
      setGroupSelected(groupId)
      
    } 
    useEffect(() => {
      const productsFilter = productsBusiness.filter((product:ProductData) => product.id_group === groupSelected)
      console.log("productsFilter: ", productsFilter)
      setProductsBusinessShow(productsFilter)
    }, [groupSelected])

    return (
      <div
        hidden= {hiddenPanel}
      >
        <Box className={classes.customBoxRow}>
          <h2>
            Artículos
          </h2>
        </Box>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 3 equal columns
          gap: 2, // Equal gap horizontally and vertically
          width: "100%",
        }}>
          { groupSelected === 0 &&
            groups.map((group: GroupData) => (
                <Box className={classes.customBoxGroup}
                  key={group._id}
                  onClick={() =>selectGroup(group.id || 0)}
                  sx={{
                    fontSize: (group.name && group.name.length > 9) ? "16px" : "22px",   
                  }}
                >
                  {group.name.split('/').map((part, index) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < group.name.split('/').length - 1 && '/'}
                      {index < group.name.split('/').length - 1 && <br />}
                      
                    </React.Fragment>
                  ))}
                </Box>
              )
            )
          }
          {
            productsBusinessShow.map((product: ProductData) => (
                <Box 
                  className={classes.customBoxProduct}
                  key={product._id}
                  onClick={() =>selectArticles(0)}
                  sx={{
                    fontSize: (product.product && product.product.length > 9) ? "16px" : "22px",    
                  }}
                >
                  {product.product.split('/').map((part, index) => (
                    <React.Fragment key={index}>
                      {part}
                      
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