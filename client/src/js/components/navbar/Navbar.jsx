
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import Logo from '../../../assets/img/logo.svg'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../reducers/userReducer";


const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    return (
    <div className="navbar">
        <div className="container">
        <Link to="/"><img src={Logo} alt="" className="navbar__logo" /></Link>
            <div className="navbar__header">app</div>
            {!isAuth && <div className="navbar__registration"><Link to="/editor">Редактор кода</Link></div>}
            {!isAuth && <div className="navbar__login"><Link to="/login">Войти</Link></div>}
            {!isAuth && <div className="navbar__registration"><Link to="/registration">Регистрация</Link></div>}
            {isAuth && <div className="navbar__login" onClick={() => dispatch(logout())}>Выход</div>}
        </div>
    </div>
    );
};

export default Navbar