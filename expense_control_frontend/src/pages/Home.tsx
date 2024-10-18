/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState, useEffect } from "react";
import useLogout from "../hooks/useLogout";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useStylesGlobal, modalStyleSaveExternal, modalStyleErrorInternal, modalLoginInternal  } from '../Styles'
import BusinessMenuModal from "../components/BusinessMenuModal";
import PaymentMethodMenuModal from "../components/PaymentMethodMenuModal";
import ArticlesMenuModal from "../components/ArticlesMenuModal";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  
  const logout = useLogout();
  const navigate = useNavigate();
  const [openOptionModal, setOpenOptionModal] = useState<any>(INITIAL_MODAL_OPTIONS);
  const [optionSelected, setOptionSelected] = useState<any>(INITIAL_SELECTED_OPTIONS);
  const [routeSelected, setRouteSelected] = useState<any>(<p>Home</p>);

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
    setRouteSelected(<p>Home</p>)
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
    setRouteSelected(<p><Typography variant="body2"><a onClick={() =>selectHome()}>Home/</a>{`${business[option]}`} </Typography><ArrowBackIcon onClick={() =>selectHome()}/></p>)
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
    setRouteSelected(<p><Typography variant="body2"><a onClick={() =>selectHome()}>Home/</a><a onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))}>{`${optionSelected.businessMenuSelected}`}/</a>{`${paymentMethods[option]}`} </Typography><ArrowBackIcon onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))}/></p>)
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
            />
            
            <Box className={classes.customBoxRow}>
              <input type="button" value="Log out" onClick={signOut}/>
            </Box>
          </div>
  )
}
export default Home