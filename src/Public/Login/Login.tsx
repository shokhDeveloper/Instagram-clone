import React, { useEffect } from "react";
import { Footer } from "../../Components";
import { LoginForm } from "../LoginForm";
import { useLocation } from "react-router-dom";
import { useBack } from "../../settings";
export const Login: React.FC = (): JSX.Element => {
    const {pathname} = useLocation()
    const {back, type} = useBack(true)
    useEffect(() => {
        if(pathname === "/login"){
            window.scrollTo(0, 0)
        }
    },[pathname])
    useEffect(() => {
        if(type){
            back()
        }
    },[type])
    return (
        <>
            <section className="sign">
                <div className="container">
                    <LoginForm/>
                </div>
            </section>
            <Footer active={false} />
        </>
    )
}