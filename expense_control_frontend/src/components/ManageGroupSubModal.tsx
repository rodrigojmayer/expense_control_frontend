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
         TextField,
         MenuItem, 
        //  Modal 
        } from "@mui/material";
// import { UpButton } from './Buttons';
import { useStylesGlobal } from '../Styles'
import { GroupData, ProductData } from '../types';
import { AddButton, CancelButton, EditButton, OkButton } from './Buttons';
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
    // selectedArticle: ProductData
    // selectPayment: (newData: number) => void
    groupsByBusiness: GroupData[]
}


export default function ManageGroupSubModal(
    {   
        hiddenPanel, 
        close,
        // selectedArticle,
        // selectPayment
        groupsByBusiness
    }: ChildProps )  {
    // const breakpointLG = useMediaQuery('(min-width:1024px)')
    const { classes } = useStylesGlobal();
    const [newGroup, setNewGroup] = useState<string>("")
    
    useEffect(() => {
      setNewGroup("")
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
              Crear grupo
            </h3>
          </Box>
          
          <Box className={classes.customBoxColumn}>
            <Box className={classes.customBoxRow}>
            <TextField
                // id={String(manageSelectedArticle.id)}
                label="Nombre"
                // inputRef={lastInputRef}
                value={newGroup}
                onChange={(event) => setNewGroup(event?.target.value)}
                maxRows={1}
                size="small"
                className={classes.inputMainData}
              />
            </Box>
          </Box>
          
         
          <Box className={classes.customBoxRow}>
            <CancelButton
              // clicked={() => handleOpenEditStock()}
              clicked={close}
            />
            <OkButton
              // clicked={() => handleOpenEditStock()}
              clicked={() => console.log("nuewvo grupo: ", newGroup)}
            />
          </Box>

        </Box>
      </Modal>
      // </div>
    )
}