import "./public.scss";
import React, { useContext, useEffect } from "react";
import { LoginForm } from "../LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { Context, InitialStateInterface, MyContext, setIncIdx } from "../../settings";
import { Footer } from "../../Components";
import { useLocation } from "react-router-dom";
export const PubLicHome: React.FC = (): JSX.Element => {
    const { carouselImges: { images }, idx }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
    const { carouselActive }: MyContext = useContext(Context)
    const {pathname} = useLocation()
    const dispatch = useDispatch()
    const handleStop = (interval: any) => {
        clearInterval(interval)
    }
    const handleIncIdx = () => {
        let interval = setInterval(() => {
            dispatch(setIncIdx(1))
        }, 4000)
        return () => {
            handleStop(interval)
        }
    }
    useEffect(() => {
        const stopInterval = handleIncIdx();
        return () => stopInterval()
    }, [])
    useEffect(() => {
        if(pathname === "/"){
            window.scrollTo(0, 0)
        }
    },[pathname])
    return (
        <>
            <section className="public__home">
                <div className="container">
                    <div className="public__inner">
                        <div className="public__carousel">
                            <img className={`${carouselActive ? "active__image" : ""}`} src={images[idx]} alt="" />
                        </div>
                        <LoginForm />
                    </div>
                </div>
            </section>
            <Footer active={false}/>
        </>
    )
}