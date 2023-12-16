import React, { useContext } from "react";
import Instagram from "../../settings/assets/images/Instagram.png";
import { Button, Context, FieldFormik, GoogleBtn, Input, LoginErrors, LoginValues, LoginValuesRequest, MyContext, UserResponseServer, setToken, setUser, useLoader } from "../../settings";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useMutation } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Authentication } from "../../Components";
// import { Authentication } from "../../Components";
export const LoginForm: React.FC = (): JSX.Element => {
    const {disabledLogin, setDisabledLogin}:MyContext = useContext(Context)
    const dispatch = useDispatch()
    const { openLoader } = useLoader()
    const initialValues: LoginValues = {
        email: "",
        password: ""
    }
    const validationSchema = yup.object({
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required")
    })
    const handleLoginUser = async (data: LoginValuesRequest): Promise<void> => {
        try {
            const request = await axios.post(process.env.REACT_APP_SERVER + "/login", data)
            if (request.status === 200) {
                const { accessToken, user }: UserResponseServer = await request.data
                if (accessToken) {
                    openLoader()
                    setTimeout(() => {
                        dispatch(setToken(accessToken))
                        dispatch(setUser(user))
                    }, 2000)
                }
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }
    const { mutate } = useMutation((data: LoginValuesRequest) => handleLoginUser(data))
    const handleSub = (data: LoginValues) => {
        mutate({ ...data, date: `${new Date().toLocaleString()}` })
    }
    const handleDisabled = (data: LoginValues, errors:LoginErrors):void => {
        if(!data.email.length || !data.password.length! || errors?.email || errors?.password){
            setDisabledLogin(true)
        }else{
            setDisabledLogin(false)
        }
    }
    return (
        <div className="sign__inner">
            <div className="sign__sign">
                <img src={Instagram} width={200} height={70} alt="Instagram-Image" />
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(login: LoginValues) => handleSub(login)}>
                    {({ errors, touched, values  }) => {
                        console.log(errors)
                        handleDisabled(values, errors)
                        return(
                        <Form className="login__form">
                            <label htmlFor="email">
                                <FieldFormik  styledType={errors?.email && touched?.email ? "error": ""} placeholder="Моб. телефон или эл. адрес" name="email" id="email" />
                            </label>
                            <label htmlFor="password">
                                <FieldFormik styledType={errors?.password && touched?.password ? "error": ""} placeholder="Пароль" id="password" name="password" />
                            </label>
                            <Button styledDisabled={disabledLogin} disabled={disabledLogin} type="submit">Войти</Button>
                            <p className="sign__element login__element">
                                ИЛИ
                            </p>
                        </Form>
                    )}}
                </Formik>
                <Authentication type="login" />
            </div>
            <div className="sign__sign login__sign ">
                <p>
                    У вас ещё нет аккаунта ? <Link to={"/register"}>Зарегистрироваться</Link>
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
    )
}