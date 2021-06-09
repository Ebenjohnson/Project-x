import React, { useEffect } from 'react';
import {Avatar} from "@material-ui/core";
import "../assets/dashboard.css"
import {APP_NAME} from "../config/app";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from 'react-router-dom';

const Header = (props) => {

    return (
        <header className="header-user-dropdown">

            <div className="header-limiter">
                <h1><Link to="/">{APP_NAME}</Link></h1>

                <nav>
                    <Link to="booking">Booking</Link>
                    <Link to="invoice">Invoice</Link>
                    <Link to="settings">Settings</Link>

                </nav>


                <div className="header-user-menu">
                    <Avatar/>
                     <div className="highlight">
                         {props.username}
                         <button href="#"   onClick={props.onLogOut} >Logout</button>
                     </div>
                </div>

            </div>

        </header>
    )
}


export default Header