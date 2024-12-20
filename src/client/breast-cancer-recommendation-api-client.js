import {properties} from "../properties";
import axios from "axios";
import i18n from "i18next";


axios.interceptors.request.use((config) => {
    config.headers['Accept-Language'] = i18n.language;
    return config;
});

export async function getModels() {
    return await axios.get(properties.backendProtocolAndHostAndPort + "/breast-cancer-recommendation-api/v1/models")
}

export async function getWomanForm(riskModelUri, womanExampleName="") {
    var params = new URLSearchParams();
    params.set("riskModelUri", riskModelUri)
    params.set("womanExampleName", womanExampleName)

    return await axios.get(properties.backendProtocolAndHostAndPort + "/breast-cancer-recommendation-api/v1/form?"+params.toString())
}

export async function getPatientRecommendation(womanUri, guidelineUri) {
    var params = new URLSearchParams();
    params.set("guidelineUri", guidelineUri)
    params.set("womanId", womanUri)
    return await axios.get(properties.backendProtocolAndHostAndPort + "/breast-cancer-recommendation-api/v1/recommendation?" + params.toString())
}

export async function getRecommendationGuidesForRisk(riskLevelUri) {
    var params = new URLSearchParams();
    params.set("risk", riskLevelUri)

    return await axios.get(properties.backendProtocolAndHostAndPort + "/breast-cancer-recommendation-api/v1/recommendation_guides?"+params.toString())
}

export async function getWomanExamples(riskModelUri) {
    var params = new URLSearchParams();
    params.set("riskModel", riskModelUri)
    return await axios.get(properties.backendProtocolAndHostAndPort + "/breast-cancer-recommendation-api/v1/woman_examples?"+params.toString())
}

export async function calculateRisk(formData, riskModelUri) {
    return await axios.post(properties.backendProtocolAndHostAndPort + "/breast-cancer-recommendation-api/v1/woman",
        {
            womanHistory: formData,
            riskModelUri: riskModelUri
        })
}
