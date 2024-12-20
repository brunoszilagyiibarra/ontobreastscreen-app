import React from 'react';
import '../PagesCommonStyle.css';
import {useTranslation} from "react-i18next";
import HeaderWithInfo from "../../parts/HeaderWithInfo";

const WelcomePage = ({ next }) => {

    const {t } = useTranslation();

    return (
        <div className="page-container">
            <div className="page-content">

                <HeaderWithInfo headerTitle={t('welcome_page.header')}
                                tooltipMessage={t("welcome_page.info_text")}/>

                <p>{t('welcome_page.sub_header')}</p>
                <button className="next-button" onClick={next}>{t('welcome_page.next')}</button>
            </div>
        </div>
    );
};

export default WelcomePage;