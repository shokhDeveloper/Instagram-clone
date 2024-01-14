import { useSelector } from "react-redux";
import "./comment.scss";
import React, { useContext, useEffect, useState } from "react";
import { AvatarText, Context, FollowersUser, ImageApplication, InitialStateInterface, MyContext, useScroll } from "../../settings";
interface CommentImage {    
    imageData: ImageApplication[],
    filterData: FollowersUser[],
    id: string,
    item:FollowersUser
}
export const Comment: React.FC<CommentImage> = ({imageData, filterData, id, item}): JSX.Element => {
    const {siteColor}:InitialStateInterface = useSelector(({Reducer}) => Reducer)
    const {comment, setComment}:MyContext = useContext(Context)
    const [image, setImage] = useState<ImageApplication | null>(null)
    const [user, setUser] = useState<FollowersUser | null>(null)
    const {hide, show} = useScroll()
    useEffect(() => {
        const find = imageData?.find((item:ImageApplication) => item.id === id)
        let userData = filterData?.find((item:FollowersUser) => item.id === id)
        if(find?.id && userData?.id){
            setImage(find)
            setUser(userData)
        }
    },[id])
    useEffect(() => {
        if(comment){
            hide()
        }else{
            show()
        }
    },[comment])
    return (
        <div className="comment__overlay overlay" style={{display: comment ? "flex": "none"}}>
            <button className={`comment__x border-transparent`} onClick={() => setComment(false)} >X</button>
            <div className="comment__inner">
                <div className={`comment__box comment__box--${siteColor}`}>
                    <img src={image?.image} alt="Instagram-image" />
                </div>
                <div className={`comment__chat comment__chat--${siteColor}`}>
                    <div className="comment_chat__top">
                        <div className="comment_chat__user">
                            <AvatarText styledType={`${siteColor}`}>
                                {
                                    (function(){
                                        if(user?.full_name){
                                            let seperator: string[] =  user.full_name.split(" ")
                                            let name: string = seperator.length > 1 ? seperator[0].charAt(0).concat(seperator[1].charAt(0)): seperator[0].charAt(0).concat(seperator[0][seperator.length-1])
                                            return (
                                                name.split("").join(".")
                                            ) 
                                        }
                                    }())
                                }
                            </AvatarText>
                            <div className="comment_chat_top__data">
                                <p className={`${siteColor}`}>{user?.full_name}</p>
                                <small className={`${siteColor}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, ipsam.</small>
                            </div>
                        </div>
                    </div>
                    <div className="comment_chat__bottom">

                    </div>
                </div>
            </div>
        </div>
    )
}