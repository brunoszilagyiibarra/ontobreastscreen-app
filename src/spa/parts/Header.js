import React from 'react';
import './Header.css'; // Import the CSS file for styling
import appLogo from './app-logo.png'
import {useTranslation} from "react-i18next";

const Header = () => {

    const {t } = useTranslation();

    return (
        <div>
            <header className="app-header">
            </header>
            <div className="app-title">
                <h1>{t("app_header.title")}</h1>
                <img src={appLogo} className="app-image"/>
            </div>
        </div>

    );
};

export default Header;
