import  "./modal.scss";
import { useSelector } from "react-redux";
import React, { SetStateAction } from "react";
import { InitialStateInterface } from "../../settings";

interface ModalInterface  {
    title: string,
    modal: boolean,
    setModal: React.Dispatch<SetStateAction<boolean>>,
    children: React.ReactNode,
    active?: boolean,
    discription: string
}
export const Modal:React.FC<ModalInterface> = ({title, setModal, modal, children, active, discription}):JSX.Element => {
    const {siteColor}:InitialStateInterface = useSelector(({Reducer}) => Reducer)
    return(
        <div className={"modal__overlay overlay"} style={{display: modal ? "flex": "none"}}>
            <div className={"modal".concat(` modal--${siteColor}`)}>
                <div className={"modal__header".concat(discription?.length ? " modal_header--active": "")}>
                    <h3 className={siteColor?.toString()}>{title}</h3>
                    {discription?.length ? (
                        <div className="modal_discription__box">
                            <p>{discription}</p>
                        </div>
                    ): ""}
                    {active ? (
                        <button onClick={() => setModal(false)} className={"modal__close".concat(" border-transparent")}>&times;</button>
                    ): ""}
                </div>
                <div className={"modal__body"}>
                    {children}
                </div>
            </div>
        </div>
    )
}