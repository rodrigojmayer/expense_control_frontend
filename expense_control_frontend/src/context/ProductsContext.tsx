/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useEffect, useContext } from 'react';
import { Data } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
import { UserContext } from './UserContext';
// import { CategoriesContext } from './CategoriesContext';

export const ProductsContext = createContext<object | undefined>(undefined);

type ProductsProviderProps = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
  const { user } = useContext<any>(UserContext);
  // const { categories } = useContext<any>(CategoriesContext);
  
  const [products, setProducts] = useState<Data[]>([])

  const fetchProducts = async () => {
      
    // console.log("Fetching products isLoading.fieldsFetchCreateStock:", isLoading.fieldsFetchCreateStock)

    try {
      // const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/products/client/${user.id_client}`)
      const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/products/client/3`)
      if (response.ok) {
        const json = await response.json()
        // console.log("-------------productsContext json: ", json)
        
        // if(json.lenght>0){
          // Map through the products array and edit the date format
          const formattedProducts = json.map((product: Data) => {
            // const selectedCategorySub = categoriesSub.find((categorySub: any) => categorySub.id === product.id_sub_category);
            return {
              ...product,
              // category_obj: selectedCategory,
            };
          });

          // // Sort the products array by the 'alert_on' field
          // formattedProducts.sort((a:any, b:any) => {
          //   const alertOnA = formatAlertDate((a.alerted_amount && a.alert_amount_enabled) || (a.alerted_date && a.alert_date_enabled))
          //   const alertOnB = formatAlertDate((b.alerted_amount && b.alert_amount_enabled) || (b.alerted_date && b.alert_date_enabled))
          //   if (alertOnA && alertOnB) {
          //     return alertOnA - alertOnB
          //   }
          //   // If one of the dates is null or undefined, place it at the end
          //   return alertOnA ? -1 : 1
          // })
        // console.log("productsContext here is ok: ------------------")

          setProducts(formattedProducts)
      } else {
        // Handle the case where the response is not OK (e.g., show an error message)
      }
    } catch (error: unknown) {
      setProducts([])
      // Handle any network or fetch-related errors
    } finally {
      setIsLoading((prevLoading: any) => ({
        ...prevLoading,
        products: false,
      }));
    }
  }

  useEffect(() => {
    if (user._id) {
      fetchProducts();
    } else {
      setProducts([])
    }
  }, [user])
  
  // useEffect(() => {
  //   if (isLoading.fieldsFetchCreateStock) {
  //     fetchProducts();
  //     setIsLoading((prevLoading: any) => ({
  //         ...prevLoading,
  //         fieldsFetchCreateStock: false,
  //     }));
  //   }
  // }, [isLoading.fieldsFetchCreateStock, user ])
  

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  )
};
