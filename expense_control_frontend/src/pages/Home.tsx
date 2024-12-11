/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { ProductData, GroupData, ArticleCartData } from '../types';
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
    setRouteArrowBack(
      <>
        {/* <ArrowBackIcon onClick={() =>selectPayment(paymentMethods.indexOf(optionSelected.paymentMethodMenuSelected))} className={classes.arrowBack}/> */}
      </>
    )
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
    // setRouteSelected(<><Typography variant="body2"><a onClick={() =>selectHome()}>Home/</a>{`${business[option]}`} </Typography><ArrowBackIcon onClick={() =>selectHome()} className={classes.arrowBack}/></>)
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
    // console.log("productsFiltered: ", productsFiltered)
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
    // setRouteSelected(<><Typography variant="body2"><a onClick={() =>selectHome()}>Home/</a><a onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))}>{`${optionSelected.businessMenuSelected}`}/</a>{`${paymentMethods[option]}`} </Typography><ArrowBackIcon onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))} className={classes.arrowBack}/></>)
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
      // setRouteSelected(<><Typography variant="body2"><a onClick={() =>selectHome()}>Home/</a><a onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))}>{`${optionSelected.businessMenuSelected}`}/</a><a onClick={() =>selectPayment(paymentMethods.indexOf(optionSelected.paymentMethodMenuSelected))}>{optionSelected.paymentMethodMenuSelected}/</a> </Typography><ArrowBackIcon onClick={() =>selectPayment(paymentMethods.indexOf(optionSelected.paymentMethodMenuSelected))} className={classes.arrowBack}/></>)
      setRouteSelected(<><Typography variant="body2"><a onClick={() =>selectHome()}>Inicio/</a><a onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))}>{`${optionSelected.businessMenuSelected}`}/</a><a onClick={() =>selectPayment(paymentMethods.indexOf(optionSelected.paymentMethodMenuSelected))}>{optionSelected.paymentMethodMenuSelected}/</a> </Typography></>)
      setRouteArrowBack(
        <>
          <ArrowBackIcon onClick={() =>selectPayment(paymentMethods.indexOf(optionSelected.paymentMethodMenuSelected))} className={classes.arrowBack}/>
        </>
      )
    }
  })


  // const selectArticles: any = (() => {
  //   alert("article asdf")
  // })

  useEffect(() => {
    // const productsFiltered = products.filter((product: ProductData) => {
    //   if(product._id === productsBusiness._id) 
    //     return product
    // })
    // console.log("home useEffect products: ", products)
    // setProductsBusiness(productsFiltered)
    if(products){
      // console.log("home useEffect products: ", products)
      // const updatedProducts = productsBusiness.map((businessProduct) => {
      //   // Find the corresponding product in the `products` list
      //   const matchingProduct = products.find((product:ProductData) => product?._id === businessProduct?._id);
      //   // If a matching product is found, use it; otherwise, keep the original
        
      //   console.log("home useEffect matchingProduct: ", matchingProduct)
      //   console.log("home useEffect businessProduct: ", businessProduct)
      //   // return matchingProduct || businessProduct;
      //   return matchingProduct ;
      // });
      // console.log("home useEffect productsBusiness: ", productsBusiness)
      // console.log("home useEffect updatedProducts: ", updatedProducts)
      
      // setProductsBusiness(updatedProducts);
      
      const productsFiltered = products.filter((product: ProductData) => {
        if(product.id_client === optionSelected.idBusinessMenuSelected) 
          return product
      })
      setProductsBusiness(productsFiltered);
    }
  }, [products])

  useEffect(() => {
    if(groups){
      // console.log("Home useEffect groups")
      // const updatedGroups = groupsByBusiness.map((businessGroup) => {
      //   const matchingGroup = groups.find((group:GroupData) => group?._id === businessGroup?._id);
      //   return matchingGroup ;
      // });
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
      // setRouteSelected(<><Typography variant="body2"><a onClick={() =>selectHome()}>Home/</a><a onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))}>{`${optionSelected.businessMenuSelected}`}/</a>{optionSelected.paymentMethodMenuSelected} </Typography><ArrowBackIcon onClick={() =>selectPayment(paymentMethods.indexOf(optionSelected.paymentMethodMenuSelected))} className={classes.arrowBack}/></>)
      setRouteSelected(<><Typography variant="body2"><a onClick={() =>selectHome()}>Inicio/</a><a onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))}>{`${optionSelected.businessMenuSelected}`}/</a>{optionSelected.paymentMethodMenuSelected} </Typography></>)
      setRouteArrowBack(
        <>
          <ArrowBackIcon onClick={() =>selectBusiness(business.indexOf(optionSelected.businessMenuSelected))} className={classes.arrowBack}/>  
        </>
      )
    }
  }, [articlesCart])
  
  useEffect(() => {
      // console.log("groupsByBusiness: ", groupsByBusiness)
  }, [groupsByBusiness])

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