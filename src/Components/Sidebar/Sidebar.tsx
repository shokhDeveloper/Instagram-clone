import "./sidebar.scss";
import Instagram from "../../settings/assets/images/Instagram.png";
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CustomLink } from "../CustomLink";
import { Avatar, AvatarText, Context, InitialStateInterface, MyContext, setInsChangeBg, setMessages, setNotification, setSearchBox } from "../../settings";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegCompass } from "react-icons/fa";
import { BiSolidVideos } from "react-icons/bi";
import { BiMessageRoundedDots } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuPlusCircle } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { IoMoonSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GoMoon } from "react-icons/go";
import { SidebarBack } from "../SidebarBack";
import { SearchboxSidebar } from "../SearchboxSidebar";
import { Notification } from "../Notification";
import { Messages } from "../Messages";

export const Sidebar: React.FC = (): JSX.Element => {
    const { siteColor, user, searchBox, notifications, messages }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
    const {  activeLink, moreBar, setMoreBar, darkModeBox, setDarkModeBox, sidebarActive, sidebarBack, setSidebarBack, setSidebarActive }: MyContext = useContext(Context)
    const [searchText, setSearchText] = useState<string | null>()
    const dispatch = useDispatch()
    const handleChange = (event: ChangeEvent): void => {
        let current = event.target as HTMLInputElement
        if (current.checked) {
            dispatch(setInsChangeBg("black"))
        } else {
            dispatch(setInsChangeBg("white"))
        }
    }
    const fetchData = useCallback( async () => {
        if(!sidebarActive){
            try {
              const result = await new Promise<string>((resolve) => {
                setTimeout(() => {
                  resolve("Поисковый запрос");
                }, 300);
              });
              setSearchText(result)
            } catch (error) {
              console.error("Xatolik sodir bo'ldi:", error);
            }
        }
      },[sidebarActive]);
      const handleSearch = () => {
          dispatch(setNotification(false))
          dispatch(setMessages(false))
        dispatch(setSearchBox(true))
        setSidebarActive(true)
    }
    useEffect(() => {
            fetchData()
    },[fetchData])
    useEffect(() => {
        if(sidebarActive){
            setSearchText("")
        }
    },[sidebarActive])
    return (
        <div className="sidebar__parent">
        <div className={"instagram__sidebar sidebar".concat(sidebarActive ? " sidebar__small" : "")}>
            <div className="container__fluid">
                <div className="sidebar__inner">
                    <div className="sidebar__logo" onClick={() => window.location.reload()}>
                        {!sidebarActive ? (
                            <img style={{ filter: siteColor === "black" ? "invert(1)" : "" }} src={Instagram} width={120} height={70} alt="Instagram-image" />
                        ): (
                           <svg aria-label="Instagram"  className="x1lliihq x1n2onr6 x5n08af" fill={siteColor === "black" ? "#fff": "#000"} height={24} role="img" viewBox="0 0 24 24" width={24}><title>Instagram</title><path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z" /></svg>

                        )}
                    </div>
                    <ul className="sidebar__list">
                        <li className="sidebar__item" onClick={() => setSidebarActive(false)}>
                            <CustomLink to="/"  className={ activeLink.home && !sidebarActive ? `link active__link ${siteColor}`: !activeLink?.home && sidebarActive ? `link sidebar__link_default ${siteColor}`: `link ${siteColor}`}>
                                <AiFillHome />
                                {!sidebarActive && searchText?.length  ?(
                                    "Главная"
                                ): ""}
                            </CustomLink>
                        </li>
                        <li className="sidebar__item" onClick={handleSearch}>
                            <CustomLink to="/search"  className={activeLink?.search && sidebarActive ? `link active__link--sidebar ${siteColor}` : activeLink?.search && !sidebarActive ? `link active__link ${siteColor}` : !activeLink?.search && sidebarActive ? `link sidebar__link_default ${siteColor}`:  `link ${siteColor}`}>
                                <IoSearchOutline />
                                {!sidebarActive && (
                                    <>
                                        {searchText }
                                    </>                                    
                                )}
                            </CustomLink>
                        </li>
                        <li className="sidebar__item" onClick={() => setSidebarActive(false)}>
                            <CustomLink to="/interesting" className={ !activeLink?.interesting && sidebarActive ? `link sidebar__link_default ${siteColor}`: activeLink?.interesting  ? `link active__link ${siteColor} ` : `link ${siteColor}`}>
                                <FaRegCompass />
                                {!sidebarActive && searchText?.length ? (
                                    "Интересное"

                                ): ""}
                                
                            </CustomLink>
                        </li>
                        <li className="sidebar__item" onClick={() => setSidebarActive(false)}>
                            <CustomLink to="/reels" className={activeLink?.reels && !sidebarActive ? `link active__link ${siteColor} ` : !activeLink?.reels && sidebarActive ? `link sidebar__link_default ${siteColor}` :  `link ${siteColor}`}>
                                <BiSolidVideos />
                                {!sidebarActive && searchText?.length ?    (
                                    "Reels"

                                ):""}
                                
                            </CustomLink>
                        </li>
                        <li className="sidebar__item" onClick={() => {
                                dispatch(setSearchBox(false))
                                dispatch(setNotification(false))
                                dispatch(setMessages(true))
                                setSidebarActive(true)
                            }} >
                            <CustomLink to="/messages" className={activeLink?.messages && sidebarActive ? `link active__link--sidebar ${siteColor}`: activeLink?.messages && !sidebarActive ? `link active__link ${siteColor}`: !activeLink?.messages && sidebarActive ? `link sidebar__link_default ${siteColor}` : `link ${siteColor}`}>
                                <BiMessageRoundedDots />
                                {!sidebarActive && searchText?.length ? (
                                    "Сообщения"

                                ): ""}
                                
                            </CustomLink>
                        </li>
                        <li className="sidebar__item" onClick={() => {
                            setSidebarActive(true)
                            dispatch(setSearchBox(false))
                            dispatch(setMessages(false))
                            dispatch(setNotification(true))

                        }}>
                            <CustomLink to="/notifications"  className={activeLink?.notifications && sidebarActive ? `link active__link--sidebar ${siteColor}` : activeLink?.notifications && !sidebarActive ? `link active__link ${siteColor} ` : !activeLink?.notifications && sidebarActive ? `link sidebar__link_default ${siteColor}`:  `link ${siteColor}`}>
                                <IoMdHeartEmpty />
                                {!sidebarActive && searchText?.length ? (
                                    "Уведомления"

                                ): ""}
                            </CustomLink>
                        </li>
                        <li className="sidebar__item" onClick={() => setSidebarActive(false)}>
                            <CustomLink to="/create" className={activeLink?.create && sidebarActive ? `link active__link ${siteColor} ` : !activeLink?.create && sidebarActive ? `link sidebar__link_default ${siteColor}`: `link ${siteColor}`}>
                                <LuPlusCircle />
                                {!sidebarActive && searchText?.length ? (
                                    "Создать"

                                ): ""}
                            </CustomLink>
                        </li>
                        <li className="sidebar__item" onClick={() => setSidebarActive(false)}>
                            <CustomLink to="/profile" className={activeLink?.profile ? `link active__link ${siteColor}` : !activeLink?.profile && sidebarActive ? `link sidebar__link_default ${siteColor}`:  `link ${siteColor}`}>
                                {(function () {
                                    if (user?.displayName === "Shohijahon Musinkulov") {
                                        return (
                                            <Avatar src={user?.photoURL ? user.photoURL : ""} alt="Instagram-image" />
                                        )
                                    } else {
                                        let name: string = user?.displayName?.split(" ").slice(0, 1).join(" ").substring(0, 1) as string;
                                        let lastname: string = user?.displayName?.split(" ").slice(1, 2).join(" ").substring(0, 1) as string;
                                        return (
                                            <AvatarText styledType={siteColor as string} >{name + lastname}</AvatarText>
                                        )
                                    }
                                }())}
                                {!sidebarActive && searchText?.length ?  (
                                    "Профиль"
                                ): ""} </CustomLink>
                        </li>
                    </ul>
                    <ul className="sidebar__bottom" >
                        <li className="sidebar__item">
                            <a href="#"
                                onClick={() => setMoreBar(true)}
                                className={sidebarActive ? `link ${siteColor} sidebar__link_default`: `link ${siteColor} more__link` }
                            >
                                <GiHamburgerMenu 
                                 />
                                {!sidebarActive && searchText?.length ? (
                                    "Ещё"

                                ): ""}
                            </a>
                            <div className={`bar__more more__link ${siteColor === "white" ? "bar__active" : ""} `} style={{ display: moreBar ? "block" : "none", background: siteColor === "black" ? "#242526" : "#fff" }}>
                                {!darkModeBox ? (
                                    <>
                                        <ul className="more__list">
                                            <li className={`${siteColor === "black" ? "more__item" : "more__item more__item--active"}`}>
                                                <NavLink  to={"/settings"} className={`more__link ${siteColor} `}>
                                                    <IoIosSettings className={"more__link"} />
                                                    Settings</NavLink>
                                            </li>
                                            <li className={`${siteColor === "black" ? "more__item" : "more__item more__item--active"} `}>
                                                <a href="#" onClick={() => setDarkModeBox(true)} className={`more__link ${siteColor}`}>
                                                    <IoMoonSharp className={"more__link"} style={{ transform: "rotateZ(-90deg)" }} />
                                                    Переключить режим
                                                </a>
                                            </li>
                                            <li className={`${siteColor === "black" ? "more__item" : "more__item more__item--active"} `}>
                                                <a href="#" className={`more__link ${siteColor}`}>
                                                    <CiLogout className={"more__link"} />
                                                    Выйти
                                                </a>
                                            </li>
                                        </ul>
                                    </>
                                ) : (
                                    <div className="more_dark__box more__link">
                                        <div className="more_dark__header more__link">
                                            <div className="more__link">
                                                <button onClick={() => setDarkModeBox(false)} className={`more__link prev__bar border-transparent ${siteColor}`}><MdKeyboardArrowLeft className="more__link" /></button>
                                                <p className={`${siteColor}`}>Переключить режим</p>
                                            </div>
                                            <GoMoon className={`${siteColor}`} />
                                        </div>
                                        <ul className="more_dark__body">
                                            <li className={`${siteColor === "black" ? "more__item" : "more__item more__item--active"} `}>
                                                <p className={`${siteColor}`}>Ночной режим</p>
                                                <input onChange={handleChange} defaultChecked={siteColor === "black" ? true : false} className="more__link" type="checkbox" />
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <SidebarBack>
            {searchBox ? (
                <SearchboxSidebar/>
            ): notifications ? (
                <Notification/>
           ):  messages ? (
            <Messages/>
           ): ""}
        </SidebarBack>
        </div>
    )
}