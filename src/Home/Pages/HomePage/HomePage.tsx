import "../../home.scss";
import React, { useCallback, useEffect } from "react";
import { FollowerResponse, FollowersUser, InitialStateInterface } from "../../../settings";
import { useSelector } from "react-redux";
import { Following, RenderFollowing } from "./Components";
import axios from "axios";
import { useQuery } from "react-query";
export const HomePage: React.FC = (): JSX.Element => {
    const { siteColor, following, token }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
    const handleGetDataFollowing = useCallback(async ():Promise<FollowersUser[] | any> => {  
        try{
            const request = await axios.get(process.env.REACT_APP_INSTAGRAM_SERVER + "/following")
            if(request.status === 200){
                const response:FollowerResponse = await request.data
                console.log(response)
                return response.items
            }
        }catch(error){
            return Promise.reject(error)
        }
    },[token])
    const {isLoading, isSuccess, data} = useQuery("/following", handleGetDataFollowing, {
        refetchOnWindowFocus: false
    })
    return (
        <div className="home__page">
            <div className="home_page__inner">
                <div className="home_page__data">
                    <Following/>
                    {isLoading ? (
                        <h1>Yuklanmoqda</h1>
                    ): isSuccess ? (
                        <RenderFollowing data={data}/>
                    ): (
                        <h2 className="error">Xatolik</h2>
                    )}
                </div>
                <div className="home_page__data">
                    <h1 className={siteColor?.toString()}>Leo</h1>
                </div>
            </div>
        </div>
    )
}