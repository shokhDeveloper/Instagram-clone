import "./renderFollow.scss";
import React, { useContext, useEffect } from "react";
import { AvatarText, Context, FollowersUser, InitialStateInterface, MyContext, RenderFollowingInterface, setDateMessagesArray } from "../../../../../settings";
import { useDispatch, useSelector } from "react-redux";
import { GoHeart } from "react-icons/go";
import { Like } from "../../../../../Components";

export const RenderFollowing: React.FC<RenderFollowingInterface> = ({ data }): JSX.Element => {
    const { siteColor, homePageData, dateMessagesArray }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
    const { filterData, setFilterData }: MyContext = useContext(Context)
    const dispatch = useDispatch()
    const dataNumber: number = 10
    const handleFilterData = (response: FollowersUser[]): FollowersUser[] | null => {
        let regex = /\b(messi|najot|epam|subyektiv|barcelona|bill|mark|saud|xayrulla|khabibullaev)\b/gi
        let filterData: FollowersUser[] = response.filter((item: FollowersUser) => item.full_name.match(regex))
        if (filterData?.length === dataNumber) {
            setFilterData(filterData.sort((a, b) => {
                if (a.full_name > b.full_name) {
                    return 1
                } else {
                    return -1
                }
            }))
        }
        return filterData
    }
    useEffect(() => {
        if (data?.length) {
            let result:FollowersUser[] | null = handleFilterData(data)
            if(result?.length){
                dispatch(setDateMessagesArray(result?.length))
            }
        }
    }, [data])
    return (
        <div className="home_data__following">
            <div>
            {filterData?.map((item: FollowersUser, index: number) => {
                let seperator: string[] = item.full_name.split(" ")
                let name: string = seperator.length > 1 ? seperator[0].charAt(0).concat(seperator[1].charAt(0)) : seperator[0].substring(0, 1).concat(seperator[0][seperator.length - 1])
                return (
                    <div className="home__following">
                        <div className="following__top">
                            <AvatarText styledType={`${siteColor}`}>{name}</AvatarText>
                            <h4 className={siteColor?.toString()}>{item.full_name}</h4>
                            {dateMessagesArray?.length ? (
                                <small className={siteColor?.toString()}>{dateMessagesArray[index]}</small>
                            ): null}
                        </div>
                        <img src={homePageData[index]} alt={`Instagram-${seperator.slice(0,1)}-image`} />
                        <div className="following__bottom">
                            <Like item={item} id={item.id}/>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}