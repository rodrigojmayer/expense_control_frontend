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
  idBusinessMenuSelected: NaN,
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
  const [groupsByBusiness, setGroupsByBusiness] = useState<GroupData[]>([]);
  
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
      idBusinessMenuSelected: option,
      businessMenuSelected:business[option],
    }))
    setRouteSelected(<><Typography variant="body2"><a onClick={() =>selectHome()}>Home/</a>{`${business[option]}`} </Typography><ArrowBackIcon onClick={() =>selectHome()} className={classes.arrowHome}/></>)
    const productsFiltered = products.filter((product: ProductData) => {
      if(product.id_client === option) 
        return product
    })
    console.log("productsFiltered: ", productsFiltered)
    setProductsBusiness(productsFiltered)
    const groupsFiltered = groups.filter((group: GroupData) => {
      if(group.id_client === option || group.id === 0) 
        return group
    }).sort((a: GroupData,b: GroupData) => a.name.localeCompare(b.name))
    setGroupsByBusiness(groupsFiltered)
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
    setRouteSelected(<><Typography variant="body2"><a onClick={() =>selectHome()}>Home/</a><a onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))}>{`${optionSelected.businessMenuSelected}`}/</a>{`${paymentMethods[option]}`} </Typography><ArrowBackIcon onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))} className={classes.arrowHome}/></>)
  })
  const selectArticles: any = (() => {
    alert("article asdf")
  })

  useEffect(() => {
    // const productsFiltered = products.filter((product: ProductData) => {
    //   if(product._id === productsBusiness._id) 
    //     return product
    // })
    // console.log("home useEffect products: ", products)
    // setProductsBusiness(productsFiltered)
    if(products){
      const updatedProducts = productsBusiness.map((businessProduct) => {
        // Find the corresponding product in the `products` list
        const matchingProduct = products.find((product:ProductData) => product?._id === businessProduct?._id);
        // If a matching product is found, use it; otherwise, keep the original
        
        // console.log("home useEffect matchingProduct: ", matchingProduct)
        // console.log("home useEffect businessProduct: ", businessProduct)
        // return matchingProduct || businessProduct;
        return matchingProduct ;
      });
      
      setProductsBusiness(updatedProducts);
    }
  }, [products])

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
              optionSelected={optionSelected}
              selectArticles={selectArticles}
              productsBusiness={productsBusiness}
              groupsByBusiness={groupsByBusiness}
            />
            
            <Box className={classes.customBoxRow}>
              <input type="button" value="Log out" onClick={signOut}/>
            </Box>
          </div>
  )
}
export default Home