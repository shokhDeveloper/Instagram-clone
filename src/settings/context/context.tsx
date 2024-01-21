import React, { createContext, useState } from "react";
import { FollowersUser } from "../Types";
type optionalGeneric<T> = T | undefined
export interface MyContext  {
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    carouselActive: boolean,
    setCarouselActive: React.Dispatch<React.SetStateAction<boolean>>,
    disabledLogin: boolean,
    setDisabledLogin: React.Dispatch<React.SetStateAction<boolean>>,
    googleModal: boolean,
    setGoogleModal: React.Dispatch<React.SetStateAction<boolean>>,
    activeLink: Record<string, boolean>,
    setActiveLink: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
    moreBar: boolean,
    setMoreBar: React.Dispatch<React.SetStateAction<boolean>>
    darkModeBox: boolean,
    setDarkModeBox: React.Dispatch<React.SetStateAction<boolean>>
    sidebarActive: boolean,
    setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>,
    sidebarBack: boolean,
    setSidebarBack: React.Dispatch<React.SetStateAction<boolean>>,
    sendMessage: boolean,
    setSendMessage: React.Dispatch<React.SetStateAction<boolean>>
    editBox: boolean,
    setEditBox: React.Dispatch<React.SetStateAction<boolean>>,
    deleteModal: boolean,
    setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
    filterData: FollowersUser[] | null,
    setFilterData: React.Dispatch<React.SetStateAction<FollowersUser[] | null>>
    comment:boolean,
    setComment: React.Dispatch<React.SetStateAction<boolean>>
    commentId: string | null,
    setCommentId: React.Dispatch<React.SetStateAction<string | null >>,
    save: boolean,
    setSaveData: React.Dispatch<React.SetStateAction<boolean>>
}
export const Context = createContext<MyContext | any | undefined>(null)
export interface ContextProviderProps  {
    children: React.ReactNode
}
export const ContextProvider:React.FC<ContextProviderProps> = ({children}):JSX.Element => {
    const [modal, setModal] = useState<boolean>(false)
    const [carouselActive, setCarouselActive] = useState<boolean>(true)
    const [disabledLogin, setDisabledLogin] = useState<boolean>(true)
    const [googleModal, setGoogleModal] = useState<boolean>(false)
    const [activeLink, setActiveLink] = useState<Record<string, boolean>>({})
    const [moreBar, setMoreBar] = useState<boolean>(false)
    const [darkModeBox, setDarkModeBox] = useState<boolean>(false)
    const [sidebarActive, setSidebarActive] = useState<boolean>(false)
    const [sidebarBack, setSidebarBack] = useState<boolean>(false)
    const [sendMessage, setSendMessage] = useState<boolean>(false)
    const [editBox, setEditBox] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [filterData, setFilterData] = useState<FollowersUser[] | null>(null)
    const [comment, setComment] = useState<boolean>(false)
    const [commentId, setCommentId] = useState<string | null>(null)
    const [save, setSaveData] = useState<boolean>(false)
    const myContextState: MyContext = {
        modal, setModal,
        carouselActive,
        setCarouselActive,
        disabledLogin,
        setDisabledLogin,
        googleModal,
        setGoogleModal,
        activeLink,
        setActiveLink,
        moreBar,
        setMoreBar,
        darkModeBox, setDarkModeBox,
        sidebarActive, setSidebarActive,
        sidebarBack, setSidebarBack,
        sendMessage, setSendMessage,
        editBox, setEditBox,
        deleteModal, setDeleteModal,
        filterData, setFilterData,
        comment, setComment,
        commentId, setCommentId,
        save, setSaveData
    }
    return(
        <Context.Provider value={myContextState}>
            {children}  
        </Context.Provider>
    )
}