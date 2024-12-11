/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import dayjs, { Dayjs } from 'dayjs';// Import dayjs
import { useContext, useEffect, useState } from 'react';
import { Box,
         Modal,
         TextField,
        } from "@mui/material";
import { useStylesGlobal } from '../Styles'
import { GroupData, ProductData } from '../types';
import { CancelButton, DeleteButton, OkButton } from './Buttons';
import SaveChanges from './SaveChanges';
import ErrorModal from './ErrorModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { IsLoadingContext } from '../context/IsLoadingContext';

interface GroupSelectedType {
  _id?:string
  id:  number
  name: string
}

interface ChildProps {
    hiddenPanel:  boolean
    close: any
    optionSelected: any
    groupSelected: GroupSelectedType
    setGroupSelected: (newData: any) => void
    openOptionSubModal: any
}

export default function ManageGroupSubModal(
    {   
        hiddenPanel, 
        close,
        optionSelected,
        groupSelected,
        setGroupSelected,
        openOptionSubModal
    }: ChildProps )  {

    const { classes } = useStylesGlobal();
    const { setIsLoading } = useContext<any>(IsLoadingContext) 
    const [manageGroup, setManageGroup] = useState<any>({})
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
          if(!groupSelected?._id)
            bodyUpdate.id_client = optionSelected.idBusinessMenuSelected
          if(!groupSelected?._id || groupSelected?.name != manageGroup.name)
            bodyUpdate.name = manageGroup.name
        }
        const fetchManageArticle = async () => {
            
          let loadingSuccess: boolean = false
          try {
            const manage_group = manageGroup._id
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
            
          }
        } 
        const changeDetected = (obj:object) => Object.keys(obj).length > 0
        if(changeDetected(bodyUpdate))
          fetchManageArticle()
        close()
      }
      setOpenSaveChanges(false);
    }

    const handleCloseErrorModal = () => {
      setOpenErrorModal(false)
    }

    const handleOpenSaveChanges = () => {
      if(manageGroup.name===""){
        setOpenErrorModal(true)
        setErrorData("missing_data")
      }
      else{
          setOpenSaveChanges(true);
      }
    }
    
    const handleCloseConfirmDeleteModal = (ans?:boolean) => {
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
        setManageGroup(groupSelected)
      } else {
        setManageGroup({_id: "", id:0, name: ""})
      }
    }, [hiddenPanel])
    
    return (
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
          />
          <Box className={classes.customBoxRow}>
            <h3>
              {manageGroup._id ? "Editar" : "Crear" } grupo
            </h3>
          </Box>
          
          <Box className={classes.customBoxColumn}>
            <Box className={classes.customBoxRow}>
            <TextField
                label="Nombre"
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
              clicked={close}
            />
            <OkButton
              clicked={() => handleOpenSaveChanges()}
            />
          </Box>
        </Box>
      </Modal>
    )
}