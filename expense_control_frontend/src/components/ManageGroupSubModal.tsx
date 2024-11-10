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
import SaveChanges from './SaveChanges';
import ErrorModal from './ErrorModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
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

interface GroupSelectedType {
  _id?:string
  id:  number
  name: string
}

interface ChildProps {
    hiddenPanel:  boolean
    close: any
    optionSelected: any
    // selectedGroup?: ProductData
    groupSelected: GroupSelectedType
    setGroupSelected: (newData: any) => void
    groupsByBusiness: GroupData[]
    openOptionSubModal: any
}


export default function ManageGroupSubModal(
    {   
        hiddenPanel, 
        close,
        optionSelected,
        // selectedGroup,
        groupSelected,
        setGroupSelected,
        groupsByBusiness,
        openOptionSubModal
    }: ChildProps )  {
    // const breakpointLG = useMediaQuery('(min-width:1024px)')
    const { classes } = useStylesGlobal();
    const { setIsLoading } = useContext<any>(IsLoadingContext) 
    const [manageGroup, setManageGroup] = useState<any>({})
    const [openSaveChanges, setOpenSaveChanges] = useState(false); 
    const [openErrorModal, setOpenErrorModal] = useState(false);  
    const [messageBeforeSave, setMessageBeforeSave] = useState("");  
    const [errorData, setErrorData] = useState("");  
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);  
    // console.log("optionSelectedoptionSelected: ", optionSelected)
    // console.log("selectedGroup: ", selectedGroup)
    // console.log("groupSelected: ", groupSelected)
    const handleCloseSaveChanges = (ans?:boolean, deletion?:boolean) => {
      if(ans){
        const bodyUpdate: ProductData|any = {}
        if(deletion){
          bodyUpdate.deleted = true
        } 
        else {
          if(groupSelected?._id)
            bodyUpdate.id_client = optionSelected.idBusinessMenuSelected
          if(!groupSelected?._id || groupSelected?.name != manageGroup.name)
            bodyUpdate.name = manageGroup.name
        }
        console.log("groupSelected: ", groupSelected)
        console.log("manageGroup: ", manageGroup)
        const fetchManageArticle = async () => {
            
          let loadingSuccess: boolean = false
          try {
            // const manage_group = (manageGroup._id ? manageGroup._id : "")
            const manage_group = manageGroup._id
            // const manage_group = ("")
            const manage_method = (manageGroup._id ? 'PATCH' : 'POST')
            // const manage_method = ('POST')
            const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/groups/${manage_group}`, {
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
              groups: loadingSuccess,
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
/////// setOpenOptionSubModal((prevOpenOptionSubModal: any) => ({
///////   ...prevOpenOptionSubModal,
///////   addArticleSubModal: true,
/////// }))
    }

    const handleCloseErrorModal = () => {
      setOpenErrorModal(false)
    }

    const handleOpenSaveChanges = () => {
      // console.log("handleOpenSaveChanges manageGroup.name: ", manageGroup.name)
      if(manageGroup.name===""){
        setOpenErrorModal(true)
        setErrorData("missing_data")
      }
      else{
          setOpenSaveChanges(true);
      }
    }
    
    const handleCloseConfirmDeleteModal = (ans?:boolean) => {
      // console.log("handleCloseConfirmDeleteModal ans: ", ans)
      if(ans){
        setManageGroup((prev: ProductData) => ({
          ...prev,
          deleted: true
        }))
        handleCloseSaveChanges(true, true)
        setGroupSelected({_id: "", id:0, name: ""})
      }
      setOpenConfirmDeleteModal(false)
    }

    useEffect(() => {
      if(openOptionSubModal.manageArticleSubModal){
        // console.log("edit")
        setManageGroup(groupSelected)
      } else {
        // console.log("create")
        setManageGroup({_id: "", id:0, name: ""})
      }
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
              {manageGroup._id ? "Editar" : "Crear" } grupo
            </h3>
          </Box>
          
          <Box className={classes.customBoxColumn}>
            <Box className={classes.customBoxRow}>
            <TextField
                // id={String(manageSelectedArticle.id)}
                label="Nombre"
                // inputRef={lastInputRef}
                value={manageGroup.name}
                onChange={(event) => setManageGroup((prev: any) => ({
                                    ...prev,
                                    name: event?.target.value,
                                  }))}
                maxRows={1}
                size="small"
                className={classes.inputMainData}
              />
            </Box>
          </Box>
          
         
          <Box className={classes.customBoxRow}>
            {
              (manageGroup._id) &&
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
              // clicked={() => console.log("nuevo grupo: ", manageGroup.name)}
              clicked={() => handleOpenSaveChanges()}
            />
          </Box>

        </Box>
      </Modal>
      // </div>
    )
}