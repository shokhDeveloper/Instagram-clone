import "./notifications.scss";
import React, { useCallback, useEffect } from "react";
import { AvatarText, FollowerResponse, InitialStateInterface, UserProfileInterface, UserResponseServer, setFollowers } from "../../settings";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CiUser } from "react-icons/ci";

export const Notification: React.FC = (): JSX.Element => {
    const { followers, siteColor }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
    return (
        <div className="notification">
            <div className="notification__top">
                <h3>Уведомления</h3>
                <div className="notification__infos">
                    <p>
                        На этой неделе
                    </p>
                </div>
                <div className="notification_top__inner">
                    {followers?.slice(0, 2)?.map((item: UserProfileInterface) => {
                        let { username, id, full_name }: UserProfileInterface = item
                        return (
                            <div className="notification__item" key={id}>
                                <AvatarText styledType={`${siteColor}`}>
                                    {<CiUser fill={`${siteColor}`} />}
                                </AvatarText>
                                <div>
                                    <p className={`${siteColor}`}>{username}</p>
                                    <p className={`${siteColor}`}> подписался(-ась) </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="notification__inner">
                <p>В этом месяце</p>
                <ul className="notification_inner__list">
                    {followers?.slice(2, followers?.length - 1).map((item: UserProfileInterface) => {
                        let { username }: UserProfileInterface = item

                        return (
                            <li className="notification__item">
                                <AvatarText styledType={`${siteColor}`}>
                                    <CiUser fill={`${siteColor}`} />
                                </AvatarText>
                                <div>
                                    <p className={`${siteColor}`}>{username}</p>
                                    <p className={`${siteColor}`}> подписался(-ась) </p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}