/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { ProductData, GroupData } from '../types';
import useLogout from "../hooks/useLogout";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal, modalLoginInternal  } from '../Styles'
import BusinessMenuModal from "../components/BusinessMenuModal";
import PaymentMethodMenuModal from "../components/PaymentMethodMenuModal";
import ArticlesMenuModal from "../components/ArticlesMenuModal";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProductsContext } from '../context/ProductsContext';
import { GroupsContext } from "../context/GroupsContext";

const business = [
  "Agustin", "Belen", "Cande", "Facha Gaucha"
]
const paymentMethods = [
  "MobilePay", "Cash", "Revolut", "Facha Gaucha"
]
const INITIAL_MODAL_OPTIONS:any = {
  businessMenuModal: false,  
  paymentMethodMenuModal: true,
  articlesMenuModal: true,    
  cartMenuModal: true,
}
const INITIAL_SELECTED_OPTIONS:any = {
  businessMenuSelected: "",  
  paymentMethodMenuSelected: "",
  articlesMenuSelected: [],    
  // cartMenuSelected: true,
}

function Home() {
  const { classes } = useStylesGlobal();
  const { user, setUser, INITIAL_USER } = useContext<any>(UserContext)
  const { products } = useContext<any>(ProductsContext); 
  const { groups } = useContext<any>(GroupsContext); 

  const logout = useLogout();
  const navigate = useNavigate();
  const [openOptionModal, setOpenOptionModal] = useState<any>(INITIAL_MODAL_OPTIONS);
  const [optionSelected, setOptionSelected] = useState<any>(INITIAL_SELECTED_OPTIONS);
  const [routeSelected, setRouteSelected] = useState<any>(<a>Home</a>);
  const [productsBusiness, setProductsBusiness] = useState<ProductData[]>([]);
  const [groupsBusiness, setGroupsBusiness] = useState<GroupData[]>([]);
  
  const signOut = async() => {

    try {
        await logout()
        setUser(INITIAL_USER)
    } catch (error: unknown) {
        console.error('Logout error: ', error)
    } finally {
        navigate('/login')
    }
  }

  const selectHome:any = (() => {
    setOpenOptionModal(INITIAL_MODAL_OPTIONS)
    setOptionSelected(INITIAL_SELECTED_OPTIONS)
    setRouteSelected(<a>Home</a>)
  })


  const selectBusiness:any = ((option:number) => {
    // const updatedOptions = { ...openOptionModal }
    // updatedOptions.businessMenuModal=true
    setOpenOptionModal((prevState:any) => ({
      ...prevState,
      businessMenuModal:true,
      paymentMethodMenuModal:false,  
      articlesMenuModal: true,    
      cartMenuModal: true,
    }))
    setOptionSelected((prevState:any) => ({
      ...prevState,
      businessMenuSelected:business[option],
    }))
    setRouteSelected(<><Typography variant="body2"><a onClick={() =>selectHome()}>Home/</a>{`${business[option]}`} </Typography><ArrowBackIcon onClick={() =>selectHome()}/></>)
    const productsFiltered = products.filter((product: ProductData) => {
      if(product.id_client === option) 
        return product
    })
    setProductsBusiness(productsFiltered)
    const groupsFiltered = groups.filter((group: GroupData) => {
      if(group.id_client === option) 
        return group
    })
    setGroupsBusiness(groupsFiltered)
  })
  const selectPayment:any = ((option:number) => {
    
    setOpenOptionModal((prevState:any) => ({
      ...prevState,
      paymentMethodMenuModal:true,
      articlesMenuModal:false,
      businessMenuModal:true,    
      cartMenuModal: true,
    }))
    setOptionSelected((prevState:any) => ({
      ...prevState,
      paymentMethodMenuSelected:paymentMethods[option],
    }))
    setRouteSelected(<><Typography variant="body2"><a onClick={() =>selectHome()}>Home/</a><a onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))}>{`${optionSelected.businessMenuSelected}`}/</a>{`${paymentMethods[option]}`} </Typography><ArrowBackIcon onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))}/></>)
  })
  const selectArticles: any = (() => {
    alert("article asdf")
  })


  return (
          <div className={classes.AppDiv}>
              {routeSelected}
            <BusinessMenuModal
              hiddenPanel={openOptionModal.businessMenuModal}
              selectBusiness={selectBusiness}
            />
            <PaymentMethodMenuModal
              hiddenPanel={openOptionModal.paymentMethodMenuModal}
              selectPayment={selectPayment}
            />
            <ArticlesMenuModal
              hiddenPanel={openOptionModal.articlesMenuModal}
              selectArticles={selectArticles}
              productsBusiness={productsBusiness}
              groupsBusiness={groupsBusiness}
            />
            
            <Box className={classes.customBoxRow}>
              <input type="button" value="Log out" onClick={signOut}/>
            </Box>
          </div>
  )
}
export default Home