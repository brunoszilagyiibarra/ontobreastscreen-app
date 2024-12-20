import React from 'react';
import '../PagesCommonStyle.css';
import BackButton from "../../parts/BackButton";
import {useTranslation} from "react-i18next";
import HeaderWithInfo from "../../parts/HeaderWithInfo";

const RiskCalculationResultPage = ({ riskCalcResult, back, next }) => {
    const {t } = useTranslation();


    let riskTenYears;
    if(riskCalcResult.riskCalculation.riskTenYears) {
        riskTenYears =
            <li>{t("risk_calculation_result_page.li.risk_10a")} {riskCalcResult.riskCalculation.riskTenYears}%</li>
    }


    let riskAllLife;
    if(riskCalcResult.riskCalculation.riskAllLife) {
        riskAllLife =
            <li>{t("risk_calculation_result_page.li.risk_lifetime")} {riskCalcResult.riskCalculation.riskAllLife}%</li>
    }

    return (
        <div className="page-container">
            <BackButton onClick={back}/>
            <div className="page-content">
                <HeaderWithInfo headerTitle={t("risk_calculation_result_page.header")}
                                tooltipMessage={t("risk_calculation_result_page.info_text")}/>

                <h3>{t("risk_calculation_result_page.risk_subheader")} {riskCalcResult.riskCalculation.riskModel} - {riskCalcResult.riskLevel}</h3>
                <div id="risk-list-wrapper" className="page-content" style={{textAlign: "left", marginTop:"20px", marginBottom:"10px"}}>
                    <ul>
                        <li>{t("risk_calculation_result_page.li.risk_model")} {riskCalcResult.riskCalculation.riskModel}</li>
                        <li>{t("risk_calculation_result_page.li.calculator")} {riskCalcResult.riskCalculation.riskModelCalculator}</li>
                        {riskTenYears}
                        {riskAllLife}
                    </ul>
                </div>
                <button className="next-button" onClick={next}>{t("risk_calculation_result_page.next")}</button>
            </div>

        </div>
    );
};

export default RiskCalculationResultPage;