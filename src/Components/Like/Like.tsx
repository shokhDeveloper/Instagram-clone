import React, { ChangeEvent, ElementRef, useEffect, useRef, useState } from "react";
import LikeImage from "../../settings/assets/images/Like.png";
import LikeBack from "../../settings/assets/images/Not_Like.png";
import { useDispatch, useSelector } from "react-redux";
import { FollowersUser, InitialStateInterface, setLike, setNotLike } from "../../settings";
interface LikeInterface {
    id: string,
    item: FollowersUser
}
export const Like:React.FC<LikeInterface> = ({id, item}):JSX.Element => {
    const {likeDatas, siteColor}:InitialStateInterface = useSelector(({Reducer}) => Reducer)
    const [like, setIncludeLike] = useState<boolean>(false)
    const likeRef = useRef<HTMLInputElement | null>(null)
    const dispatch = useDispatch()
    const handleIncludeLike = () => {
        if(likeDatas?.some((data:FollowersUser) => data.id === item.id )){
            setIncludeLike(true)
        }else{
            setIncludeLike(false)
        }
    }
    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        if(event.target.checked){
            dispatch(setLike(item))
            setIncludeLike(true)
        }else{
            dispatch(setNotLike(item))
            setIncludeLike(false)
        }
    }
    useEffect(() => {
        handleIncludeLike()
    },[like, item])
    return(
        <input type="checkbox" ref={likeRef} defaultChecked={like} checked={like} className="like" style={{backgroundImage: `url(${like ? LikeImage: LikeBack})`, filter: !like && siteColor === "black" ? "invert(1)": "inherit"}} onChange={(event:ChangeEvent<HTMLInputElement>) => handleChange(event)} />
    )
}