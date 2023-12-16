import React from "react";
import { InitialStateInterface } from "../../../settings";
import { useSelector } from "react-redux";

export const HomePage:React.FC = ():JSX.Element => {
    const {siteColor}:InitialStateInterface = useSelector(({Reducer}) => Reducer)
    return(
        <h1 style={{color: siteColor === "black" ? "#fff": "#000"}}>HomePage</h1>
    )
}