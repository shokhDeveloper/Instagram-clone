import "../sign.scss";
import React, { useEffect } from "react";
import Instagram from "../../settings/assets/images/Instagram.png"
import { GoogleBtn as Button, Input, UserInstagram, UserInstagramRegister, UserResponseServer, setToken, setUser, useBack, useLoader } from "../../settings";
import { Button as StyledButton } from "../../settings";
import { Link, useLocation } from "react-router-dom";
import { Authentication, Footer } from "../../Components";
import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { useMutation } from "react-query";
import axios from "axios"
import { useDispatch } from "react-redux";
export const Register: React.FC = (): JSX.Element => {
    const {openLoader} = useLoader()
    const {pathname} = useLocation()
    const dispatch = useDispatch()
    const {back, type} = useBack(true)
    const validationSchema = yup.object({
        username: yup.string().required("username is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
        displayName: yup.string().required("Name is required")
    })
    const {register, watch, reset, formState:{errors, isValid}, handleSubmit} = useForm({
        values: {
            email: "",
            displayName: "",
            username: "",
            password: ""
        },
        mode: "all",
        resolver: yupResolver(validationSchema)
    })
    const handleRegister = async (user: UserInstagramRegister):Promise<void> => {
        try{
            const request = await axios.post(process.env.REACT_APP_SERVER + "/register", user)
            if(request.status === 201){
                const {accessToken, user}:UserResponseServer = await request.data
                if(accessToken){
                    openLoader()
                    setTimeout(() => {
                        reset({displayName: "", password: "", email: "" , username: ""})
                        dispatch(setToken(accessToken))
                        dispatch(setUser(user))
                    },2000)
                }
            }
        }catch(error){
            console.log(error)
        }
    } 
    const {mutate} = useMutation((data:UserInstagramRegister) => handleRegister(data))
    const onSubmit = (event:UserInstagram):void => {
        mutate({...event, date: `${new Date().toLocaleString()}`})
    }
    useEffect(() => {
        if(pathname === "/register"){
            window.scrollTo(0, 0)
        }
    },[pathname])
    watch()
    useEffect(() => {
        if(type){ 
            back()
        }
    },[type, back])
    return (
        <>
            <section className="sign">
                <div className="container">
                    <div className="sign__inner">
                        <div className="sign__sign">
                            <img src={Instagram} width={200} height={70} alt="" />
                            <p>Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.</p>
                            <Authentication type={"register"} />
                            <p className="sign__element">
                                ИЛИ
                            </p>
                            <form id="register-form" onSubmit={handleSubmit((event:UserInstagram) => onSubmit(event))}>
                                <label htmlFor="email">
                                    <Input styledType={errors?.email ? "error": ""} {...register("email")} placeholder="Моб. телефон или эл. адрес" id="email" />
                                    {errors?.email ?(
                                        <p className="error__form">
                                            {errors?.email?.message}
                                        </p>
                                    ): ""}
                                </label>
                                <label htmlFor="displayName">
                                    <Input styledType={errors?.displayName ? "error": ""}  {...register("displayName")} placeholder="Имя и фамилия" id="name" />
                                </label>
                                <label htmlFor="username">
                                    <Input styledType={errors?.username ? "error": ""} {...register("username")} placeholder="Имя пользователя" id="username" />
                                </label>
                                <label htmlFor="password">
                                    <Input styledType={errors?.password ? "error": ""} {...register("password")} placeholder="Пароль" id="password" />
                                    {errors?.password ? (
                                        <p className="error__form">{errors?.password?.message}</p>
                                    ): (
                                        ""
                                    )}
                                </label>
                            </form>
                            <p className="sign__discription">Люди, которые пользуются нашим сервисом, могли загрузить вашу контактную информацию в Instagram. <a href="https://www.facebook.com/help/instagram/261704639352628">Подробнее</a> </p>
                            <p className="sign__discription">
                                Регистрируясь, вы принимаете наши <a href="https://help.instagram.com/581066165581870/?locale=ru_RU">Условия, Политику конфиденциальности и Политику в отношении файлов cookie.</a>
                            </p>
                            <StyledButton form="register-form" >Регистрация</StyledButton>
                        </div>
                        <div className="sign__sign">
                            <p>
                                Есть аккаунт? <Link to={"/login"}>Вход</Link>
                            </p>
                        </div>
                        <div className="sign__applications">
                            <p>Установите приложение.</p>
                            <div className="sign_application__inner">
                                <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D12FBDEE0-ED98-4ADA-8598-26F9954E40DA%26utm_campaign%3DsignupPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge%26original_referrer%3Dhttps%253A%252F%252Fwww.google.com%252F">
                                    <img src="https://static.cdninstagram.com/rsrc.php/v3/yr/r/fDjwyLC88oO.png" alt="Instagram-image" />
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D12FBDEE0-ED98-4ADA-8598-26F9954E40DA%26utm_campaign%3DsignupPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge%26original_referrer%3Dhttps%253A%252F%252Fwww.google.com%252F">
                                    <img src="https://static.cdninstagram.com/rsrc.php/v3/yv/r/_UbeIRgTpG-.png" alt="Instagram-image" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer active={true} />
        </>
    )
}