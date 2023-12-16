import LoaderStyles from "./loader.module.scss";
import React from "react";
import InstagramLogo from "../../settings/assets/images/InstagramLogo.png"
import InstagramMeta from "../../settings/assets/images/Instagram-Meta-Logo-PNG-1.png";
export const Loader:React.FC = ():JSX.Element => {
    return(
        <div className={LoaderStyles.instagram__loader}>
            <div className={LoaderStyles.loader__inner}>
                <img src={InstagramLogo} width={70} height={70} alt="Instagram-image" />
                <img src={InstagramMeta} width={150} alt="Instagram Image" />
            </div>
        </div>
    )
}