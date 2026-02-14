'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'he' | 'en';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('he');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedLanguage = localStorage.getItem('language') as Language | null;
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }

        // Apply RTL/LTR to HTML element
        const htmlElement = document.documentElement;
        const lang = savedLanguage || 'he';
        if (lang === 'he') {
            htmlElement.classList.add('rtl');
            htmlElement.classList.remove('ltr');
            htmlElement.lang = 'he';
            htmlElement.dir = 'rtl';
        } else {
            htmlElement.classList.add('ltr');
            htmlElement.classList.remove('rtl');
            htmlElement.lang = 'en';
            htmlElement.dir = 'ltr';
        }
    }, []);

    const toggleLanguage = () => {
        const newLanguage = language === 'he' ? 'en' : 'he';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);

        // Apply RTL/LTR to HTML element
        const htmlElement = document.documentElement;
        if (newLanguage === 'he') {
            htmlElement.classList.add('rtl');
            htmlElement.classList.remove('ltr');
            htmlElement.lang = 'he';
            htmlElement.dir = 'rtl';
        } else {
            htmlElement.classList.add('ltr');
            htmlElement.classList.remove('rtl');
            htmlElement.lang = 'en';
            htmlElement.dir = 'ltr';
        }
    };

    // Remove early return to ensure Provider is always present


    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, isRTL: language === 'he' }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};
