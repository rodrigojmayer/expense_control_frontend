import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IsLoadingProvider } from './context/IsLoadingContext';
import { AuthProvider } from './context/AuthProvider';
import { UserProvider } from './context/UserContext';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
        <IsLoadingProvider>
          <AuthProvider>
            <UserProvider>
              {/* <App /> */}
                <Routes>
                  <Route path="/*" element={<App />} />
                </Routes>
            </UserProvider>
          </AuthProvider>
        </IsLoadingProvider>
    </BrowserRouter>
  // </StrictMode>,
)
