/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useEffect, useContext } from 'react';
import { ProductData } from '../types';
import { IsLoadingContext } from './IsLoadingContext';
import { UserContext } from './UserContext';

export const ProductsContext = createContext<object | undefined>(undefined);

type ProductsProviderProps = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const { isLoading, setIsLoading } = useContext<any>(IsLoadingContext);
  const { user } = useContext<any>(UserContext);
  const [products, setProducts] = useState<ProductData[]>([])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/products/`)
      if (response.ok) {
        const json = await response.json()
        // Map through the products array and edit the date format
        const formattedProducts = json
        .filter((product: ProductData) => !product.deleted)
        .map((product: ProductData) => {
            return {
              ...product,
            };
        });
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
  
  useEffect(() => {
    if (isLoading.products) {
      fetchProducts();
      setIsLoading((prevLoading: any) => ({
          ...prevLoading,
          products: false,
      }));
    }
  }, [isLoading.products, user ])

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  )
};
