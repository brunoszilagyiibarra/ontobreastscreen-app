import React, {useState} from 'react';
import BackButton from "../../parts/BackButton";
import "../PagesCommonStyle.css"
import {useTranslation} from "react-i18next";
import HeaderWithInfo from "../../parts/HeaderWithInfo";


const RecommendationFeedbackPage = ({next, back }) => {

    const {t } = useTranslation();
    const [text, setText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleAccept = (event) => {
       next();
    };

    const handleReject = (event) => {
        next();
    };

    return (
        <div className="page-container">
            <BackButton onClick={back} />
            <div className="page-content">
                <HeaderWithInfo headerTitle={t("recommendation_feedback_page.header")}
                                tooltipMessage={t("recommendation_feedback_page.info_text")}
                                warningMessage={t("recommendation_feedback_page.warn_text")}/>

                <form>

                    <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                        <label htmlFor="comments-area">{t("recommendation_feedback_page.area_text")}</label>
                        <textarea
                            id="comments-area"
                            value={text}
                            onChange={handleChange}
                            rows="4"
                            cols="50"
                            style={{resize: "none"}}
                            placeholder={t("recommendation_feedback_page.area_default_text")}
                        />
                    </div>
                </form>
                <div>
                    <button className="next-button"
                            onClick={handleAccept}>{t("recommendation_feedback_page.accept_btn")}</button>
                    <button className="next-button"
                            onClick={handleReject}>{t("recommendation_feedback_page.reject_btn")}</button>
                </div>
            </div>
        </div>
    );
};

export default RecommendationFeedbackPage;
