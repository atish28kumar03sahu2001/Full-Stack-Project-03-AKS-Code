// frontend/src/Components/Pages/Header.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import '../styles/Header.css';
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const user = useSelector((state) => state.user);
    const isUserLoggedIn = user || localStorage.getItem('userData');
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    const userId = storedUser ? storedUser._id : '';

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);


    const isSignupPage = location.pathname === "/signup" || location.pathname === "/signin" || location.pathname.startsWith("/user/");

    return (
        <>
            <div className="MBH_HD_DIV">
                <div className="MBH_HD_H_DIV">
                    <Link to="/" className="MBH_HD_H">MailBoxHub</Link>
                </div>
                {!isSignupPage && !isUserLoggedIn && (
                    <div className="MBH_SG_H_DIV">
                        <Link to="/signup" className="MBH_SG_H">SignUp</Link>
                    </div>
                )}
                {isUserLoggedIn && (
                    <div className="MBH_BTNS_DIV">
                        <Link to={`/user/${userId}`} className="MBH_SG_H_MENU">User</Link>
                        <Link to={`/user/${userId}/compose`} className="MBH_SG_H_MENU">Compose</Link>
                        <Link to={`/user/${userId}/inbox`} className="MBH_SG_H_MENU"><span>Inbox </span></Link>
                        <Link to={`/user/${userId}/star`} className="MBH_SG_H_MENU"><span>Star </span></Link>
                        <Link to={`/user/${userId}/trash`} className="MBH_SG_H_MENU"><span>Trash </span></Link>
                        <Link to={`/user/${userId}/sentbox`} className="MBH_SG_H_MENU"><span>Sentbox </span></Link>
                    </div>
                )}
                <div className="ICN_DIV_MENU" onClick={toggleMenu}>
                    {!menuOpen ? (
                        <FaBars className="NAVBAR_BAR" size={30} color="white" />
                    ) : (
                        <RxCross1 className="NAVBAR_BAR" size={30} color="white" />
                    )}
                </div>
                {menuOpen && (
                    <div className="MBH_SG_H_DIV_MENU">
                        {!isUserLoggedIn && (
                            <>
                                <Link to="/signup" className="MBH_SG_H_MENU">SignUp</Link>
                                <Link to="/signin" className="MBH_SG_H_MENU">SignIn</Link>
                                <Link to="/" className="MBH_SG_H_MENU">MailBoxHub</Link>
                            </>
                        )}
                        {isUserLoggedIn && (
                            <>
                                <Link to={`/user/${userId}`} className="MBH_SG_H_MENU">User</Link>
                                <Link to={`/user/${userId}/compose`} className="MBH_SG_H_MENU">Compose</Link>
                                <Link to={`/user/${userId}/inbox`} className="MBH_SG_H_MENU"><span>Inbox </span></Link>
                                <Link to={`/user/${userId}/star`} className="MBH_SG_H_MENU"><span>Star </span></Link>
                                <Link to={`/user/${userId}/trash`} className="MBH_SG_H_MENU"><span>Trash </span></Link>
                                <Link to={`/user/${userId}/sentbox`} className="MBH_SG_H_MENU"><span>Sentbox </span></Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};
