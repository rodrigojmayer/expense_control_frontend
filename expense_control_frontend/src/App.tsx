// import RequireAuth from './components/RequireAuth';
// import PersistLogin from './components/PersistLogin';
// import Redirect from './components/Redirect';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PersistLogin from './components/PersistLogin';
import Redirect from './components/Redirect';// Import your AuthProvider
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';

function App() {
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="" element={<PersistLogin />} >
            <Route element={<RequireAuth />} >
              <Route path="" element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route path="/*" element={<Home />} />
            </Route>
            <Route element={<Redirect />} >
              <Route path="login" element={<Login />} />
            </Route>
          </Route>
        </Route>
      </Routes>
     </GoogleOAuthProvider> 
  )
}

export default App