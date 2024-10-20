// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IsLoadingProvider } from './context/IsLoadingContext';
import { AuthProvider } from './context/AuthProvider';
import { UserProvider } from './context/UserContext';
import { ProductsProvider } from './context/ProductsContext.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
        <IsLoadingProvider>
          <AuthProvider>
            <UserProvider>
            <ProductsProvider>
                {/* <App /> */}
                  <Routes>
                    <Route path="/*" element={<App />} />
                  </Routes>
                </ProductsProvider>
            </UserProvider>
          </AuthProvider>
        </IsLoadingProvider>
    </BrowserRouter>
  // </StrictMode>,
)
