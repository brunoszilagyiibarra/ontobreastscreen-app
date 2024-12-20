import React, {useState} from 'react';
import '../PagesCommonStyle.css';
import BackButton from "../../parts/BackButton";
import {useTranslation} from "react-i18next";
import HeaderWithInfo from "../../parts/HeaderWithInfo";


const RiskModelSelectionPage = ({ riskModels, next, back }) => {

    const [selectedOption, setSelectedOption] = useState('');
    const {t } = useTranslation();
    const [detailSectionLoaded, setDetailSectionLoaded] = useState(false);
    const itemMappings = new Map(riskModels.map(op => [op.uri, op.prettyName]));
    const [disabledSubmit, setDisabledSubmit] = useState(false);

    let helpMap = new Map([
        ["http://purl.org/ontology/breast_cancer_recommendation#IBIS_model", t('risk_model_selection_page.ibis_help')],
        ["http://purl.org/ontology/breast_cancer_recommendation#Gail_model", t('risk_model_selection_page.gail_help')],
        ["http://purl.org/ontology/breast_cancer_recommendation#ACS_model", t('risk_model_selection_page.acs_help')],
        ["http://purl.org/ontology/breast_cancer_recommendation#UY_model", t('risk_model_selection_page.mlu_msp_help')]
    ]);

    const handleSelect = (event) => {
        setSelectedOption(event.target.value);
        setDetailSectionLoaded(true);

        if(event.target.value === "http://purl.org/ontology/breast_cancer_recommendation#Gail_model") {
            setDisabledSubmit(true)
            alert(t('risk_model_selection_page.model_disabled', {modelName: itemMappings.get(event.target.value)} ) );
        } else {
            setDisabledSubmit(false)
        }
    };

    const handleSubmit = () => {
        next(itemMappings.get(selectedOption), selectedOption);
    };

    let detailSectionPanel;
    if(detailSectionLoaded) {

        let message = helpMap.get(selectedOption);

        if(!message) {
            message = t('risk_model_selection_page.unknown_help');
        }

        detailSectionPanel = <div className="page-content" style={{overflowY: "auto", maxHeight: "450px"}}>
            {message.split('\n').map((line, index) => (
                <p key={index} dangerouslySetInnerHTML={{__html: line}} style={{textAlign: "left"}}/>
            ))}
        </div>
    }


    return (
        <div className="page-container" >
            <BackButton onClick={back} />
            <div className="page-content">
                <HeaderWithInfo headerTitle={t("risk_model_selection_page.header")}
                                tooltipMessage={t("risk_model_selection_page.info_text")}/>

                <select value={selectedOption} onChange={handleSelect} className="option-select" style={{fontSize:"1.2em"}}>
                    <option value="" disabled>{t("risk_model_selection_page.no_selection")}</option>
                    {riskModels.map(option => (
                        <option key={option.uri} value={option.uri}>{option.prettyName}</option>
                    ))}
                </select>

                <button className="next-button" onClick={handleSubmit} disabled={!selectedOption || disabledSubmit}>
                    {t("risk_model_selection_page.next")}</button>

                {detailSectionPanel}
            </div>
        </div>
    );
};

export default RiskModelSelectionPage;
