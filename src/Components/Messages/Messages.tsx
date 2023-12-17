import "./messages.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AvatarText, ButtonBar, InitialStateInterface, UserProfileInterface, setDateMessagesArray, setMessages, setUserMessageText, setUserPageIndex, setWordsMessageArray } from "../../settings";
import { IoIosArrowDown } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const Messages: React.FC = (): JSX.Element => {
    const { siteColor, user, followers, dateMessagesArray, wordsMessageArray }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (followers?.length) {
            dispatch(setDateMessagesArray(followers?.length))
            dispatch(setWordsMessageArray(followers?.length))
        }
    }, [followers])
    return (
        <div className="messages">
            <div className="messages__top" style={{ background: `${siteColor}` }}>
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
                {(function () {
                    if (wordsMessageArray && followers && dateMessagesArray && followers.length === dateMessagesArray.length && wordsMessageArray?.length === followers?.length) {
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