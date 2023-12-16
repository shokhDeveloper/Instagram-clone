import React, { createContext, useState } from "react";

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
    setSidebarBack: React.Dispatch<React.SetStateAction<boolean>>
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
    
    const myContextState: MyContext = {
        modal,
        setModal,
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
        sidebarBack, setSidebarBack
    }
    return(
        <Context.Provider value={myContextState}>
            {children}
        </Context.Provider>
    )
}