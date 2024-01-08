import "./messages.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AvatarText, ButtonBar, InitialStateInterface, UserProfileInterface, setDateMessagesArray, setMessageUserType, setMessages, setUserMessageText, setUserPageIndex, setWordsMessageArray } from "../../settings";
import { IoIosArrowDown } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaAngleRight, FaRegMessage, FaAngleLeft } from "react-icons/fa6";

export const Messages: React.FC = (): JSX.Element => {
    const { siteColor, user, followers, dateMessagesArray, wordsMessageArray, messageUserType }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
    const dispatch = useDispatch()
    useEffect(() => {
        if (followers?.length) {
            dispatch(setDateMessagesArray(followers?.length))
            dispatch(setWordsMessageArray(followers?.length))
        }
    }, [followers])
    const handleBack = () => {
        dispatch(setMessageUserType(false))
    }
    return (
        <div className="messages">
            <div className={`messages__top ${messageUserType ? "message__top--active": ""} `} style={{ background: `${siteColor}`}}>
                <div className="message_top__items">
                    {!messageUserType ? (
                        <>
                            <h3 className={`${siteColor}`}>{user?.displayName === "Shohijahon Musinkulov" ? "shokhijakhon_dev" : user?.displayName} <IoIosArrowDown /></h3>
                    <ButtonBar darkMode={siteColor === "black" ? "dark" : "white"} className={`${siteColor} border-transparent`}><FiEdit /></ButtonBar>
                        </>
                    ): (
                        <div className="message_back__top">
                            <button onClick={handleBack} className="border-transparent"><FaAngleLeft/></button>
                            <h3>Запросы на переписку</h3>
                        </div>
                    )}
                </div>
                {messageUserType ? (
                    <>
                        <div className="message_top__back">
                            <div className="message_top_back__inner">
                                <div className="message_top_back_icon__inner">
                                <div className="message_top__icon">
                                <svg aria-label="Eye-off icon for the hidden requests" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height={24} role="img" viewBox="0 0 24 24" width={24}><title>Eye-off icon for the hidden requests</title><path d="M2.936 8.014A12.792 12.792 0 0 0 .559 11.82a1 1 0 0 0 1.881.677 10.987 10.987 0 0 1 1.988-3.15 1 1 0 1 0-1.492-1.332Zm20.271 13.779-5.916-5.916a4.969 4.969 0 0 0 .133-.582.983.983 0 0 0-1.107-1.108 3.315 3.315 0 0 1-.678.038l-3.366-3.366a3.3 3.3 0 0 1 .036-.676.99.99 0 0 0-1.134-1.107 4.623 4.623 0 0 0-.553.132L8.13 6.717a10.395 10.395 0 0 1 13.429 5.779 1 1 0 0 0 1.881-.677C23.413 11.74 20.542 4 12 4a12.104 12.104 0 0 0-5.367 1.22L2.207.792A1 1 0 0 0 .793 2.207l21 21a1 1 0 0 0 1.414-1.414ZM11.382 14.9l-3.044-3.03a1.005 1.005 0 0 0-1.636.326 5.495 5.495 0 0 0 1.31 6.074 5.495 5.495 0 0 0 6.075 1.31 1.005 1.005 0 0 0 .325-1.636Z" fillRule="evenodd" /></svg>

                                </div>
                                <p>Скрытые запросы</p>  
                                </div>
                                <button className="border-transparent"><FaAngleRight/></button>
                            </div>
                        </div>
                    </>
                ) : (

                    <div className="messages_top__infos">
                        <p>Сообщения</p>
                        <ButtonBar onClick={() => dispatch(setMessageUserType(true))} active={true} className="border-transparent" darkMode={`${siteColor === "black" ? "dark" : "white"}`}>Запросы</ButtonBar>
                    </div>
                )}
            </div>
            <ul className="messages_inner__list">
                {(function () {
                    if (wordsMessageArray && followers && dateMessagesArray && followers.length === dateMessagesArray.length && wordsMessageArray?.length === followers?.length && !messageUserType) {
                        return (
                            <>
                                {followers?.map((item: UserProfileInterface, index: number) => {
                                    return (
                                        <li key={item.id} onClick={() => {
                                            dispatch(setMessages(true))
                                            dispatch(setUserPageIndex(index))
                                        }}>
                                            <NavLink to={`/message-send/${item.username}`} className={({ isActive }) => isActive ? "link__message active_message__link" : "link__message"}>
                                                <AvatarText className="messages__avatar" styledType={`${siteColor}`}>
                                                    <CiUser fill={`${siteColor}`} />
                                                </AvatarText>
                                                <div>
                                                    {(function () {
                                                        if (item.full_name?.length && !item?.username?.length || item.full_name === item.username) {
                                                            return (
                                                                <>
                                                                    <p>{item.full_name}</p>
                                                                    {/* <span className="user_send__message"> */}
                                                                    <small className="user_send__message textGrey ">{wordsMessageArray[index]}</small>
                                                                    <small className="textGrey">
                                                                        {dateMessagesArray[index]}
                                                                    </small>
                                                                    {/* </span> */}
                                                                </>
                                                            )
                                                        } else {
                                                            return (
                                                                <>
                                                                    <p>{item.username}</p>
                                                                    <small className="user_send__message textGrey">{wordsMessageArray[index]}</small>
                                                                    <small className="textGrey">
                                                                        {dateMessagesArray[index]}
                                                                    </small>
                                                                </>
                                                            )
                                                        }

                                                    }())}
                                                </div>
                                            </NavLink>
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