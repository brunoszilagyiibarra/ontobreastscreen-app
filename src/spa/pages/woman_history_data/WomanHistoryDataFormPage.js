import React, {useEffect, useState} from 'react';
import '../PagesCommonStyle.css';
import WomanHistoryDataFormStep from "./WomanHistoryDataFormStep";
import getCurrentTime from "../../parts/CurrentTime";

const WomanHistoryDataFormPage = ({ next, back, selectedModel, steps }) => {

    const [formData, setFormData] = useState({});
    const [currentStepNro, setCurrentStepNro] = useState(0);

    useEffect(() => {

        let updatedFormData = {};

        steps.forEach((step) => {
            step.fields.forEach((field) => {
                if (field.type === "single-option" || field.type === "multi-option") {
                    if (field.selectedOption != null) {
                        updatedFormData[field.uri] = field.selectedOption.uri;
                    }
                } else {
                    if (field.value != null) {
                        updatedFormData[field.uri] = field.value;
                    }
                }

            })
        })

        setFormData(updatedFormData);

    }, [steps]);


    const reportDataChange = (id, value) => {
        setFormData({...formData, [id]: value});
    }

    //Controlled inputs
    const valueHolder = (dataId) => {
        let newVar = formData[dataId] === undefined ? '' : formData[dataId];
        console.log(`[${getCurrentTime()}] recuperando dato ` + dataId + " es " + newVar)
        return newVar
    }

    const handlePrevEvent = () => {
        if (currentStepNro === 0) {
            back()
        } else {
            setCurrentStepNro(currentStepNro - 1);
        }
    }

    const handleNextEvent = async () => {
        //Submit
        if (steps.length === currentStepNro + 1) {
            try {
                await new Promise((resolve) => next(formData));
            } finally {
                //TODO acá estaba el tema del spinner
            }
        } else {
            setCurrentStepNro(currentStepNro + 1);
        }
    }

    return <WomanHistoryDataFormStep selectedModel={selectedModel}
                                     sectionDetail={steps[currentStepNro]}
                                     stepNro={currentStepNro + 1}
                                     stepsTotal={steps.length}
                                     next={handleNextEvent} prev={handlePrevEvent}
                                     reportDataChange={reportDataChange}
                                     valueHolder={valueHolder}/>;
};

export default WomanHistoryDataFormPage;
