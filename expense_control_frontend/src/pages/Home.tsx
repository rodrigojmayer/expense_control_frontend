/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState, useEffect } from "react";
import { ProductData, GroupData, ArticleCartData } from '../types';
import useLogout from "../hooks/useLogout";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useStylesGlobal } from '../Styles'
import BusinessMenuModal from "../components/BusinessMenuModal";
import PaymentMethodMenuModal from "../components/PaymentMethodMenuModal";
import ArticlesMenuModal from "../components/ArticlesMenuModal";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ProductsContext } from '../context/ProductsContext';
import { GroupsContext } from "../context/GroupsContext";
import CartMenuModal from "../components/CartMenuModal";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const business = [
  "Agustin", "Belen", "Cande", "Facha Gaucha"
]
const paymentMethods = [
  "MobilePay", "Cash", "Revolut"
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
}

function Home() {
  const { classes } = useStylesGlobal();
  const { setUser, INITIAL_USER } = useContext<any>(UserContext)
  const { products } = useContext<any>(ProductsContext); 
  const { groups } = useContext<any>(GroupsContext); 

  const logout = useLogout();
  const navigate = useNavigate();
  const [openOptionModal, setOpenOptionModal] = useState<any>(INITIAL_MODAL_OPTIONS);
  const [optionSelected, setOptionSelected] = useState<any>(INITIAL_SELECTED_OPTIONS);
  const [routeSelected, setRouteSelected] = useState<any>(<><Typography variant="body2"><a>Inicio</a></Typography></>);
  const [routeArrowBack, setRouteArrowBack] = useState<any>(<></>);
  const [productsBusiness, setProductsBusiness] = useState<ProductData[]>([]);
  const [groupsByBusiness, setGroupsByBusiness] = useState<GroupData[]>([]);
  const [articlesCart, setArticlesCart] = useState<ArticleCartData[]>([]);
  const [articlesCartNumber, setArticlesCartNumber] = useState<string>("");
  
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
    setRouteSelected(<><Typography variant="body2"><a>Inicio</a></Typography></>)
    setRouteArrowBack(<></>)
  })

  const selectBusiness:any = ((option:number) => {
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
    setRouteSelected(<><Typography variant="body2"><a onClick={() =>selectHome()}>Inicio/</a>{`${business[option]}`} </Typography></>)
    setRouteArrowBack(
      <>
        <ArrowBackIcon onClick={() =>selectHome()} className={classes.arrowBack}/>
      </>
    )
    const productsFiltered = products.filter((product: ProductData) => {
      if(product.id_client === option) 
        return product
    })
    setProductsBusiness(productsFiltered)
    const groupsFiltered = groups.filter((group: GroupData) => {
      if(group.id_client === option || group.id === 0) 
        return group
    }).sort((a: GroupData,b: GroupData) => a.name.localeCompare(b.name))
    setGroupsByBusiness(groupsFiltered)
    setArticlesCart([])
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
    setRouteSelected(<><Typography variant="body2"><a onClick={() =>selectHome()}>Inicio/</a><a onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))}>{`${optionSelected.businessMenuSelected}`}/</a>{`${paymentMethods[option]}`} </Typography></>)
    setRouteArrowBack(
      <>
        <ArrowBackIcon onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))} className={classes.arrowBack}/>
      </>
    )
  })

  const selectCart:any = (() => {
    if(articlesCart.length > 0){
      setOpenOptionModal((prevState:any) => ({
        ...prevState,
        paymentMethodMenuModal:true,
        articlesMenuModal:true,
        businessMenuModal:true,    
        cartMenuModal: false,
      }))
      setRouteSelected(<><Typography variant="body2"><a onClick={() =>selectHome()}>Inicio/</a><a onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))}>{`${optionSelected.businessMenuSelected}`}/</a><a onClick={() =>selectPayment(paymentMethods.indexOf(optionSelected.paymentMethodMenuSelected))}>{optionSelected.paymentMethodMenuSelected}/</a> </Typography></>)
      setRouteArrowBack(
        <>
          <ArrowBackIcon onClick={() =>selectPayment(paymentMethods.indexOf(optionSelected.paymentMethodMenuSelected))} className={classes.arrowBack}/>
        </>
      )
    }
  })

  useEffect(() => {
    if(products){
      const productsFiltered = products.filter((product: ProductData) => {
        if(product.id_client === optionSelected.idBusinessMenuSelected) 
          return product
      })
      setProductsBusiness(productsFiltered);
    }
  }, [products])

  useEffect(() => {
    if(groups){
      setGroupsByBusiness([])
      const groupsFiltered = groups.filter((group: ProductData) => {
        if(group.id_client === optionSelected.idBusinessMenuSelected || group.id === 0) 
          return group
      }).sort((a: GroupData,b: GroupData) => a.name.localeCompare(b.name))
      setGroupsByBusiness(groupsFiltered)
    }
  }, [groups])

  useEffect(() => {
    const updatedArticlesCartNumber = articlesCart.reduce((acu: number, obj: ArticleCartData) => (obj.multiplier? obj.multiplier + acu: 0 ), 0).toString() 
    setArticlesCartNumber(updatedArticlesCartNumber !== "0" ? updatedArticlesCartNumber : "")

    if(articlesCart.length === 0 && !openOptionModal.cartMenuModal){
      setOpenOptionModal((prevState:any) => ({
        ...prevState,
        paymentMethodMenuModal:true,
        articlesMenuModal:false,
        businessMenuModal:true,    
        cartMenuModal: true,
      }))
      setRouteSelected(<><Typography variant="body2"><a onClick={() =>selectHome()}>Inicio/</a><a onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))}>{`${optionSelected.businessMenuSelected}`}/</a>{optionSelected.paymentMethodMenuSelected} </Typography></>)
      setRouteArrowBack(
        <>
          <ArrowBackIcon onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))} className={classes.arrowBack}/>  
        </>
      )
    }
  }, [articlesCart])

  return (
    <div className={classes.AppDiv}>
      {routeSelected}
      <Box className={`${classes.customBoxRow} ${classes.customBoxRowArrow}`}>
        {routeArrowBack}
        <Box 
          className={classes.customShoppingCar} 
          hidden={openOptionModal.articlesMenuModal}
          onClick={() => selectCart()}
        >
          <Box  className={classes.cartNumberArticles}>
            {articlesCartNumber}
          </Box>
          <ShoppingCartIcon
            className={classes.customShoppingCartIcon}
          />
        </Box>  
      </Box>
      <BusinessMenuModal
        hiddenPanel={openOptionModal.businessMenuModal}
        selectBusiness={selectBusiness}
        signOut={signOut}
      />
      <PaymentMethodMenuModal
        hiddenPanel={openOptionModal.paymentMethodMenuModal}
        selectPayment={selectPayment}
      />
      <ArticlesMenuModal
        hiddenPanel={openOptionModal.articlesMenuModal}
        optionSelected={optionSelected}
        setArticlesCart={setArticlesCart}
        productsBusiness={productsBusiness}
        groupsByBusiness={groupsByBusiness}
      />
      <CartMenuModal
        hiddenPanel={openOptionModal.cartMenuModal}
        optionSelected={optionSelected}
        articlesCart={articlesCart}
        setArticlesCart={setArticlesCart}
      />
      
    </div>
  )
}
export default Home