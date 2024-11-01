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
import { AddButton, CancelButton, DeleteButton, EditButton, OkButton } from './Buttons';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import ErrorModal from './ErrorModal';
import SaveChanges from './SaveChanges';
import { IsLoadingContext } from '../context/IsLoadingContext';
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
    optionSelected: any
    selectedArticle: ProductData
    setOpenOptionSubModal: (newData: any) => void
    // selectPayment: (newData: number) => void
    groupsByBusiness: GroupData[]
}


export default function ManageArticleSubModal(
    {   
        hiddenPanel, 
        close,
        optionSelected,
        selectedArticle,
        setOpenOptionSubModal,
        // selectPayment
        groupsByBusiness
    }: ChildProps )  {
    // const breakpointLG = useMediaQuery('(min-width:1024px)')
    const { classes } = useStylesGlobal();
    const { setIsLoading } = useContext<any>(IsLoadingContext) 
    const [manageSelectedArticle, setManageSelectedArticle] = useState<ProductData>(selectedArticle)
    const [manageSelectedGroup, setManageSelectedGroup] = useState<GroupData | any>({})
    
    const [openSaveChanges, setOpenSaveChanges] = useState(false); 
    const [openErrorModal, setOpenErrorModal] = useState(false);  
    const [messageBeforeSave, setMessageBeforeSave] = useState("");  
    const [errorData, setErrorData] = useState("");  
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);  
    
    const handleCloseSaveChanges = (ans?:boolean, deletion?:boolean) => {
      if(ans){
        const bodyUpdate: ProductData|any = {}
        if(deletion){
          bodyUpdate.deleted = true
        } 
        else {
          if(!selectedArticle._id)
            bodyUpdate.id_client = optionSelected.idBusinessMenuSelected
          if(!selectedArticle._id || selectedArticle.product != manageSelectedArticle.product)
              bodyUpdate.product = manageSelectedArticle.product
          if(!selectedArticle._id || selectedArticle.id_group != manageSelectedArticle.id_group)
              bodyUpdate.id_group = manageSelectedArticle.id_group
          if(!selectedArticle._id || selectedArticle.price_primary != manageSelectedArticle.price_primary)
              bodyUpdate.price_primary = manageSelectedArticle.price_primary
          if(!selectedArticle._id || selectedArticle.price_secondary != manageSelectedArticle.price_secondary)
              bodyUpdate.price_secondary = manageSelectedArticle.price_secondary
          if(!selectedArticle._id || selectedArticle.id_group != manageSelectedGroup.id)
            bodyUpdate.id_group = manageSelectedGroup.id
        }

        const fetchManageArticle = async () => {
            
          let loadingSuccess: boolean = false
          try {
            const manage_article = (selectedArticle._id ? selectedArticle._id : "")
            const manage_method = (selectedArticle._id ? 'PATCH' : 'POST')
            const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/products/${manage_article}`, {
              method: manage_method,
              headers: {
                  'Content-Type': 'application/json', // Set the appropriate content-type for my API
                  // Add any other requires headers here
              },
              body:JSON.stringify(bodyUpdate)
            })
            // Check if the response status is successful
            if (response.ok) {
              const responseData = await response.json() // parse the response data
              loadingSuccess = true
            } else {
              // Handle non-successful responses
              console.error('Request failed: ', response.status, response.statusText)
              console.error('response: ', response)
              // Handle the error here
            }
          } catch (error: unknown) {
            if (typeof error === 'string') {
              // 'error' is now narrowed down to type 'string'
              console.error('Error:', error)
            } else if (error instanceof Error) {
              // 'error' is now narrowed down to type 'Error'
              console.error('Error object:', error.message)
            } else {
              // Handle other cases as needed
            }
          } finally {
            setIsLoading((prevLoading: any) => ({
              ...prevLoading,
              products: loadingSuccess,
            }));
            
            // setCheckListStock([])
          }
        } 
        const changeDetected = (obj:object) => Object.keys(obj).length > 0
        console.log("changeDetected(bodyUpdate: ", changeDetected(bodyUpdate))
        if(changeDetected(bodyUpdate))
          fetchManageArticle()
        close()
      }
      setOpenSaveChanges(false);
      setOpenOptionSubModal((prevOpenOptionSubModal: any) => ({
        ...prevOpenOptionSubModal,
        addArticleSubModal: true,
      }))
    }
    
    const handleCloseErrorModal = () => {
        setOpenErrorModal(false)
    }

    const handleOpenSaveChanges = () => {
      if(manageSelectedArticle.product===""){
        setOpenErrorModal(true)
        setErrorData("missing_data")
      }else if(!manageSelectedArticle.price_primary){
        setOpenErrorModal(true)
        setErrorData("missing_data_price_primary")
      }
      else{
          setOpenSaveChanges(true);
      }
    }
    
    const handleCloseConfirmDeleteModal = (ans?:boolean) => {
      console.log("handleCloseConfirmDeleteModal ans: ", ans)
      if(ans){
        setManageSelectedArticle((prev: ProductData) => ({
          ...prev,
          deleted: true
        }))
        handleCloseSaveChanges(true, true)
      }
      setOpenConfirmDeleteModal(false)
    }

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
      const filteredGroupSelected = groupsByBusiness.filter((val) => {
        if(val.name === event) return val
      })[0]
      setManageSelectedGroup(filteredGroupSelected)
    }
    useEffect(() => {
      setManageSelectedArticle(selectedArticle)
      const filteredGroupInitial = groupsByBusiness.filter((val) => {
        if(val.id === selectedArticle.id_group) return val
      })[0] || {id:0}
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
          <SaveChanges
              openSaveChanges={openSaveChanges}
              closeSaveChanges={handleCloseSaveChanges} 
              messageBeforeSave={messageBeforeSave}
          />
          <ErrorModal
              openErrorModal={openErrorModal}
              closeErrorModal={handleCloseErrorModal}
              errorData={errorData} 
          />
          <ConfirmDeleteModal
              openConfirmDeleteModal={openConfirmDeleteModal}
              closeConfirmDeleteModal={handleCloseConfirmDeleteModal}
              // source={"stock"}
              // data={stockNameTemp} 
              // confirmDelete={handleConfirmDelete}
              
          />
          <Box className={classes.customBoxRow}>
            <h3>
            {selectedArticle._id ? "Editar" : "Crear" }
            </h3>
          </Box>
          
          <Box className={classes.customBoxColumn}>
            <Box className={classes.customBoxRow}>
              <TextField
                id={String(manageSelectedArticle.id)}
                label="Nombre*"
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
                  label="Precio*"
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
                {groupsByBusiness.map((group: GroupData, index: number) => (
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
          <Box className={`${classes.customBoxRow} ${classes.customBoxRowButtons}`}>
            {
              (selectedArticle._id) &&
                <DeleteButton
                  clicked={() => setOpenConfirmDeleteModal(true)}
                />
            }
            
            <CancelButton
              // clicked={() => handleOpenEditStock()}
              clicked={close}
            />
            <OkButton
              // clicked={() => handleOpenEditStock()}
              clicked={() => handleOpenSaveChanges()}
            />
          </Box>

        </Box>
      </Modal>
      // </div>
    )
}