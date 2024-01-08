import "./following.scss"
import React, { useEffect } from "react";
import { AvatarText, FollowerResponse, FollowersUser, InitialStateInterface, UserProfileInterface, setChangeDecIndex, setChangeIndex, setFollowingPagination, setMaxIndex } from "../../../../../settings";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "react-query";
import { CiUser } from "react-icons/ci";

export const Following:React.FC = ():JSX.Element => {
    const {siteColor, followingPaginationType, index, maxIndex}:InitialStateInterface = useSelector(({Reducer}) => Reducer)
    const dispatch = useDispatch()
    const handleGetFollowings = async ():Promise<FollowersUser[] | void> => {
        try{
            const request = await axios.get(process.env.REACT_APP_INSTAGRAM_SERVER + "/following", {
                params: {
                    username_or_id_or_url: "shokhijakhon_dev",
                    
                },
                headers:{
                    'X-RapidAPI-Key': process.env.REACT_APP_KEY,
                    'X-RapidAPI-Host': process.env.REACT_APP_HOST
                }
            })
            if(request?.status === 200){
                const response:FollowerResponse = await request.data.data
                return response.items
            }
        }catch(error){
            return Promise.reject(error)
        }
    }
    const {data, isLoading, isError, isSuccess} = useQuery("/following", handleGetFollowings , {
        refetchOnWindowFocus: false
    })
    useEffect(() => {
        let response:FollowersUser[] = data as FollowersUser[]
        if(response?.length > 8){
            dispatch(setFollowingPagination(true))
            dispatch(setMaxIndex(response.slice(0, 20).length))
        }
    },[data])
    useEffect(() => {
        console.log(maxIndex, index)
    },[maxIndex, index])
    return(
        <>
            {isSuccess ? (
                <ul className="home_page__following" >
                    {followingPaginationType ? (
                        <button className="pagination__list" onClick={() => dispatch(setChangeIndex(1)) }>Right</button>
                    ): false}
                    {data?.slice(0, 20).map((item:FollowersUser) => {
                        let name: string = item.username.slice(0, 7).concat("...")
                        return(
                            <li style={{transform: `translateX(-${index * 98}px)`}}>
                                <AvatarText className="avatar__text" styledType={siteColor?.toString()}>
                                    <CiUser/>
                                </AvatarText>
                                <p className={siteColor?.toString()}>{name}</p>
                            </li>
                        )
                    })}
                    {followingPaginationType? (
                        <button onClick={() => dispatch(setChangeDecIndex(1))} className="pagination__list">Left</button>
                    ): false}
                </ul>
            ): isError ? (
                <>
                    <h2 className="error">Xatolik</h2>
                </>
            ): null}               
            {isLoading ? (
                <h2 className={siteColor?.toString()}>Loading</h2>
            ): null} 
        </>
    )
}