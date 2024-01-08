import "./home.scss"
import React, { useContext, useEffect } from "react";
import { DefaultPage, MessageUser, Modal, Sidebar, SidebarBack } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { Context, InitialStateInterface, MyContext, setDeleteMessage, setInsChangeBg } from "../settings";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages";

export const Home: React.FC = (): JSX.Element => {
    const { loader, siteColor, deleteMessageId }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
    const {  setDeleteModal, deleteModal }: MyContext = useContext(Context)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!loader && !siteColor) {
            dispatch(setInsChangeBg("black"))
        }
    }, [loader, siteColor])
    useEffect(() => {
        if (siteColor) {
            document.body.style.backgroundColor = siteColor
        }
    }, [siteColor])
    return (
        <>
            <section className="home">
                <div className="home__inner">
                    <Sidebar />
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/search" element={<HomePage />} />
                            <Route path="/messages" element={<DefaultPage/>}/>
                            <Route path="/message-send/:user" element={<MessageUser />} />
                        </Routes>
                    </div>
                </div>
            </section>
            <Modal modal={deleteModal} setModal={setDeleteModal} title="Отменить отправку сообщения?" discription={"This will remove the message for everyone but people may have seen it already. Unsent messages may still be included if the conversation is reported."}>
                <div className="modal__btn_box">
            <button onClick={() => {
                dispatch(setDeleteMessage(deleteMessageId))
                setDeleteModal(false)
            }} className="border-transparent">
                    Отменить отправку
                </button>
                <button className={"border-transparent".concat(` ${siteColor}`)} onClick={() => setDeleteModal(false)}>
                    Отмена
                </button>
                </div>
            </Modal>
        </>
    )
}