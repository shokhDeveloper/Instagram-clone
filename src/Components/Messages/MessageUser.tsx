import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AvatarText, ChatBox, ChatText, FollowerResponse, FollowersUser, InitialStateInterface, MyText, MyTextBox, Time, YourText, YourTextbox, setDateMessagesArray, setUserMessageText, setUserPage } from "../../settings";
import axios from "axios";
import { LuPhone } from "react-icons/lu";
import { BsCameraVideo } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { GoSmiley } from "react-icons/go";
import { CiImageOn } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa6";

export const MessageUser: React.FC = (): JSX.Element => {
    const { siteColor, userMessageIndex, wordsMessageArray, userMessageText, dateMessagesArray }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
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
    useEffect(() => {
        handleGetUser()
    }, [handleGetUser])
    useEffect(() => {
        if(dateMessagesArray?.length){
            dispatch(setUserMessageText(dateMessagesArray[userMessageIndex]))
        }
    },[dateMessagesArray, user])
    return (
        <div className="message__user">
            <div className="message_user__top" style={{backgroundColor: siteColor === "black" ? "black": "white"}}>
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
                <MyTextBox>
                <MyText className={`${siteColor} my__text`}>Hove are you</MyText>
                </MyTextBox>
                <ChatBox>
                    <ChatText styledType={`${siteColor}`}>
                        {(function(){
                            let hours:Time =new Date().toLocaleTimeString().substring(0, 2)
                            let hoursTo: Time = new Date().toLocaleTimeString().substring(2, 5)
                            let result:Time = ''
                            for(let i:number =  0; i<userMessageText?.length; i++){
                                if(Number(userMessageText[i]) === 0 || Number(userMessageText[i])){
                                    result += userMessageText[i]
                                }
                            }
                            return(
                                `${String(Number(hours)-Number(result)).concat(hoursTo)}`
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
                <form className={`message__form ${siteColor}`} >
                    <button><GoSmiley/></button>
                     <input type="text" placeholder="Напишите сообщение…" />
                        <button><FaMicrophone/></button>
                        <button><CiImageOn/></button>
                        <button><FaHeart/></button>
                </form>
                </div>
            </div>
        </div>
    )
}