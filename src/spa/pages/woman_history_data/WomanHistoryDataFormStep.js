import React, {useEffect} from 'react';
import BackButton from "../../parts/BackButton";
import {useTranslation} from "react-i18next";
import '../PagesCommonStyle.css'
import FormFields from "../../parts/FormFields";
import getCurrentTime from "../../parts/CurrentTime";

export default function WomanHistoryDataFormStep({selectedModel, sectionDetail, stepNro, stepsTotal, next, prev, reportDataChange, valueHolder}) {

    const {t} = useTranslation();

    const handleNext = () => {
        next();
    };

    const handlePrev = () => {
        prev();
    };

    // Log on mount and unmount
    useEffect(() => {
        console.log(`[${getCurrentTime()}] WomanHistoryDataFormStep Component mounted`);

        return () => {
            console.log(`[${getCurrentTime()}] WomanHistoryDataFormStep Component will unmount`);
        };
    }, []);

    let nextButtonText = t('woman_history_data_step_page.next')
    if (stepNro === stepsTotal) {
        nextButtonText = t('woman_history_data_step_page.submit');
    }

    return (
        <div className="page-container">
            <BackButton onClick={handlePrev}/>
            <div className="page-content">
                <div>
                    <h1>{t('woman_history_data_step_page.section_subheader', {section: sectionDetail.sectionName, model: selectedModel})}</h1>
                    <p>{t('woman_history_data_step_page.header', {stepNro: stepNro, totalSteps: stepsTotal})}</p>
                </div>
                <div id="form-preview-section">
                    <FormFields formFields={sectionDetail.fields} handleChange={reportDataChange} valueHolder={valueHolder}/>
                </div>
            </div>
            <button className="next-button" onClick={handleNext}>{nextButtonText}</button>
        </div>
    );
}



