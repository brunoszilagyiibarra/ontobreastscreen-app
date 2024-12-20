import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import './FooterPanel.css';
import {useTranslation} from "react-i18next"; // Import the CSS file for panel styling
import packageJson from "../../../package.json"

const FooterPanel = () => {
    const {t } = useTranslation();
    const email = "bruno.szilagyi.ibarra@gmail.com"; // Cambia esto por tu dirección de correo
    const asunto = "Consulta - OntoBreastScreen"; // Asunto del correo
    const cuerpo = "Hola, me gustaría saber más sobre..."; // Cuerpo del correo

    return (
        <div className="panel">
            <div className="panel-section left">
                <h3>{t('app_page.footer.contact_info')}</h3>
                <a href={`mailto:${email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`}
                   dangerouslySetInnerHTML={{__html: t('app_page.footer.email', {email: "bruno.szilagyi.ibarra@gmail.com"})}}/>
                <p dangerouslySetInnerHTML={{__html: t('app_page.footer.version', {version: packageJson.version})}}/>
                <p dangerouslySetInnerHTML={{__html: t('app_page.footer.license')}}/>
            </div>
            <div className="panel-section right">
                <LanguageSwitcher/>
            </div>
        </div>
    );
};

export default FooterPanel;