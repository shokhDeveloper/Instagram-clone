import { useDispatch, useSelector } from "react-redux";
import "./comment.scss";
import React, { ElementRef, FormEvent, useContext, useEffect, useRef, useState } from "react";
import { AvatarText,  ChangableValue,  CommentProps,  Context, FollowersUser, ImageApplication, InitialStateInterface, MyContext, setAddComment, setCleanComment, useScroll } from "../../settings";
import { Like } from "../Like";
import { FaRegComment } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { Save } from "../Save";
import { FaRegSmile } from "react-icons/fa";
import { v4 } from "uuid";
interface CommentImage {
    imageData: ImageApplication[],
    filterData: FollowersUser[],
    id: string,
    item: FollowersUser
}
export const Comment: React.FC<CommentImage> = ({ imageData, filterData, id, item }): JSX.Element => {
    const { siteColor, followers, comments, user  }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
    const { comment, setComment }: MyContext = useContext(Context)
    const [image, setImage] = useState<ImageApplication | null>(null)
    const [userData, setuserData] = useState<FollowersUser| null>(null)
    const elBoxRef = useRef<HTMLDivElement | null>(null)
    const elInputRef = useRef<HTMLInputElement | null>(null) 
    const { hide, show } = useScroll()
    const dispatch = useDispatch()
    const handleSub = (event:FormEvent<HTMLFormElement>):void => {
        event.preventDefault()
        
        const formData = new FormData(event.target as HTMLFormElement)
        const data:CommentProps = {
            id: v4() as string, 
            name: formData.get("value") as string
        }
        dispatch(setAddComment(data))

        elBoxRef.current?.scrollTo(0, 0)
        if(elInputRef?.current?.value.length){
            elInputRef.current.value = ""
            elInputRef.current.focus()
        }
    }
    let name:ChangableValue<string> = user?.displayName;
    let sliceUserName:ChangableValue<string> = name?.charAt(0).concat(name.split(" ")[1].charAt(0)).split("").join(".")
    useEffect(() => {
        const find = imageData?.find((item: ImageApplication) => item.id === id)
        let userDataData = filterData?.find((item: FollowersUser) => item.id === id)
        if (find?.id && userDataData?.id) {
            setImage(find)
            setuserData(userDataData)
        }
    }, [id])
    useEffect(() => {
        if (comment) {
            hide()
            dispatch(setCleanComment([]))
        } else {
            show()
        }
    }, [comment])
    return (
        <div className="comment__overlay overlay" style={{ display: comment ? "flex" : "none" }}>
            <button className={`comment__x border-transparent`} onClick={() => setComment(false)} >X</button>
            <div className="comment__inner">
                <div className={`comment__box comment__box--${siteColor}`}>
                    <img src={image?.image} alt="Instagram-image" />
                </div>
                <div className={`comment__chat comment__chat--${siteColor}`}>
                    <div className={`comment_chat__top comment_chat__top--${siteColor}`}>
                        <div className="comment_chat__userData">
                            <AvatarText styledType={`${siteColor}`}>
                                {
                                    (function () {
                                        if (userData?.full_name) {
                                            let seperator: string[] = userData.full_name.split(" ")
                                            let name: string = seperator.length > 1 ? seperator[0].charAt(0).concat(seperator[1].charAt(0)) : seperator[0].charAt(0).concat(seperator[0][seperator.length - 1])
                                            return (
                                                name.split("").join(".")
                                            )
                                        }
                                    }())
                                }
                            </AvatarText>
                            <div className="comment_chat_top__data">
                                <p className={`${siteColor}`}>{userData?.full_name}</p>
                                <small className={`${siteColor}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, ipsam.</small>
                            </div>
                        </div>
                    </div>
                    <div className="comment_chat__bottom" ref={elBoxRef}>
                        {comments?.map((item:CommentProps) => {
                            return (
                                <div className="comments">
                                <AvatarText styledType={`${siteColor}`}>
                                    {sliceUserName}
                                </AvatarText>
                                <p className={`${siteColor}`}>
                                    {item.name}
                                </p>
                            </div>   
                            )
                        })}
                        {followers.slice(0, 20).map((item: FollowersUser, index: number) => {
                            let name = item.username;
                            let arraySticker: string[] = ["😊", "😄", "✔", "‼", "❌", "❤", "👏", "😍", "🥱", "😎", "😛", "🥵", "🤤", "🤬", "😈", "💩", "👀", "🗣", "🦁", "🦂"]
                            return (
                                <div className="comments">
                                    <AvatarText styledType={`${siteColor}`}>
                                        {name.charAt(0).concat(name.charAt(name.length - 1)).toUpperCase().split("").join(".")}
                                    </AvatarText>
                                    <p className={`${siteColor}`}>
                                        Lorem ipsum dolor sit amet. by {name} {arraySticker[index]}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="comment_chat__form--box">
                        <div className="comment_chat__elements">
                            <div className="following__bottom">
                                {userData ? (
                                    <Like id={userData.id} item={userData} key={userData.id} />
                                ) : ""}
                                <button style={{ filter: siteColor === "black" ? "invert(1)" : "inherit" }} className="border-transparent" ><FaRegComment /></button>
                                <button style={{ filter: siteColor === "black" ? "invert(1)" : "inherit" }} className="border-transparent" onClick={() => console.log("send")}><BsSend /></button>

                            </div>
                            {userData ? (
                                <>
                                    <Save id={userData.id} item={userData} key={userData.id} />
                                </>
                            ) : ""}
                        </div>
                        {userData ? (
                            <>
                            <h4 className={`${siteColor}`}>
                                {parseInt(userData?.id.slice(0,5))} {" "}
                                отметок "Нравится"
                            </h4>
                            <small className="textGrey"> 10 часов назад</small>
                            </>
                        ): ""}
                        <form onSubmit={(event:FormEvent<HTMLFormElement>) => handleSub(event) } className="comment_chat__form">
                            <button className="border-transparent  comment__smile" type="button" style={{filter: siteColor === "black" ? "invert(1)": "inherit"}}><FaRegSmile/></button>
                                <input ref={elInputRef} className={`border-transparent ${siteColor}`} type="text" placeholder="Добавьте комментарий..."  name="value" id="comment" />
                            <button className={`border-transparent comment_chat__submit`}>Опубликовать</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}