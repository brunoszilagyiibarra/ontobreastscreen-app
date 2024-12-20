import React from 'react';
import BackButton from "../../parts/BackButton";
import "../PagesCommonStyle.css"
import {useTranslation} from "react-i18next";
import HeaderWithInfo from "../../parts/HeaderWithInfo";


const WomanInputModeSelectionPage = ({nextOp1, nextOp2, back }) => {

    const {t } = useTranslation();

    return (
        <div className="page-container">
            <BackButton onClick={back} />
            <div className="page-content">
                <HeaderWithInfo headerTitle={t("woman_input_mode_selection_page.header")}
                                tooltipMessage={t("woman_input_mode_selection_page.info_text")}/>

                <button className="next-button" onClick={nextOp1}>{t("woman_input_mode_selection_page.next_op1")}</button>
                <button className="next-button" onClick={nextOp2}>{t("woman_input_mode_selection_page.next_op2")}</button>
            </div>
        </div>
    );
};

export default WomanInputModeSelectionPage;
