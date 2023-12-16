import React, { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Context, CustomLinkProps, MyContext } from "../../settings";

export const CustomLink:React.FC<CustomLinkProps> = ({to, children, className}):JSX.Element => {
    const location = useLocation()
    const { setActiveLink}:MyContext = useContext(Context)
    const isActive = ():void => {
        const activeLink:Record<string, boolean> = {}
        if(location.pathname === "/"){
            activeLink["home"] = true
        }else if(location.pathname !== "/"){
            activeLink[location.pathname.substring(1, location.pathname.length)] = true
        }
        setActiveLink(activeLink)
    }
    useEffect(() => {
        isActive()
    },[location.pathname])
    return(
        <NavLink to={to} className={className} >
            {children}
        </NavLink>
    )
}