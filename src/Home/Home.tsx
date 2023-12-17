import "./home.scss"
import React, { useContext, useEffect } from "react";
import { Sidebar, SidebarBack } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { Context, InitialStateInterface, MyContext, setInsChangeBg } from "../settings";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages";
import { MessageUser } from "../Components/Messages";

export const Home: React.FC = (): JSX.Element => {
    const {loader, siteColor }:InitialStateInterface = useSelector(({Reducer}) => Reducer)
    const {sidebarActive, setSidebarActive, sidebarBack}:MyContext = useContext(Context)
    const dispatch = useDispatch()
    useEffect(() => {
        if(!loader && !siteColor){
            dispatch(setInsChangeBg("black"))
        }
    },[loader, siteColor])
    useEffect(() => {
        if(siteColor){
            document.body.style.backgroundColor = siteColor
        }
    },[siteColor]) 
    return (
        <section className="home">
           <div className="home__inner">
                <Sidebar /> 
                <div className="content">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/search" element={<HomePage/>}/>
                        <Route path="/message-send/:user" element={<MessageUser/>}/>
                    </Routes>
                </div>
            </div>
        </section>
    )
}