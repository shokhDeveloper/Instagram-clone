import React, { useContext } from "react";
import { Context, InitialStateInterface, MyContext, setDeleteId, setDeleteMessage } from "../../settings";
import { useDispatch, useSelector } from "react-redux";
interface EditProps {
    id: string
}
export const EditBox: React.FC<EditProps> = ({id}): JSX.Element => {
    const { siteColor }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
    const { editBox, setEditBox, setDeleteModal }: MyContext = useContext(Context)
    const dispatch = useDispatch()
    const handleDeleteMessage = (event:React.MouseEvent<HTMLButtonElement>):void => {
        setDeleteModal(true)
        setEditBox(false)
        dispatch(setDeleteId(id))
    } 
    const handleMouse = (event: React.MouseEvent<HTMLDivElement>):void => {
        setTimeout(() => {
            setEditBox(false)
        }, 300) 
    }
    return (
        <>
            <div className="edit__box" onMouseLeave={(event:React.MouseEvent<HTMLDivElement>) => handleMouse(event)} >
                {!editBox ? (
                    <button onClick={() => setEditBox(true)} className={`border-transparent edit__btn edit_btn--${siteColor}`}>...</button>
                ) : (
                    <div className="edit_box__inner">
                        <button className={`${siteColor} edit_message__btn border-transparent`} onClick={(event:React.MouseEvent<HTMLButtonElement>) => handleDeleteMessage(event)}>Отменить отправку</button>
                    </div>
                )}
            </div>
        </>
    )
}