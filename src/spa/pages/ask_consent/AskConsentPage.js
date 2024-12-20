import React from 'react';
import BackButton from "../../parts/BackButton";
import "../PagesCommonStyle.css"
import {useTranslation} from "react-i18next";
import HeaderWithInfo from "../../parts/HeaderWithInfo";


const AskConsentPage = ({next, back }) => {

    const {t } = useTranslation();

    return (
        <div className="page-container">
            <BackButton onClick={back} />
            <div className="page-content">
                <HeaderWithInfo headerTitle={t("ask_consent_page.header")}
                                tooltipMessage={t("ask_consent_page.info_text")}
                                warningMessage={t("ask_consent_page.warn_text")}/>

                <p>{t("ask_consent_page.description_text")}</p>
                <button className="next-button" onClick={next}>{t("ask_consent_page.accept_btn")}</button>
                <button className="next-button" onClick={next}>{t("ask_consent_page.reject_btn")}</button>
            </div>
        </div>
    );
};

export default AskConsentPage;
