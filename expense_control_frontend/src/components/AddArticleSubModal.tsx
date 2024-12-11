/* eslint-disable @typescript-eslint/no-explicit-any */
// import dayjs, { Dayjs } from 'dayjs';// Import dayjs
import { useEffect, useState } from 'react';
import { Box,
         Button,
         Modal, 
        } from "@mui/material";
import { useStylesGlobal } from '../Styles'
import { ProductData } from '../types';
import { CancelButton, EditButton, OkButton } from './Buttons';

interface ChildProps {
    hiddenPanel:  boolean
    close: any
    selectedArticle: ProductData
    setOpenOptionSubModal: (newData: any) => void
    setArticlesCart: (newData: any) => void
    optionSelected: any 
}

export default function AddArticleSubModal(
  {   
      hiddenPanel, 
      close,
      selectedArticle,
      setOpenOptionSubModal,
      setArticlesCart,
      optionSelected
  }: ChildProps )  {
  const { classes } = useStylesGlobal();
  const [multiplier, setMultiplier] = useState<number>(1)
  const [price, setPrice] = useState<number>(0)

  const handleAddArticleToCart = () => {
    setArticlesCart((prevItems: any) => [...prevItems, {selectedArticle, multiplier, price}]);
    close()
  }
  
  useEffect(() => {
    setMultiplier(1)
    if(selectedArticle.price_secondary && (optionSelected.paymentMethodMenuSelected === "MobilePay" || optionSelected.paymentMethodMenuSelected === "Revolut"))
      setPrice(selectedArticle.price_secondary)
    else 
      setPrice(selectedArticle.price_primary)
  }, [hiddenPanel])

  return (
    <Modal
      className={classes.subModalExternal}
      open={!hiddenPanel} 
      onClose={close} 
    >
      <Box className={classes.subModalInternal}>
        <Box className={classes.customBoxRow}>
          <h3>
          Agregar al carrito
          </h3>
        </Box>
        <Box className={classes.customBoxRow}>
          {selectedArticle.product}
          <Button 
            className={classes.buttonMultiplier}
            onClick={() => setMultiplier(multiplier < 99 ? multiplier+1 : 1)}  
          >
            x{multiplier}
          </Button>
        </Box>
        <Box className={classes.customBoxRow}>
            {price} dkk
        </Box>
        
        
        <Box className={classes.customBoxRow}>
          <EditButton
            clicked={() => setOpenOptionSubModal((prevOpenOptionSubModal: any) => ({
              ...prevOpenOptionSubModal,
              manageArticleSubModal: false,
            }))}
          />
          <CancelButton
            clicked={close}
          />
          <OkButton
            clicked={() => handleAddArticleToCart()}
          />
        </Box>
      </Box>
    </Modal>
  )
}