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
    selectedArticle: ProductData
    setOpenOptionSubModal: (newData: any) => void
    // selectPayment: (newData: number) => void
    groupsBusiness: GroupData[]
}


export default function ManageArticleSubModal(
    {   
        hiddenPanel, 
        close,
        selectedArticle,
        setOpenOptionSubModal,
        // selectPayment
        groupsBusiness
    }: ChildProps )  {
    // const breakpointLG = useMediaQuery('(min-width:1024px)')
    const { classes } = useStylesGlobal();
    const [manageSelectedArticle, setManageSelectedArticle] = useState<ProductData>(selectedArticle)
    const [manageSelectedGroup, setManageSelectedGroup] = useState<GroupData | any>({})
    
    const handleProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
      setManageSelectedArticle((prev:ProductData) => ({
        ...prev,
        product: event.target.value
      }))
    }
    const handlePricePrimary = (event: React.ChangeEvent<HTMLInputElement>) => {
      setManageSelectedArticle((prev:ProductData) => ({
        ...prev,
        price_primary: event.target.value
      }))      
    }
    const handlePriceSecondary = (event: React.ChangeEvent<HTMLInputElement>) => {
      setManageSelectedArticle((prev:ProductData) => ({
        ...prev,
        price_secondary: event.target.value
      }))
    }
    const handleGroup = (event:string) => {
      const filteredGroupSelected = groupsBusiness.filter((val) => {
        if(val.name === event) return val
      })[0]
      console.log("filteredGroupSelected: ", filteredGroupSelected)
      setManageSelectedGroup(filteredGroupSelected)
    }
    useEffect(() => {
      setManageSelectedArticle(selectedArticle)
      const filteredGroupInitial = groupsBusiness.filter((val) => {
        if(val.id === selectedArticle.id_group) return val
      })[0]
      setManageSelectedGroup(filteredGroupInitial)
    }, [selectedArticle, hiddenPanel])

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
            {selectedArticle.product ? "Editar" : "Crear" }
            </h3>
          </Box>
          
          <Box className={classes.customBoxColumn}>
            <Box className={classes.customBoxRow}>
              <TextField
                id={String(manageSelectedArticle.id)}
                label="Nombre"
                // inputRef={lastInputRef}
                value={manageSelectedArticle.product}
                onChange={handleProduct}
                maxRows={1}
                size="small"
                className={classes.inputMainData}
              />
            </Box>
            <Box className={classes.customBoxRow}>
              <TextField
                  id={String(manageSelectedArticle.id)}
                  label="Precio"
                  // inputRef={lastInputRef}
                  value={manageSelectedArticle.price_primary}
                  onChange={handlePricePrimary}
                  maxRows={1}
                  size="small"
                  className={classes.inputMainData}
              />
            </Box>
            <Box className={classes.customBoxRow}>
              <TextField
                  id={String(manageSelectedArticle.id)}
                  label="Precio MobilePay/Revolut"
                  // inputRef={lastInputRef}
                  value={manageSelectedArticle.price_secondary || ""} 
                  onChange={handlePriceSecondary}
                  maxRows={1}
                  size="small"
                  className={classes.inputMainData}
                  InputProps={{
                      className: classes.inputClassName,
                      inputProps: {maxLength: 30}
                  }}
              />
            </Box>
            <Box className={classes.customBoxRow}>
              <TextField 
                label="Grupo"
                size="small"
                select
                className={classes.inputMainData}
                InputProps={{className: classes.inputClassName}}
                // value={manageSelectedGroup?.name || "-"}
                value={manageSelectedGroup?.name || "-"}
                
                onChange={ (event:any) => handleGroup(event.target.value) }
                // onChange={ (handleGroup}
              >
                {groupsBusiness.map((group: GroupData, index: number) => (
                    <MenuItem 
                      key={group.id} 
                      value={group.name}
                      sx={{ justifyContent: "space-between" }}
                    >
                        {group.name}
                    </MenuItem>
                ))}
              </TextField>
              <AddButton
              // clicked={() => setOpenOptionSubModal({manageGroupSubModal: false})}
              // clicked={() => alert("button")}
                clicked={() => setOpenOptionSubModal((prevOpenOptionSubModal: any) => ({
                  ...prevOpenOptionSubModal,
                  manageGroupSubModal: false,
                }))}
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
              clicked={() => alert("pepi")}
            />
          </Box>

        </Box>
      </Modal>
      // </div>
    )
}