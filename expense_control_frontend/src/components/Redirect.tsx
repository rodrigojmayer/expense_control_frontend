import { useLocation, Navigate, useNavigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const Redirect = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { auth, persist } = useAuth();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [secondLoad, setSecondLoad] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(auth || secondLoad){
            if (auth._id ){
                navigate('/')
            } 
            setIsLoading(false)
        } else {
            setSecondLoad(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])

    return (
        <>
        {
            isLoading
                    ? <p></p>
                    : auth?._id 
                        ? <Navigate to="/" state={{ from: location }} replace />
                        : <Outlet />
        }
        </>
    )
}

export default Redirect;