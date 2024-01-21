import React, { ChangeEvent, useContext, useEffect } from "react";
import { BsBookmark } from "react-icons/bs";
import { Context, FollowersUser, InitialStateInterface, MyContext, setNotSave, setSave } from "../../settings";
import { FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SaveImage from "../../settings/assets/images/3512850.png";
import SaveBookmarkImage from "../../settings/assets/images/35128505.png";
interface saveInterface {
    item: FollowersUser,
    id: string
}
export const Save:React.FC<saveInterface> = ({id, item}):JSX.Element => {
    const {siteColor, saveDatas}:InitialStateInterface = useSelector(({Reducer}) => Reducer)
    const {save, setSaveData}:MyContext = useContext(Context)
    const dispatch = useDispatch()
    const handleIncludeData = (id:string):void => {
        if(saveDatas?.some((item:FollowersUser) => item.id === id)){
            console.log("ichida bor")
            setSaveData(true)
        }else{
            console.log("ichida yuq")
            setSaveData(false)
        }
    }
    const handleSaveData = (evt:React.ChangeEvent<HTMLInputElement>):void => {
        console.log(evt.target.checked)
        if(evt.target.checked){
            dispatch(setSave(item))
            setSaveData(true)
        }else{
            dispatch(setNotSave(item))
            setSaveData(false)
        }    
        handleIncludeData(id)
    }   
    useEffect(() => {
        handleIncludeData(id)
    },[id])
    return (
        <input type="checkbox" defaultChecked={save ? true : false}  onChange={(evt:React.ChangeEvent<HTMLInputElement>) => handleSaveData(evt)}  className="save" style={{backgroundImage: `url(${save ? SaveBookmarkImage: SaveImage})`, filter: siteColor === "black" ? "invert(1)": "inherit"}} />                    
    )
}