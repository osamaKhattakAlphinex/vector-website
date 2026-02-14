'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function Footer() {
    const { language } = useLanguage();
    const t = translations[language];

    const footerLinks = [
        {
            title: t.footerCompany,
            links: [
                { name: t.footerHome, url: "#" },
                { name: t.footerServices, url: "#" },
                { name: t.footerWork, url: "#" },
                { name: t.footerContact, url: "#" }
            ]
        },
        {
            title: t.footerLegal,
            links: [
                { name: t.footerPrivacy, url: "#" },
                { name: t.footerTerms, url: "#" }
            ]
        },
        {
            title: t.footerConnect,
            links: [
                { name: "Twitter", url: "#" },
                { name: "LinkedIn", url: "#" },
                { name: "GitHub", url: "#" }
            ]
        }
    ];

    return (
        <motion.footer className="bg-white/6 border-t border-white/6 pt-10 text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.5 }}
        >
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-white/10">
                    <div>
                        <img src='/vector-graphics.png' alt="logo" className="w-14" />
                        <p className="max-w-[410px] mt-6 text-sm leading-relaxed">
                            {t.footerDescription}
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                        {footerLinks.map((section, index) => (
                            <div key={index}>
                                <h3 className="font-semibold text-base text-white md:mb-5 mb-2">
                                    {section.title}
                                </h3>
                                <ul className="text-sm space-y-1">
                                    {section.links.map(
                                        (link: { name: string; url: string }, i) => (
                                            <li key={i}>
                                                <a
                                                    href={link.url}
                                                    className="hover:text-white transition"
                                                >
                                                    {link.name}
                                                </a>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="py-4 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()}{' '}

                    | {t.footerRights}
                </p>
            </div>
        </motion.footer>
    );
};