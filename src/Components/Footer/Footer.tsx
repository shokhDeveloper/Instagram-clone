import FooterStyle from "./footer.module.scss";
import React from "react"
import { NavLink } from "react-router-dom"
interface FooterProps {
    active: boolean
}
export const Footer: React.FC<FooterProps> = ({active}): JSX.Element => {
    let year:number = new Date().getFullYear();
    return (
        <footer className={FooterStyle.instagram__footer.concat(active ? "active__footer" : "")}>
            <div className="container">
                <div className={FooterStyle.footer__inner}>
                    <ul className={FooterStyle.footer__links}>
                        <li className="footer__list">
                            <NavLink className="footer__link" to={"/meta"}>Meta</NavLink>
                        </li>
                        <li className="footer__list">
                            <NavLink className="footer__link" to={"/information"}>Информация</NavLink>
                        </li>
                        <li className="footer__list">
                            <NavLink className="footer__link" to={"/blog"}>Блог</NavLink>
                        </li>
                        <li className="footer__list">
                            <NavLink className="footer__link" to={"/vacancies"}>Вакансии</NavLink>
                        </li>
                        <li className="footer__list">
                            <NavLink className="footer__link" to={"/help"}>Помощь</NavLink>
                        </li>
                        <li className="footer__list">
                            <NavLink className="footer__link" to={"/API"}>API</NavLink>
                        </li>
                        <li className="footer__list">
                            <NavLink className="footer__link" to={"/confidentiality"}>Конфиденциальность</NavLink>
                        </li>
                        <li className="footer__list">
                            <NavLink className="footer__link" to={"/"}>Условия</NavLink>
                        </li>
                        <li className="footer__list">
                            <NavLink className="footer__link" to={"/meta"}>Meta</NavLink>
                        </li>
                        <li className="footer__list">
                            <NavLink className="footer__link" to={"/information"}>Информация</NavLink>
                        </li>
                        <li className="footer__list">
                            <NavLink className="footer__link" to={"/blog"}>Блог</NavLink>
                        </li>
                        <li className="footer__list">
                            <NavLink className="footer__link" to={"/vacancies"}>Вакансии</NavLink>
                        </li>
                        <li className="footer__list">
                            <NavLink className="footer__link" to={"/help"}>Помощь</NavLink>
                        </li>
                        <li className="footer__list">
                            <NavLink className="footer__link" to={"/API"}>API</NavLink>
                        </li>
                        <li className="footer__list">
                            <NavLink className="footer__link" to={"/confidentiality"}>Конфиденциальность</NavLink>
                        </li>
                        <li className="footer__list">
                            <NavLink className="footer__link" to={"/"}>Условия</NavLink>
                        </li>
                    </ul>
                    <div className={FooterStyle.footer__bottom}>
                        <select className="footer__select border-transparent"   >
                            <option value="rus">Русский</option>
                            <option value="en">English</option>
                            <option value="deutsch">Deutsch</option>
                        </select>
                        <p>&copy; {year} Instagram from Meta</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}