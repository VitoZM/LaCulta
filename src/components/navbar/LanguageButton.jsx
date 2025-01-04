import React from "react";
//translations
import { languages, languageKey } from "../../constants/languages";
import { useTranslation } from "react-i18next";
import { getCurrentLanguage } from "../../utils/i18n";
//flags
import spanishFlag from "/images/logos/es.svg";
import englishFlag from "/images/logos/en.svg";

const LanguageButton = (props) => {
  const [t, i18n] = useTranslation("global");
  const { SPANISH, ENGLISH } = languages;
  const { className } = props;
  const currentLanguage = getCurrentLanguage();

  const changeLanguage = () => {
    const language = currentLanguage === SPANISH ? ENGLISH : SPANISH;
    localStorage.setItem(languageKey, language);
    i18n.changeLanguage(language);
  };

  const getFlag = () => {
    switch (currentLanguage) {
      case SPANISH:
        return spanishFlag;
      case ENGLISH:
        return englishFlag;
    }
  };

  return (
    <button className={className} onClick={changeLanguage}>
      <img src={getFlag()} width={25} />
    </button>
  );
};

export default LanguageButton;
