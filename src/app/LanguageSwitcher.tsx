"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import './LanguageSwitcher.css';
import Select, { StylesConfig } from 'react-select';

interface LanguageOption {
  value: string;
  label: string;
}

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const languageOptions: LanguageOption[] = [
    { value: "en", label: t("layout.EN") },
    { value: "th", label: t("layout.TH") }
  ];

  const customStyles: StylesConfig<LanguageOption, false> = {
    control: (provided) => ({
      ...provided,
      width: '100px',
      minHeight: '40px'
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999
    })
  };

  if (!mounted) return null;

  return (
    <div className="language-switch">
      <Select
        instanceId="language-select"
        options={languageOptions}
        value={languageOptions.find((option) => option.value === i18n.language)}
        onChange={(selectedOption) => i18n.changeLanguage(selectedOption!.value)}
        styles={customStyles}
        isSearchable={false}
      />
    </div>
  );
};

export default LanguageSwitcher;