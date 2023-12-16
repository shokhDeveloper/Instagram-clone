import { useSelector } from "react-redux";
import { Context, InitialStateInterface, MyContext } from "../../settings";
import "./sidebarBack.scss"
import React, { useContext, useEffect } from "react";
interface SidebarBackProps {
    children: React.ReactNode
}
export const SidebarBack:React.FC<SidebarBackProps> = ({children}):JSX.Element => {
    const {siteColor}:InitialStateInterface = useSelector(({Reducer}) => Reducer)
    const {setSidebarBack, sidebarBack, sidebarActive}:MyContext = useContext(Context)
    useEffect(() => {
        if(sidebarActive){
            setSidebarBack(true)
        }else{
            setSidebarBack(false)
        }
    },[sidebarActive])
    return(
        <div className={"sidebarBack".concat(sidebarBack? " sidebarBack--active" : "").concat(` sidebarBack--${siteColor}`)}>
            {children}  
        </div>
    )
}