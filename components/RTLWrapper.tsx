'use client';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';

export default function RTLWrapper() {
    const { isRTL, language } = useLanguage();

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isRTL) {
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
    }, [isRTL, language]);

    return null;
}
