import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
interface backHooks {
    back:(event?: KeyboardEvent) => void,
    type: boolean
}
export const useBack  = (type: boolean):backHooks => {
    const navigate = useNavigate()
    const handleKey = (event:KeyboardEvent | undefined):void => {
        console.log(event?.key)
        if(event?.key?.trim() === "Escape"?.trim() && type ){
            navigate(-1)
        }
    }
    useEffect(() => {
        if(type){
            window.addEventListener("keyup", handleKey)
            return () => window.removeEventListener("keyup", handleKey)
        }
    },[type])
    return {back: handleKey, type: false}
}