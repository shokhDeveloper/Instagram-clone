import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { Button, Context, FieldFormik, GoogleBtn, InitialStateInterface, Input, LoginValuesRequest, MyContext, UserGoogle, UserGoogleResponse,  UserPassword, UserResponseServer, auth, googleProvider, setGoogleUser, setToken, setUser, useLoader } from "../../settings";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../Modal";
import { Formik, Form  } from "formik";
import {useNavigate} from "react-router-dom"
import * as yup from "yup"
interface AuthenticationProps {
    type: string,
}
export const Authentication: React.FC<AuthenticationProps> = ({ type }): JSX.Element => {
    const { googleUser }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
    const { googleModal, setGoogleModal }: MyContext = useContext(Context)
    const {openLoader} = useLoader()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { mutate } = useMutation((data:UserGoogleResponse) => handleSign(data))
    const handleGoogle = async () => {
        const request = await signInWithPopup(auth, googleProvider)
        if (request.user) {
            const user:UserGoogle = await request.user 
            if(user){
               let userResponse:UserGoogle  = {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    password: null
                }
                dispatch(setGoogleUser(userResponse))
            }
            
        }
    }
    const initialValues: UserPassword = {
        password: ""
    }
    const validationSchema = yup.object({
        password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required")
    })
    const handleSub =  (data: UserPassword):void => { 
        if (data?.password) {
            let user: UserGoogle = { ...googleUser, password: data.password }
            dispatch(setGoogleUser(user))
        }
    }
    const handleSign = async (data:UserGoogleResponse):Promise<void> => {
        try{
            const request = await axios.post(process.env.REACT_APP_SERVER + `/${type}`, data)
            if(request.status === 200 || request.status ===  201){
                const {accessToken, user}:UserResponseServer = await request.data
                if(accessToken){
                    openLoader()
                    setGoogleModal(false)
                    navigate("/")
                    setTimeout(() => {
                        dispatch(setToken(accessToken))
                        dispatch(setUser(user))
                    },2000)
                }
            }
        }catch(error){
            return Promise.reject(error)
        }
    }
    useEffect(() => {
        if (googleUser.email && !googleUser?.password) {
            setGoogleModal(true)
        } else if (googleUser.email && googleUser.password) {
            let response:UserGoogleResponse = {...googleUser, date: `${new Date().toLocaleString()}`}
            mutate(response)
        }
    }, [googleUser])
    return (
        <>
            <GoogleBtn onClick={handleGoogle}>Continue with Google</GoogleBtn>
            <Modal modal={googleModal} setModal={setGoogleModal} title="Password" >
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSub}>
                   {({errors, touched }) => (
                     <Form id="form">
                     <label htmlFor="password">
                         <FieldFormik styledType={errors?.password && touched?.password ? "error": "" } type="password" placeholder="Пароль" id="password" name="password" />
                     </label>
                     <Button form="form" type="submit">Войти</Button>
                 </Form>
                   )}
                </Formik>
            </Modal>
        </>
    )
}