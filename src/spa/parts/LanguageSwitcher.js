import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import englishFlag from './eeuu_flag.png'; // Add your flag images in the assets folder
import spanishFlag from './spanish_flag.png';
import './LanguageSwitcher.css';
import i18n from "i18next"; // Import the CSS file for styling

const LanguageSwitcher = () => {
    const { t, i18n: {changeLanguage, language} } = useTranslation();
    const [selectedLang, setSelectedLang] = useState(i18n.language);

    const handleChangeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setSelectedLang(lng);
    };


    return (
        <div className="language-switcher">
            <button
                className={`flag-button ${selectedLang === 'en' ? 'selected' : ''}`}
                onClick={() => handleChangeLanguage('en')}
            >
                <img src={englishFlag} alt="English" className="flag-image"/>
                <span className="flag-text">English</span>
            </button>
            <button
                className={`flag-button ${selectedLang === 'es' ? 'selected' : ''}`}
                onClick={() => handleChangeLanguage('es')}
            >
                <img src={spanishFlag} alt="Spanish" className="flag-image"/>
                <span className="flag-text">Español</span>
            </button>
        </div>
    );
};

export default LanguageSwitcher;
