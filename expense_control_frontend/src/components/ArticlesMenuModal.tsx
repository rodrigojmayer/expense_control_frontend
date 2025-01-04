/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import dayjs, { Dayjs } from 'dayjs';// Import dayjs
import { useEffect, useState } from 'react';
import { Box,
         Typography,
        } from "@mui/material";
import { useStylesGlobal } from '../Styles'
import { ProductData, GroupData, ArticleCartData } from '../types';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddArticleSubModal from "./AddArticleSubModal";
import ManageArticleSubModal from './ManageArticleSubModal';
import { AddButton, EditButton } from './Buttons';
import ManageGroupSubModal from './ManageGroupSubModal';

interface ChildProps {
  hiddenPanel:  boolean
  optionSelected: any 
  setArticlesCart: React.Dispatch<React.SetStateAction<ArticleCartData[]>>
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
  const { classes } = useStylesGlobal();
  const [productsBusinessShow, setProductsBusinessShow] = useState<ProductData[]>([]);
  const [groupSelected, setGroupSelected] = useState<GroupSelectedType>({_id: "", id:0, name: ""});
  const [openOptionSubModal, setOpenOptionSubModal] = useState<any>({addArticleSubModal:true, manageArticleSubModal:true, manageGroupSubModal: true});
  const [selectedArticle, setSelectedArticle] = useState<any>({});

  const selectGroup = (group_id: string, groupId: number, groupName:string) => {
    setGroupSelected({_id: group_id, id: groupId, name: groupName})
    
  } 
  useEffect(() => {
    const productsFilter = productsBusiness.filter((product:ProductData) => product?.id_group === groupSelected?.id)
    setProductsBusinessShow(productsFilter)
  }, [groupSelected, productsBusiness])
  useEffect(() => {
    if(groupSelected?._id){
      const groupFilter = groupsByBusiness
        .filter((group) => group._id === groupSelected?._id)
        .map((group) => ({
          _id: group._id,
          id: group.id || 0,
          name: group.name
        }))[0]
      setGroupSelected(groupFilter)
    }
  }, [groupsByBusiness])
  useEffect(() => {
    setGroupSelected({_id:"", id:0, name: ""})
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
    if(openOptionSubModal.addArticleSubModal)
      setSelectedArticle({})
  }, [openOptionSubModal.addArticleSubModal])

  const shortName = ((name: string, maxChar: number) => {
    const parts = name.split(/[/\s]+/)
    const limitedParts = parts.slice(0, 3)
    return(
      <>
        {limitedParts.map((part, index) => (
          <React.Fragment key={index}>
            {part.length > maxChar ? part.slice(0, maxChar) + "..." : part}
            {index < parts.length - 1 }
            {index < parts.length - 1 && index < 2 && <br />}
          </React.Fragment>
        ))}
        {parts.length > 3 && " ..."}
      </>
    )  
  })

  return (
    <div
      hidden= {hiddenPanel}
    >
    <Box className={`${classes.customBoxRow} ${classes.customBoxRowArticlesHeader}`}>
      <h2>
        Artículos
      </h2>        
      <AddButton
        clicked={() => setOpenOptionSubModal((prevOpenOptionSubModal: any) => ({
          ...prevOpenOptionSubModal,
          manageArticleSubModal: false,
        }))}
      />
    </Box>
      <Box className={`${ groupSelected?.id === 0 || classes.customBoxProducts}`}>
        <Box className={classes.customBoxProductsHeader} 
          sx={{
            display: (groupSelected?.id === 0) ? "none !important" : "block",
          }} 
        >
          <ArrowBackIcon 
          className={` ${classes.buttonHoverPointer}`}
            onClick={() =>selectGroup("", 0, "")}
            sx={{display: "block" }}
          />
          <Typography align="center" 
            alignItems="center"
            sx={{color: "white", marginTop: 1}}
          >
              {shortName(groupSelected?.name, 15)}
          </Typography>
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
        <Box className={classes.customBoxArticles} >
          { groupSelected?.id === 0 && 
            groupsByBusiness
            .filter((group: GroupData) => group.name !== "-")
            .map((group: GroupData) => (
                <Box 
                className={`${classes.customBoxGroup}  ${classes.buttonHoverPointer}`}
                key={group._id}
                  onClick={() =>selectGroup(group._id || "", group.id || 0, group.name || "")}
                  sx={{
                    fontSize: (group.name && group.name.length > 8) ? "16px" : "22px",   
                  }}
                >
                  {shortName(group.name, 11)}
                </Box>
              )
            )
          }
          {
            productsBusinessShow.map((product: ProductData) => (
                <Box 
                  className={`${classes.customBoxProduct} ${classes.buttonHoverPointer} ${classes.buttonHoverPointerFontSize}`}
                  key={product._id}
                  onClick={() =>selectArticle(product)}
                  sx={{
                    fontSize: (product.product && product.product.length > 8) ? "16px" : "22px",   
                    height: (product.id_group === 0) ? "100px" : "85px", 
                    width: (product.id_group === 0) ? "100px" : "85px", 
                  }}
                >
                  {shortName(product.product, 8)}
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
        optionSelected={optionSelected}
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
        setGroupSelected = {setGroupSelected}
        openOptionSubModal={openOptionSubModal}
      />
    </div>
  )
}