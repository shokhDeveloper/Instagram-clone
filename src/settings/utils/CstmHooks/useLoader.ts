import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { InitialStateInterface, setCloseLoader, setOpenLoader } from "../../redux"

export const useLoader = () => {
    const {loader}:InitialStateInterface = useSelector(({Reducer}) => Reducer)
    const dispatch = useDispatch()
    const handleOpenLoader = ():void => {
        dispatch(setOpenLoader(true))
    }
    const handleCloseLoader = ():void => {
        dispatch(setCloseLoader(false))
    }
    useEffect(() => {
        if(loader){
            setTimeout(() => {
                handleCloseLoader()
            }, 2000)    
        }
    },[loader])
    return {openLoader: handleOpenLoader}
}