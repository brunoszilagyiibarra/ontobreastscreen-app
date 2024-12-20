import React, {useState} from 'react';
import '../PagesCommonStyle.css';
import BackButton from "../../parts/BackButton";
import {getPatientRecommendation} from "../../../client/breast-cancer-recommendation-api-client";
import {useTranslation} from "react-i18next";
import HeaderWithInfo from "../../parts/HeaderWithInfo";

const ResultPage = ({ guides, risk, womanUri, back, next }) => {

    const {t } = useTranslation();
    const [selectedOption, setSelectedOption] = useState(''); // State for selected option
    const [recommendationResult, setRecommendationResult] = useState('');

    let midRecSection;
    if(recommendationResult.midRecommendation != null) {
        midRecSection = <div id="midRecSec" className="page-content" style={{marginTop:"20px", marginBottom:"10px", width:"70%", marginLeft:"100px"}}>
            <HeaderWithInfo headerTitle={t("recommendation_page.mid_header")}
                            tooltipMessage={t("recommendation_page.recommendation_info_text")}
                            subheader={true}/>
            <div id="recomm-mid-list-wrapper" style={{textAlign: "left"}}>
            <ul>
                <li>{t('recommendation_page.li.image')} {recommendationResult.midRecommendation.imaging}</li>
                <li>{t('recommendation_page.li.strength')} {recommendationResult.midRecommendation.strength}</li>
                <li>{t('recommendation_page.li.periodicity')} {recommendationResult.midRecommendation.periodicity}</li>
                <li>{t('recommendation_page.li.ages')} {recommendationResult.midRecommendation.forInterval}</li>
            </ul>
            </div>
        </div>
    }

    let highRecSection;
    if (recommendationResult.highRecommendation != null) {
        highRecSection = <div id="highRecSec" className="page-content" style={{marginTop:"20px", marginBottom:"10px", width:"70%", marginLeft:"100px"}}>
            <HeaderWithInfo headerTitle={t("recommendation_page.high_header")}
                            tooltipMessage={t("recommendation_page.recommendation_info_text")}
                            subheader={true}/>
            <div id="recomm-mid-list-wrapper" style={{textAlign: "left"}}>
            <ul>
                <li>{t('recommendation_page.li.image')} {recommendationResult.highRecommendation.imaging}</li>
                <li>{t('recommendation_page.li.strength')} {recommendationResult.highRecommendation.strength}</li>
                <li>{t('recommendation_page.li.periodicity')} {recommendationResult.highRecommendation.periodicity}</li>
                <li>{t('recommendation_page.li.ages')} {recommendationResult.highRecommendation.forInterval}</li>
            </ul>
            </div>
        </div>
    }

    const handleSelect = (event) => {
        setSelectedOption(event.target.value);
        getPatientRecommendation(womanUri, event.target.value)
            .then( res => {
                    setRecommendationResult(res.data)
                }
            )
    };

    return (
        <div className="page-container">
            <BackButton onClick={back}/>
            <div className="page-content">
                <HeaderWithInfo headerTitle={t("recommendation_page.header")}
                                tooltipMessage={t("recommendation_page.info_text")}/>

                <p>{t('recommendation_page.select_guideline')} {risk}</p>

                <select value={selectedOption} onChange={handleSelect} className="option-select">
                    <option value="" disabled>{t('recommendation_page.select_guideline_no_op')}</option>
                    {guides.map(option => (
                        <option key={option.uri} value={option.uri}>{option.prettyName}</option>
                    ))}
                </select>

                {highRecSection}
                {midRecSection}

                <button className="next-button" onClick={next}>{t('recommendation_page.next')}</button>
            </div>
        </div>
    );
};

export default ResultPage;