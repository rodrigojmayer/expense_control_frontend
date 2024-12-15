/* eslint-disable @typescript-eslint/no-explicit-any */
// import dayjs, { Dayjs } from 'dayjs';// Import dayjs
import { Box,
         Button,
        } from "@mui/material";
// import { UpButton } from './Buttons';
import { useStylesGlobal } from '../Styles'
import { ArticleCartData } from '../types';
import SuccessExportModal from "./SuccessExportModal";
import LoadingModal from "./LoadingModal";
import { useState } from "react";

interface ChildProps {
    hiddenPanel:  boolean
    optionSelected: any 
    articlesCart: ArticleCartData[]
    setArticlesCart: React.Dispatch<React.SetStateAction<ArticleCartData[]>>
}

export default function CartMenuModal(
    {   
        hiddenPanel, 
        optionSelected,
        articlesCart,
        setArticlesCart
    }: ChildProps )  {
    const { classes } = useStylesGlobal();
    
    const [openSuccessExportModal, setOpenSuccessExportModal] = useState(false); 
    const [openLoadingModal, setOpenLoadingModal] = useState(false); 
    const handleRemoveArticleFromCart = (artIndex: number) => {
      const newArticlesCart = articlesCart.map((articleCart: ArticleCartData, index: number) => {
        if(index === artIndex){
          return {
            ...articleCart,
            multiplier: (articleCart.multiplier ?? 1) - 1,
          }
        }
        return articleCart;
      }).filter((articleCart: ArticleCartData) => articleCart.multiplier ?? 0 > 0);

      setArticlesCart(newArticlesCart)
    }

    const fetchCart = async (article:ArticleCartData): Promise<void> => {
      try {
        const response = await fetch(`https://script.google.com/macros/s/AKfycbwry3r8kKfFy3Z7EjkOnjqBwBX5jha248ubwmDoiFzusptKVGzlNbY5N89uoy7rDOrHDw/exec?sheetCustomName=${optionSelected.businessMenuSelected}&Monto=${article.price}&Servicio-Producto=${article.selectedArticle.product}&Formato%20de%20Pago=${optionSelected.paymentMethodMenuSelected}`, {
          redirect: "follow",
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
        });
        // console.log("response: ", response)
        console.log("response.ok: ", response.ok)
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
    const handleSubmit = async (): Promise<void> => {
      setOpenLoadingModal(true)
      try {
        // Create an array of promises for all fetchCart calls
        const fetchPromises = articlesCart.flatMap((article) => Array.from({ length: article.multiplier }, () => fetchCart(article)));

        // Wait for all fetch requests to complete
        await Promise.all(fetchPromises);

        // Set the success modal open after all fetches are done
        setOpenSuccessExportModal(true);
        setOpenLoadingModal(false)
      } catch (error) {
        console.error("Error in handleSubmit: ", error);
      }
    };
    
    const handleCloseSuccessExportModal = () => {
      setOpenSuccessExportModal(false)
    };

    return (
      <div  hidden= {hiddenPanel}>
        <LoadingModal 
          openLoadingModal={openLoadingModal}
          />
        <SuccessExportModal
          openSuccessExportModal={openSuccessExportModal}
          closeSuccessExportModal={handleCloseSuccessExportModal}
          businessSelected={optionSelected.businessMenuSelected} 
        />
        <Box className={`${classes.customBoxRow}`}>
          <h2>
            Carrito
          </h2>
        </Box>
        <Box className={`${classes.customBoxRow} ${classes.customBoxCartArticles}`}>
          {articlesCart.map((articleCart: ArticleCartData, index: number) => (
            Array.from({ length: articleCart.multiplier ?? 0 }).map((_, i) => (
              
              <Box 
                key={`${articleCart.selectedArticle._id}-${i}`}
                className={classes.customBoxCartArticle}
              >
                <Box
                  className={classes.buttonRemoveCartArticle}
                  onClick={() => handleRemoveArticleFromCart(index)}
                > 
                  x 
                </Box>
                <Box> 
                  { articleCart.selectedArticle.product.length > 17 ? articleCart.selectedArticle.product.slice(0, 17) + "..." : articleCart.selectedArticle.product } 
                </Box>
                <Box className={classes.underscore}></Box>
                <Box> {articleCart.price} </Box>
              </Box>
            ))
          ))}
        </Box>
        <Box className={`${classes.customBoxRow} ${classes.customBoxCartArticles} ${classes.customBoxCartTotal}`}>
          <Box 
            className={classes.customBoxCartArticle}
          >
            <Box> 
              Total
            </Box>
            <Box className={classes.underscore}></Box>
            <Box> 
              {articlesCart.reduce((acu: number, obj: ArticleCartData) => (obj.price ? (obj.price * obj.multiplier) + acu : 0), 0)} 
            </Box>
          </Box>
        </Box>
        <Button  
        variant="outlined"
        className={` ${classes.btn_ok}`}
        sx={{  
          border: 0, 
          borderRadius: 2, 
          margin: 1,
          height: 45,
        }}
        onClick={()=>handleSubmit()}>Exportar</Button>
      </div>
    )
}