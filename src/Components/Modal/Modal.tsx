import ModalModule from "./modal.module.scss";
import React, { SetStateAction } from "react";

interface ModalInterface  {
    title: string,
    modal: boolean,
    setModal: React.Dispatch<SetStateAction<boolean>>,
    children: React.ReactNode
}
export const Modal:React.FC<ModalInterface> = ({title, setModal, modal, children}):JSX.Element => {
    return(
        <div className={ModalModule.modal__overlay} style={{display: modal ? "flex": "none"}}>
            <div className={ModalModule.modal}>
                <div className={ModalModule.modal__header}>
                    <h3>{title}</h3>
                    <button onClick={() => setModal(false)} className={ModalModule.modal__close.concat(" border-transparent")}>&times;</button>
                </div>
                <div className={ModalModule.modal__body}>
                    {children}
                </div>
            </div>
        </div>
    )
}