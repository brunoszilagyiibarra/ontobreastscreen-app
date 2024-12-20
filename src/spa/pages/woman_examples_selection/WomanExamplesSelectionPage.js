import React, { useState } from 'react';
import '../PagesCommonStyle.css';
import BackButton from "../../parts/BackButton";
import {useTranslation} from "react-i18next";
import HeaderWithInfo from "../../parts/HeaderWithInfo";


const WomanExamplesSelectionPage = ({ womanExamples, next, back }) => {

    const [selectedOption, setSelectedOption] = useState('');
    const {t } = useTranslation();

    const handleSelect = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = () => {
        next(selectedOption);
    };

    return (
        <div className="page-container">
            <BackButton onClick={back} />
            <div className="page-content">
                <HeaderWithInfo headerTitle={t("woman_examples_selection_page.header")}
                                tooltipMessage={t("woman_examples_selection_page.info_text")}
                                warningMessage={t("woman_examples_selection_page.warn_text")}/>
                <select value={selectedOption} onChange={handleSelect} className="option-select">
                    <option value="" disabled>{t("woman_examples_selection_page.no_selection")}</option>
                    {womanExamples.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <button className="next-button" onClick={handleSubmit} disabled={!selectedOption}>
                    {t("woman_examples_selection_page.next")}</button>
            </div>
        </div>
    );
};

export default WomanExamplesSelectionPage;
