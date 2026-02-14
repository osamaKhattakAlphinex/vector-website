'use client';
import { MenuIcon, XIcon, Globe } from 'lucide-react';
import { PrimaryButton } from './Buttons';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { language, toggleLanguage, isRTL } = useLanguage();
    const t = translations[language];

    const navLinks = [
        { name: t.home, href: '/#' },
        { name: t.services, href: '/#features' },
        { name: t.portfolio, href: '/#portfolio' },
        { name: t.pricing, href: '/#pricing' },
    ];

    return (
        <motion.nav className={`fixed top-5 left-0 right-0 z-50 px-4 ${isRTL ? 'rtl' : 'ltr'}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
        >
            <div className={`max-w-6xl mx-auto flex items-center justify-between bg-black/50 backdrop-blur-md border border-white/4 rounded-2xl p-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <a href='/#'>
                    <img src='/vector-graphics.png' alt="logo" className="w-14" />
                </a>

                <div className={`hidden md:flex items-center gap-8 text-sm font-medium text-gray-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {navLinks.map((link) => (
                        <a href={link.href} key={link.name} className="hover:text-white transition">
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className={`hidden md:flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <motion.button
                        onClick={toggleLanguage}
                        className='flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition px-3 py-2 rounded-lg hover:bg-white/10'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Globe className='size-4' />
                        {language === 'he' ? 'EN' : 'עברית'}
                    </motion.button>
                    <PrimaryButton className='max-sm:text-xs hidden sm:inline-block'>{t.getStarted}</PrimaryButton>
                </div>

                <button onClick={() => setIsOpen(!isOpen)} className='md:hidden'>
                    <MenuIcon className='size-6' />
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`flex flex-col items-center justify-center gap-6 text-lg font-medium fixed inset-0 bg-black/40 backdrop-blur-md z-50 transition-all duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} ${isRTL ? 'rtl' : 'ltr'}`}>
                {navLinks.map((link) => (
                    <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                        {link.name}
                    </a>
                ))}

                <motion.button
                    onClick={toggleLanguage}
                    className='flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition px-3 py-2 rounded-lg hover:bg-white/10'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Globe className='size-4' />
                    {language === 'he' ? 'EN' : 'עברית'}
                </motion.button>

                <PrimaryButton onClick={() => setIsOpen(false)}>{t.getStarted}</PrimaryButton>

                <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-md bg-white p-2 text-gray-800 ring-white active:ring-2"
                >
                    <XIcon />
                </button>
            </div>
        </motion.nav>
    );
};