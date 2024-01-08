import React, { useCallback, useEffect, MouseEvent } from "react";
import { AvatarText, FollowerResponse, InitialStateInterface, Input, UserInstagram, UserProfileInterface, setDelFollower, setSearchFollowing } from "../../settings";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

export const SearchboxSidebar: React.FC = (): JSX.Element => {
    const { siteColor, user, token, following }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
    const dispatch = useDispatch()
    const handleGetfollowing = useCallback(async ():Promise<void> => {
        if(token && !following?.length){
            try{
                const request = await axios.get(process.env.REACT_APP_INSTAGRAM_SERVER + "/following", {
                    params:{
                        username_or_id_or_url: "shokhijakhon_dev"
                    },
                    headers: {
                        'X-RapidAPI-Key':  process.env.REACT_APP_KEY,
                        'X-RapidAPI-Host': process.env.REACT_APP_HOST
                    }
                })
                if(request.status === 200){
                    const response:FollowerResponse  = await request.data.data
                    if(response.items.length){
                        let followings:UserProfileInterface[] = response.items
                        dispatch(setSearchFollowing(followings))
                    }
                }
            }catch(error){
                return Promise.reject(error)
            }
        }
    },[user, token])
    const handleSearchUser = (event:React.KeyboardEvent<HTMLInputElement>):void => {
        let elTarget = event.target as HTMLInputElement
        if(elTarget.value?.length){
            let rejex = new RegExp(elTarget.value, "gi")
            let searchResult:UserProfileInterface[] | undefined = following?.filter((item:UserProfileInterface) => item.full_name.match(rejex))
            if(searchResult?.length){
                dispatch(setSearchFollowing(searchResult))
            }
        }else{
            setTimeout(() => {
                dispatch(setSearchFollowing([]))
                handleGetfollowing()    
            }, 1000)
        }
    }
    const handleDelUser = (event:MouseEvent<HTMLButtonElement>, id:string):void => {
        dispatch(setDelFollower(id))
    }
    useEffect(() => {
        handleGetfollowing()
    },[handleGetfollowing])
    return (    
        <div className="searchbox__sidebar" >
            <div className={"searchbox_sidebar__top".concat(siteColor === "black" ? " sidebarBack--black" : " sidebarBack--white")}>
                <div className="searchbox_sidebar__title">
                    <h3 className={`${siteColor}`}>Поисковый запрос</h3>
                </div>
                <div className="searchbox_sidebar__search">
                    <Input  onKeyUp={handleSearchUser} className="border-transparent" darkMode={siteColor === "black" ? "dark" : "light"} type="search" styledType="" placeholder="Поиск" aria-label="Ввод поискового запроса"  />
                </div>
            </div>
            <ul className="searchox__inner">
                {following?.map((item:UserProfileInterface) => {
                    return(
                        <li>
                            <div>
                                <AvatarText styledType={siteColor ? siteColor: "white"}>
                                    {item.username.substring(0, 1).concat(item.username.substring(item.username.length-1) as string) }
                                </AvatarText>
                                <div>
                                    <h4>{item.full_name.split(" ").length > 3 ? item.full_name?.split(" ").slice(0, 3).join(" ").concat("..."): item.full_name}</h4>
                                    <p>{item.username}</p>
                                </div>
                            </div>
                            <button className="border-transparent" onClick={(event:MouseEvent<HTMLButtonElement>) => handleDelUser(event, item.id) }><IoMdClose/></button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}