import React, {useState} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import WelcomePage from './pages/welcome/WelcomePage';
import Header from './parts/Header';
import RiskModelSelectionPage from './pages/risk_model_selection/RiskModelSelectionPage';
import WomanHistoryDataFormPage from './pages/woman_history_data/WomanHistoryDataFormPage';
import RiskCalculationResultPage from './pages/risk_calculation/RiskCalculationResultPage';
import RecommendationPage from './pages/recommendation/RecommendationPage';
import './App.css';
import {ClipLoader} from 'react-spinners';
import {
    calculateRisk,
    getModels,
    getRecommendationGuidesForRisk,
    getWomanExamples,
    getWomanForm
} from "../client/breast-cancer-recommendation-api-client";
import FooterPanel from "./parts/FooterPanel";
import WomanInputModeSelectionPage from "./pages/woman_input_mode/WomanInputModeSelectionPage";
import WomanExamplesSelectionPage from "./pages/woman_examples_selection/WomanExamplesSelectionPage";
import RecommendationFeedbackPage from "./pages/recommendation_feedback/RecommendationFeedbackPage";
import AskConsentPage from "./pages/ask_consent/AskConsentPage";
import {useTranslation} from "react-i18next";

const WELCOME_PAGE_ID = "welcome"
const RISK_MODEL_SELECTION_PAGE_ID = "risk-model-selection"
const WOMAN_INPUT_MODE_SELECTION_PAGE_ID = "woman-input-mode-selection"
const WOMAN_HISTORY_DATA_FORM_PAGE_ID = "woman-history-data-form"
const WOMAN_EXAMPLES_SELECTION_PAGE_ID = "woman-examples-selection"
const RISK_CALCULATION_RESULT_PAGE_ID = "risk-calculation-result"
const RECOMMENDATION_RESULT_PAGE_ID = "recommendation-result"
const RECOMMENDATION_FEEDBACK_PAGE_ID = "recommendation-feedback"
const CONSENT_ASK_PAGE_ID = "consent-ask"

const ANIMATION_FORWARD = 'forward';
const ANIMATION_BACKWARD = 'backward';

const App = () => {

    //General navigation state.
    const [direction, setDirection] = useState(ANIMATION_FORWARD);
    const [page, setPage] = useState(WELCOME_PAGE_ID);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const {t } = useTranslation();

    //Resultados de las apis, estado a pasar a los componentes internos.
    const [riskModels, setRiskModels] = useState([]);
    const [guidelines, setGuidelines] = useState('');
    const [riskCalculationResult, setRiskCalculationResult] = useState('');
    const [womanExamples, setWomanExamples] = useState([]);
    const [formSteps, setFormSteps] = useState([]);

    //Intermediate Results
    const [selectedRiskModel, setSelectedRiskModel] = useState('');
    const [selectedRiskModelUri, setSelectedRiskModelUri] = useState('');

    // WELCOME -> RISK_MODEL_SELECTION
    const welcomePageNextAction = () => {
        setLoadingText("risk_model_selection_page.loading_text")
        setLoading(true);

        getModels()
            .then(response => {
                setLoading(false);
                setLoadingText("")
                setRiskModels(response.data);
                setDirection(ANIMATION_FORWARD);
                setPage(RISK_MODEL_SELECTION_PAGE_ID);
        }).catch(e => {
            setLoadingText("")
            setLoading(false);
        })
    };

    // RISK_MODEL_SELECTION -> WELCOME
    const riskModelSelectionPageBackAction = () => {
        setDirection(ANIMATION_BACKWARD);
        setRiskModels([]);
        setPage(WELCOME_PAGE_ID);
    };

    // RISK_MODEL_SELECTION -> WOMAN_INPUT_MODE
    const riskModelSelectionPageNextAction = (selectedPrettyName, selectedUri) => {
        setDirection(ANIMATION_FORWARD);
        setSelectedRiskModel(selectedPrettyName);
        setSelectedRiskModelUri(selectedUri);
        setPage(WOMAN_INPUT_MODE_SELECTION_PAGE_ID);
    };


    // WOMAN_INPUT_MODE -> RISK_MODEL_SELECTION
    const womanInputModeSelectionPageBackAction = () => {
        setDirection(ANIMATION_BACKWARD);
        setPage(RISK_MODEL_SELECTION_PAGE_ID);
    };

    // WOMAN_INPUT_MODE -> WOMAN_FORMULARIO_MANUAL
    const womanInputModeSelectionPageNextManual = () => {
        setLoadingText("woman_history_data_page.loading_text")
        setLoading(true);
        getWomanForm(selectedRiskModelUri)
                .then(response => {
                    let formInfo = response.data
                    let steps = [];

                    //primer nivel
                    if(formInfo.fields != null && formInfo.fields.length !== 0) {
                        steps.push({
                            sectionName : formInfo.sectionName,
                            fields: formInfo.fields
                        })
                    }

                    formInfo.subForms.map( subsec => {
                        steps.push({
                            sectionName : subsec.sectionName,
                            fields : subsec.fields,
                            subForms : subsec.subForms,
                        })
                    })

                    setLoading(false);
                    setLoadingText("")
                    setDirection(ANIMATION_FORWARD);
                    setFormSteps(steps)
                    setPage(WOMAN_HISTORY_DATA_FORM_PAGE_ID);
                })
                .catch(error => {
                    setLoading(false);
                    setLoadingText("")
                        console.log(error)
                })
    };


    //WOMAN_INPUT_MODE -> WOMAN_EXAMPLES
    const womanInputModeSelectionPageNextFixed = () => {
        getWomanExamples(selectedRiskModelUri)
            .then(womanExamplesResult => {
                setDirection(ANIMATION_FORWARD);
                setWomanExamples(womanExamplesResult.data)
                setPage(WOMAN_EXAMPLES_SELECTION_PAGE_ID);
            })
            .catch(error => console.log(error))
    };

    // WOMAN_EXAMPLES_SELECTION_PAGE_ID -> WOMAN_INPUT_MODE_SELECTION_PAGE_ID
    const womanExamplesSelectionPageBackAction = () => {
        setDirection(ANIMATION_BACKWARD);
        setPage(WOMAN_INPUT_MODE_SELECTION_PAGE_ID);
    };

    // WOMAN_EXAMPLES_SELECTION_PAGE_ID -> WOMAN_HISTORY_DATA_FORM_PAGE_ID
    const womanExamplesSelectionPageNextAction = (selectedWoman) => {
        setLoadingText("woman_history_data_page.loading_text")
        setLoading(true);
        getWomanForm(selectedRiskModelUri, selectedWoman)
            .then(response => {
                let formInfo = response.data
                let steps = [];

                //primer nivel
                if(formInfo.fields != null && formInfo.fields.length !== 0) {
                    steps.push({
                        sectionName : formInfo.sectionName,
                        fields: formInfo.fields
                    })
                }

                formInfo.subForms.map( subsec => {
                    steps.push({
                        sectionName : subsec.sectionName,
                        fields : subsec.fields,
                        subForms : subsec.subForms,
                    })
                })

                setLoading(false);
                setLoadingText("")
                setDirection(ANIMATION_FORWARD);
                setFormSteps(steps)
                setPage(WOMAN_HISTORY_DATA_FORM_PAGE_ID);
            })
            .catch(error => {
                setLoading(false);
                setLoadingText("")
                console.log(error)
            })
    };

    //WOMAN_HISTORY_DATA_FORM_PAGE_ID -> WOMAN_INPUT_MODE_SELECTION_PAGE_ID
    const womanHistoryDataFormBackAction = () => {
        setDirection(ANIMATION_BACKWARD);
        setPage(WOMAN_INPUT_MODE_SELECTION_PAGE_ID);
    };

    //WOMAN_HISTORY_DATA_FORM_PAGE_ID -> RISK_CALCULATION_RESULT_PAGE_ID
    const womanHistoryDataFormNextAction = (data) => {
        setLoadingText("risk_calculation_result_page.loading_text")
        setLoading(true);
        calculateRisk(data, selectedRiskModelUri)
            .then( res => {
                setLoading(false);
                setLoadingText("")
                setDirection(ANIMATION_FORWARD);
                setRiskCalculationResult(res.data)
                setPage(RISK_CALCULATION_RESULT_PAGE_ID);
            }).catch(e => {
            setLoading(false);
            setLoadingText("")
        })
    };

    // RISK_CALCULATION_RESULT_PAGE_ID -> WOMAN_INPUT_MODE_SELECTION_PAGE_ID
    const riskCalculationResultPageBackAction = () => {
        setDirection(ANIMATION_BACKWARD);
        setPage(WOMAN_INPUT_MODE_SELECTION_PAGE_ID);
    };

    // RISK_CALCULATION_RESULT_PAGE_ID -> RECOMMENDATION_RESULT_PAGE_ID
    const riskCalculationResultPageNextAction = () => {
        getRecommendationGuidesForRisk(riskCalculationResult.riskLevelUri)
            .then(data => {
                setDirection(ANIMATION_FORWARD);
                setGuidelines(data.data); // Assuming the API returns an array of options
                setPage(RECOMMENDATION_RESULT_PAGE_ID);
            }).catch(error => console.log(error))
    };

    //RECOMMENDATION_RESULT_PAGE_ID -> RECOMMENDATION_FEEDBACK_PAGE_ID
    const recommendationPageNextAction = () => {
        setDirection(ANIMATION_FORWARD);
        setPage(RECOMMENDATION_FEEDBACK_PAGE_ID);
    };

    //RECOMMENDATION_RESULT_PAGE_ID -> RISK_CALCULATION_RESULT_PAGE_ID
    const recommendationPageBackAction = () => {
        setDirection(ANIMATION_BACKWARD);
        setPage(RISK_CALCULATION_RESULT_PAGE_ID);
    };


    //RECOMMENDATION_FEEDBACK_PAGE_ID -> CONSENT_ASK_PAGE_ID
    const recommendationFeedbackPageNextAction = () => {
        setDirection(ANIMATION_FORWARD);
        setPage(CONSENT_ASK_PAGE_ID);
    };

    //RECOMMENDATION_FEEDBACK_PAGE_ID -> RECOMMENDATION_RESULT_PAGE_ID
    const recommendationFeedbackPageBackAction = () => {
        setDirection(ANIMATION_BACKWARD);
        setPage(RECOMMENDATION_RESULT_PAGE_ID);
    };

    //CONSENT_ASK_PAGE_ID -> WELCOME_PAGE_ID
    const consentAskPageNextAction = () => {
        setDirection(ANIMATION_FORWARD);
        setPage(WELCOME_PAGE_ID);
        setSelectedRiskModel('')
    };

    //CONSENT_ASK_PAGE_ID -> RECOMMENDATION_FEEDBACK_PAGE_ID
    const consentAskPageBackAction = () => {
        setDirection(ANIMATION_BACKWARD);
        setPage(RECOMMENDATION_FEEDBACK_PAGE_ID);
    };

    return (
        <div className="App">
            <div>
                <Header/>
            </div>

            {loading ? (
                <div className="spinner-container">
                    <ClipLoader size={50} color="#d81b60" loading={loading} />
                    <p>{t(loadingText)}</p>
                </div>
            ) : (
                <div className="page-container">
                    <TransitionGroup>
                        <CSSTransition
                            key={page}
                            timeout={500}
                            classNames={{
                                enter: direction === ANIMATION_FORWARD ? 'slide-enter-forward' : 'slide-enter-backward',
                                enterActive: direction === ANIMATION_FORWARD ? 'slide-enter-active-forward' : 'slide-enter-active-backward',
                                exit: direction === ANIMATION_FORWARD ? 'slide-exit-forward' : 'slide-exit-backward',
                                exitActive: direction === ANIMATION_FORWARD ? 'slide-exit-active-forward' : 'slide-exit-active-backward',
                            }}
                        >
                            <div className="page-wrapper">
                                {page === WELCOME_PAGE_ID &&
                                    <WelcomePage next={welcomePageNextAction}/>}

                                {page === RISK_MODEL_SELECTION_PAGE_ID &&
                                    <RiskModelSelectionPage riskModels={riskModels}
                                                            next={riskModelSelectionPageNextAction}
                                                            back={riskModelSelectionPageBackAction}/>}

                                {page === WOMAN_INPUT_MODE_SELECTION_PAGE_ID &&
                                    <WomanInputModeSelectionPage nextOp1={womanInputModeSelectionPageNextManual}
                                                                 nextOp2={womanInputModeSelectionPageNextFixed}
                                                                 back={womanInputModeSelectionPageBackAction}/>}

                                {page === WOMAN_HISTORY_DATA_FORM_PAGE_ID &&
                                    <WomanHistoryDataFormPage next={womanHistoryDataFormNextAction}
                                                              back={womanHistoryDataFormBackAction}
                                                              selectedModel={selectedRiskModel}
                                                              selectedModelUri={selectedRiskModelUri}
                                                              steps={formSteps}/>}

                                {page === WOMAN_EXAMPLES_SELECTION_PAGE_ID &&
                                    <WomanExamplesSelectionPage womanExamples={womanExamples}
                                                                next={womanExamplesSelectionPageNextAction}
                                                                back={womanExamplesSelectionPageBackAction}/>}

                                {page === RISK_CALCULATION_RESULT_PAGE_ID &&
                                    <RiskCalculationResultPage riskCalcResult={riskCalculationResult}
                                                               back={riskCalculationResultPageBackAction}
                                                               next={riskCalculationResultPageNextAction}/>}

                                {page === RECOMMENDATION_RESULT_PAGE_ID &&
                                    <RecommendationPage guides={guidelines} risk={riskCalculationResult.riskLevel}
                                                        womanUri={riskCalculationResult.womanUri}
                                                        back={recommendationPageBackAction}
                                                        next={recommendationPageNextAction}/>}

                                {page === RECOMMENDATION_FEEDBACK_PAGE_ID &&
                                    <RecommendationFeedbackPage
                                        back={recommendationFeedbackPageBackAction}
                                        next={recommendationFeedbackPageNextAction}/>}

                                {page === CONSENT_ASK_PAGE_ID &&
                                    <AskConsentPage
                                        back={consentAskPageBackAction} next={consentAskPageNextAction}/>}
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            )}
            <div>
                <FooterPanel/>
            </div>
        </div>
    );
};


export default App;
