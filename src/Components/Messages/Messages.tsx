import "./messages.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AvatarText, ButtonBar, InitialStateInterface, UserProfileInterface, setDateMessagesArray, setWordsMessageArray } from "../../settings";
import { IoIosArrowDown } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { CiUser } from "react-icons/ci";

export const Messages: React.FC = (): JSX.Element => {
    const { messages, siteColor, user, followers, dateMessagesArray, wordsMessageArray }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
    const dispatch = useDispatch()
    useEffect(() => {
        if(followers?.length){
            dispatch(setDateMessagesArray(followers?.length))
            dispatch(setWordsMessageArray(followers?.length))
        }
    },[followers])
    return (
        <div className="messages">
                <div className="messages__top" style={{background: `${siteColor}`}}>
                    <div className="message_top__items">
                    <h3 className={`${siteColor}`}>{user?.displayName === "Shohijahon Musinkulov" ? "shokhijakhon_dev" : user?.displayName} <IoIosArrowDown /></h3>
                    <ButtonBar darkMode={siteColor === "black" ? "dark" : "white"} className={`${siteColor} border-transparent`}><FiEdit /></ButtonBar>
                    </div>
                <div className="messages_top__infos">
                    <p>Сообщения</p>
                    <ButtonBar active={true} className="border-transparent" darkMode={`${siteColor === "black" ? "dark" : "white"}`}>Запросы</ButtonBar>
                </div>
                </div>
                <ul className="messages_inner__list">
                    {(function(){
                        if(wordsMessageArray && followers && dateMessagesArray && followers.length === dateMessagesArray.length &&wordsMessageArray?.length === followers?.length){
                            return(
                                <>  
                                {followers?.map((item: UserProfileInterface, index: number) => {
                                  return (
                                        <li key={item.id}>
                                            <AvatarText className="messages__avatar" styledType={`${siteColor}`}>
                                                <CiUser fill={`${siteColor}`} />
                                            </AvatarText>
                                            <div>
                                                {(function () {
                                                    if(item.full_name?.length && !item?.username?.length || item.full_name === item.username ){
                                                        return(
                                                            <>
                                                            <p>{item.full_name}</p>
                                                            {/* <span className="user_send__message"> */}
                                                            <small className="user_send__message">{wordsMessageArray[index]}</small>
                                                            {dateMessagesArray[index]}
                                                            {/* </span> */}
                                                            </>
                                                        )
                                                    }else { 
                                                        return(
                                                            <>
                                                            <p>{item.username}</p>
                                                            <small className="user_send__message">{wordsMessageArray[index]}</small>
                                                            {dateMessagesArray[index]}
                                                            </>
                                                        )
                                                    }
                                                    
                                                }())}
                                            </div>
                                        </li>
                                    )
                                })}
                                </>
                            )
                        }
                    }())}
                </ul>
        </div>
    )
}