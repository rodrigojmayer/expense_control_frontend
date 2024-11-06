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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddArticleSubModal from "./AddArticleSubModal";
import ManageArticleSubModal from './ManageArticleSubModal';
import { AddButton, EditButton } from './Buttons';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ManageGroupSubModal from './ManageGroupSubModal';
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
  optionSelected: any 
  setArticlesCart: (newData: number) => void
  productsBusiness: ProductData[]
  groupsByBusiness: GroupData[]
}
interface GroupSelectedType {
    _id?:string
    id:  number
    name: string
}

export default function ArticlesMenuModal(
    {   
        hiddenPanel, 
        optionSelected,
        setArticlesCart,
        productsBusiness,
        groupsByBusiness
    }: ChildProps )  {
    // const breakpointLG = useMediaQuery('(min-width:1024px)')
    const { classes } = useStylesGlobal();
    const [productsBusinessShow, setProductsBusinessShow] = useState<ProductData[]>([]);
    const [groupSelected, setGroupSelected] = useState<GroupSelectedType>({id:0, name: ""});
    const [openOptionSubModal, setOpenOptionSubModal] = useState<any>({addArticleSubModal:true, manageArticleSubModal:true, manageGroupSubModal: true});
    const [selectedArticle, setSelectedArticle] = useState<any>({});
    

    const selectGroup = (groupId: number, groupName:string) => {
      setGroupSelected({id: groupId, name: groupName})
      
    } 
    useEffect(() => {
      // console.log("ArticlesMenuModal useEffect productsBusiness: ", productsBusiness)
      const productsFilter = productsBusiness.filter((product:ProductData) => product?.id_group === groupSelected.id)
      setProductsBusinessShow(productsFilter)
    }, [groupSelected, productsBusiness])
    useEffect(() => {
      // const productsFilter = productsBusiness.filter((product:ProductData) => product.id_group === groupSelected.id)
      setGroupSelected({id:0, name: ""})
    }, [hiddenPanel])

    const closeAddArticleSubModal = () => {
      setOpenOptionSubModal((prevOpenOptionSubModal: any) => ({
        ...prevOpenOptionSubModal,
        addArticleSubModal: true,
      }))
    }
    const closeManageArticleSubModal = () => {
      setOpenOptionSubModal((prevOpenOptionSubModal: any) => ({
        ...prevOpenOptionSubModal,
        manageArticleSubModal: true,
      }))
    }
    const closeManageGroupSubModal = () => {
      setOpenOptionSubModal((prevOpenOptionSubModal: any) => ({
        ...prevOpenOptionSubModal,
        manageGroupSubModal: true,
      }))
    }
    const selectArticle = (prod: ProductData) => {
      setOpenOptionSubModal((prevOpenOptionSubModal: any) => ({
        ...prevOpenOptionSubModal,
        addArticleSubModal: false,
      }))
      setSelectedArticle(prod)
    }

    useEffect(() => {
      console.log("selectedArticle: ", selectedArticle)
      if(openOptionSubModal.addArticleSubModal)
        setSelectedArticle({})
    }, [openOptionSubModal.addArticleSubModal])

    return (
      <div
        hidden= {hiddenPanel}
      >
      <Box className={`${classes.customBoxRow} ${classes.customBoxRowArticlesHeader}`}>
        <AddButton
          clicked={() => setOpenOptionSubModal((prevOpenOptionSubModal: any) => ({
            ...prevOpenOptionSubModal,
            manageArticleSubModal: false,
          }))}
          cusMarginTop={3}
        />
        <h2>
          Artículos
        </h2>
        <ShoppingCartIcon
          className={classes.customShoppingCartIcon}
          onClick={() =>alert("Cart modal")}
        />
      </Box>
        <Box className={`${ groupSelected.id === 0 || classes.customBoxProducts}`}>
          <Box className={classes.customBoxProductsHeader} 
            sx={{
              display: (groupSelected.id === 0) ? "none !important" : "block",
              // gridTemplateColumns: "repeat(3, 1fr)", // 3 equal columns
              // gap: 2, // Equal gap horizontally and vertically
              // width: "100%",
            }} 
          >
            <ArrowBackIcon 
              onClick={() =>selectGroup(0,"")}
              sx={{display: "block" }}
            />
            <Typography align="center" 
            alignItems="center"
             sx={{color: "white", marginTop: 1}}>{groupSelected.name}</Typography>
            <Typography
            align="right"
            >

            <EditButton
              clicked={() => setOpenOptionSubModal((prevOpenOptionSubModal: any) => ({
                ...prevOpenOptionSubModal,
                manageGroupSubModal: false,
              }))}
              cusBorder = {0}
              backgroundColor = {"transparent !important"}
              sizeIco = {"45px"}
              cusMarginTop = {0}
              
              />
              </Typography>
          </Box>
          <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // 3 equal columns
            gap: 2, // Equal gap horizontally and vertically
            width: "100%",
          }}>
            { groupSelected.id === 0 && 
              groupsByBusiness
              .filter((group: GroupData) => group.name !== "-")
              .map((group: GroupData) => (
                  <Box className={classes.customBoxGroup}
                    key={group._id}
                    onClick={() =>selectGroup(group.id || 0, group.name || "")}
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
                    onClick={() =>selectArticle(product)}
                    sx={{
                      fontSize: (product.product && product.product.length > 15) ? "16px" : "22px",   
                      height: (product.id_group === 0) ? "100px" : "85px", 
                      width: (product.id_group === 0) ? "100px" : "85px", 
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
        </Box>
        <AddArticleSubModal
          hiddenPanel={openOptionSubModal.addArticleSubModal}
          close={closeAddArticleSubModal}
          selectedArticle={selectedArticle}
          setOpenOptionSubModal={setOpenOptionSubModal}
          setArticlesCart={setArticlesCart}
        />
        <ManageArticleSubModal
          hiddenPanel={openOptionSubModal.manageArticleSubModal}
          close={closeManageArticleSubModal}
          optionSelected={optionSelected}
          selectedArticle={selectedArticle}
          setOpenOptionSubModal={setOpenOptionSubModal}
          groupsByBusiness={groupsByBusiness}
        />
        <ManageGroupSubModal
          hiddenPanel={openOptionSubModal.manageGroupSubModal}
          close={closeManageGroupSubModal}
          optionSelected={optionSelected}
          groupSelected={groupSelected}
          groupsByBusiness={groupsByBusiness}
        />
      </div>
    )
}