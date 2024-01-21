import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { Context, FollowerResponse, GlobalStyles, InitialStateInterface, MyContext, setFollowers, setMainProfile, setMessages, setNotification, setSearchBox, useLoader } from "./settings";
import { Home } from "./Home";
import { Login, PubLicHome, Register } from "./Public";
import React, { useCallback, useContext, useEffect } from "react";
import { Loader } from "./Components";
import axios from "axios";
function App() {
  const { token, loader, mainProfile, user, followers }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
  const { setMoreBar, setDarkModeBox, setSidebarActive, setEditBox, editBox }: MyContext = useContext(Context)
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { openLoader } = useLoader()
  useEffect(() => {
    if (loader) {
      openLoader()
    }
  }, [])
  const handleGetAccount = useCallback(async (): Promise<void> => {
    // if(!mainProfile?.id && user?.displayName === "Shohijahon Musinkulov"){
    //   try{
    //     const request = await axios.get(process.env.REACT_APP_INSTAGRAM_SERVER + "/search_users", {
    //       params:{
    //         search_query: "shokhijakhon_dev"
    //       },
    //       headers: {
    //         'X-RapidAPI-Key': process.env.REACT_APP_KEY,
    //         'X-RapidAPI-Host': process.env.REACT_APP_HOST
    //       }
    //     })
    //     if(request.status === 200){
    //       const response = await request.data
    //       dispatch(setMainProfile(response?.data?.items[0]))
    //     }
    //   }catch(error){
    //     return Promise.reject(error)
    //   }      
    // }
  }, [mainProfile, user])
  useEffect(() => {
    handleGetAccount()
  }, [handleGetAccount])
  const handleGetFollowers = useCallback(async (): Promise<void> => {
    try {
      if (!followers?.length) {
        const request = await axios.get(process.env.REACT_APP_INSTAGRAM_SERVER + "/followers", {
          params: {
            username_or_id_or_url: "shokhijakhon_dev"
          },
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_HOST
          }
        })
        if (request?.status === 200) {
          const response: FollowerResponse = await request.data.data
          if (response?.items) {
            dispatch(setFollowers(response.items))
          }
        }
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }, [followers])
  useEffect(() => {
    handleGetFollowers()
  }, [handleGetFollowers])
  const handleClick = (event: Event) => {
    const elTarget = event.target as HTMLElement
    if (!elTarget.matches(".more__link")) {
      setMoreBar(false)
      setDarkModeBox(false)
    }
  }
  useEffect(() => {
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])
  useEffect(() => {
    let regexNotification = new RegExp("notifications", "gi")
    let regexSearch = new RegExp("search", "gi")
    let regexMessages = new RegExp("messages", "gi")
    let regexMessagesPage = new RegExp("/message-send/", "gi")
    if (pathname.match(regexNotification) || pathname.match(regexSearch) || pathname.match(regexMessages) || pathname.match(regexMessagesPage)) {
      setSidebarActive(true)
    }
    if (pathname.match(regexNotification)) {
      dispatch(setNotification(true))
    } else if (pathname.match(regexSearch)) {
      dispatch(setSearchBox(true))
    } else if (pathname.match(regexMessages) || pathname.match(regexMessagesPage)) {
      dispatch(setMessages(true))
    } else {
      dispatch(setMessages(false))
      dispatch(setSearchBox(false))
      dispatch(setNotification(false))
      setSidebarActive(false)
    }
  }, [pathname])  
  return (
    <main className="instagram">
      {loader ? (
        <Loader />
      ) : (
        <Routes>
          {token ? (
            <>
              <Route path="/*" element={<Home />} />
            </>
          ) : (
            <>
              <Route path="/" element={<PubLicHome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
          <Route path="*" element={<Navigate to={"/"} replace={true} />} />
        </Routes>
      )}

      <GlobalStyles />
    </main>
  );
}

export default App;
