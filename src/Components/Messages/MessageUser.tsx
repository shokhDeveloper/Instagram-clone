import React, { FormEvent, KeyboardEvent, useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AvatarText, ChatBox, ChatText, Context, FollowerResponse, FollowersUser, InitialStateInterface, MyContext, MyText, MyTextBox, Time, UserProfileInterface, YourText, YourTextbox, myMessageInterface, setDateMessagesArray, setMyMessage, setUserMessageText, setUserPage } from "../../settings";
import axios from "axios";
import { LuPhone } from "react-icons/lu";
import { BsCameraVideo } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { GoSmiley } from "react-icons/go";
import { CiImageOn } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa6";
import { EditBox } from "./EditBox";
import { v4 } from "uuid";
export const MessageUser: React.FC = (): JSX.Element => {

    const { siteColor, userMessageIndex, wordsMessageArray, userMessageText, dateMessagesArray, myMessage, userPage }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
    const { sendMessage, setSendMessage, editBox, setEditBox }: MyContext = useContext(Context)
    const [userPageState, setUserPageState] = useState<UserProfileInterface[]>([])
    const dispatch = useDispatch()
    const { user } = useParams()
    const handleGetUser = useCallback(async (): Promise<void> => {
        try {
            if (user) {
                const request = await axios.get(process.env.REACT_APP_INSTAGRAM_SERVER + `/search_users`, {
                    params: {
                        search_query: user
                    },
                    headers: {
                        'X-RapidAPI-Key': process.env.REACT_APP_KEY,
                        'X-RapidAPI-Host': process.env.REACT_APP_HOST

                    }
                }).catch(error => {
                    return Promise.reject(error)
                })
                if (request?.status === 200) {
                    const response: FollowerResponse = await request.data.data
                    if (response.items) {
                        dispatch(setUserPage([response.items[0]]))
                    }
                }
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }, [user])
    const handleSub = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const data = new FormData(form)
        let input = form.querySelector("input") as HTMLInputElement
        if (data.get("message__input")?.toString().length) {
            dispatch(setMyMessage({ message: data.get("message__input")?.toString() as string, id: v4() as string }))
            input.value = ""
            setSendMessage(false)
        }
    }
    const handleKey = (event: KeyboardEvent<HTMLInputElement>): void => {
        let value = (event.target as HTMLInputElement).value
        if (value.length) {
            setSendMessage(true)
        } else {
            setSendMessage(false)
        }
    }
    useEffect(() => {
        handleGetUser()
    }, [handleGetUser])
    useEffect(() => {
        if (dateMessagesArray?.length) {
            dispatch(setUserMessageText(dateMessagesArray[userMessageIndex]))
        }
    }, [dateMessagesArray, user])
    useEffect(() => {
        setUserPageState(userPage)
    }, [userPage])
    useEffect(() => {
        console.log(userPageState)
    }, [userPageState])
    return (
        <div className="message__user">
            <div className="message_user__top" style={{ backgroundColor: siteColor === "black" ? "black" : "white" }}>
                <div className="message_user__data">
                    <AvatarText styledType={`${siteColor}`}>
                        <CiUser fill={`${siteColor}`} />
                    </AvatarText>
                    <h1 className={`${siteColor}`}>{user}</h1>
                </div>
                <ul className="message_user__list">
                    <li>
                        <a className={`${siteColor}`} href="tel:998991457766">
                            <LuPhone />
                        </a>
                    </li>
                    <li>
                        <a className={`${siteColor}`} href="#">
                            <BsCameraVideo />
                        </a>
                    </li>
                </ul>
            </div>
            <div className="message__chat">
                <div className="message_chat__box">
                        {userPageState?.map((item: UserProfileInterface) => {
                            return (
                                <div className="message_user_chat__data">
                                <AvatarText className="avatar__data" styledType={`${siteColor}`}>
                                    <CiUser fill={`${siteColor}`}/>
                                </AvatarText>
                                {item.full_name?.length ? (
                                    <h3 className={`${siteColor}`}>
                                        {item.full_name}
                                    </h3>
                                ): ""}
                                <h4 className={`${siteColor}`}>
                                {item.username}
                                </h4>
                                <button  className={`${siteColor} border-transparent`}>Смотреть профиль</button>
                    </div>
                            )
                        })}
                    <MyTextBox >
                        {myMessage?.slice(0, 1)?.map((item: myMessageInterface) => {
                            if (item.id === "defaultText") {
                                return (
                                    <>
                                        <EditBox id={item.id} />
                                        <MyText className={`${siteColor} my__text`}>
                                            {item.message}
                                        </MyText>
                                </>             
                                )
                            }
                        })}
                    </MyTextBox>
                    <ChatBox>
                        <ChatText styledType={`${siteColor}`}>
                            {(function () {
                                let hours: Time = new Date().toLocaleTimeString().substring(0, 2)
                                let hoursTo: Time = new Date().toLocaleTimeString().substring(2, 5)
                                let result: Time = ''
                                for (let i: number = 0; i < userMessageText?.length; i++) {
                                    if (Number(userMessageText[i]) === 0 || Number(userMessageText[i])) {
                                        result += userMessageText[i]
                                    }
                                }
                                return (
                                    `${String(Number(hours) - Number(result)).concat(hoursTo)}`
                                )
                            }())}
                        </ChatText>
                    </ChatBox>
                    <YourTextbox>
                        <YourText className={`${siteColor} your__text`}>
                            {(function () {
                                if (wordsMessageArray?.length) {
                                    return (
                                        `${wordsMessageArray[userMessageIndex]}`
                                    )
                                }
                            }())}
                        </YourText>
                    </YourTextbox>
                    {myMessage?.slice(1, myMessage.length).map((item: myMessageInterface) => {
                        return (
                            <MyTextBox >
                                <EditBox id={item.id} />
                                <MyText className={`${siteColor} my__text`}>{item.message}</MyText>
                            </MyTextBox>
                        )
                    })}

                    <form className={`message__form  message__form--${siteColor}`} onSubmit={(event: FormEvent<HTMLFormElement>) => handleSub(event)}>
                        <button type="button" className="border-transparent"><GoSmiley /></button>
                        <input autoFocus onKeyUp={(event: KeyboardEvent<HTMLInputElement>) => handleKey(event)} className="border-transparent" type="text" placeholder="Напишите сообщение…" name="message__input" />
                        {!sendMessage ? (
                            <React.Fragment>
                                <button onClick={async () => {
                                    try {
                                        await navigator.mediaDevices.getUserMedia({ audio: true })
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }} type="button" className="border-transparent"><FaMicrophone /></button>
                                <label htmlFor="fileInput">
                                    <input
                                        className="visually-hidden"
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={() => console.log("ishladi")}
                                        id="fileInput"
                                    />
                                    <CiImageOn />
                                </label>
                                <button type="button" className="border-transparent"><FaHeart /></button>
                            </React.Fragment>
                        ) : (
                            <button className="submit__btn border-transparent" type="submit">Отправить</button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}