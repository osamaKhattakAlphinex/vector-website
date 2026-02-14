'use client';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

const TypingAnimation = ({ phrases }: { phrases: string[] }) => {
    const [displayText, setDisplayText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (phrases.length === 0) return;

        const currentPhrase = phrases[phraseIndex % phrases.length];
        const typingSpeed = isDeleting ? 50 : 100;
        const delayBeforeDelete = 2000;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (charIndex < currentPhrase.length) {
                    setDisplayText(currentPhrase.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), delayBeforeDelete);
                }
            } else {
                if (charIndex > 0) {
                    setDisplayText(currentPhrase.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                } else {
                    setIsDeleting(false);
                    setPhraseIndex((phraseIndex + 1) % phrases.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, phraseIndex, phrases]);

    return (
        <motion.span className="block min-h-[1.2em] text-brand">
            {displayText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-1"
            >
                |
            </motion.span>
        </motion.span>
    );
};

export default function Hero() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { language, isRTL } = useLanguage();
    const t = translations[language];

    const trustedUserImages = [
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=50',
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop'
    ];

    const trustedLogos = [
        { name: '35mm Boge', url: '/assets/clients/35mm-boge.png' },
        { name: 'A Plus Remodeling', url: '/assets/clients/a-plus-remodeling.png' },
        // { name: 'Basketball4u', url: '/assets/clients/basketball4u.webp' },

        // { name: 'Chubu', url: '/assets/clients/chubu.jpg' },
        // { name: 'Clean Capture', url: '/assets/clients/clean-capture.png' },
        { name: 'Continental', url: '/assets/clients/continental.png' },
        // { name: 'Fight Club Twente', url: '/assets/clients/fight-club-twente.png' },
        // { name: 'Flower Logo', url: '/assets/clients/flower-logo.jpg' },
        // { name: 'Hans', url: '/assets/clients/hans.jpg' },
        { name: 'Hickory Farm', url: '/assets/clients/hickory-farm.png' },
        { name: 'HPA', url: '/assets/clients/hpa.png' },
        { name: 'Laret Arch', url: '/assets/clients/laretarch.png' },
        { name: 'Little Light Healing', url: '/assets/clients/little-light-healing.png' },
        { name: 'Look by Souk', url: '/assets/clients/look-by-souk.png' },
        { name: 'Mas Studio', url: '/assets/clients/mas-studio.png' },

        // { name: 'ROM Logo', url: '/assets/clients/rom-logo.png' },
        { name: 'Saliba Realty', url: '/assets/clients/saliba-realty.png' },
        // { name: 'Salut', url: '/assets/clients/salut.jpg' },
        { name: 'Summit Crew', url: '/assets/clients/summit-crew.png' },
        { name: 'Supreme Tints', url: '/assets/clients/supreme-tints.png' },
        // { name: 'Swiss Cut', url: '/assets/clients/swiss-cut.png' },
        // { name: 'Tal Hayon', url: '/assets/clients/tal-hayon.jpg' },
        // { name: 'Vector Graphics', url: '/assets/clients/vector-graphics.png' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setEmail('');
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <>
            {/* FULL-PAGE HERO SECTION */}
            <section id="home" className={`relative w-full h-screen overflow-hidden flex items-center justify-center ${isRTL ? 'rtl' : 'ltr'} pb-10`}>
                {/* Full-width background image */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-40"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=2000&auto=format&fit=crop)',
                    }}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Animated gradient overlay */}
                <motion.div
                    className="absolute inset-0 bg-linear-to-br from-indigo-900/30 via-transparent to-cyan-900/30"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: 'reverse',
                    }}
                />

                {/* Floating orbs animation */}
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"
                    animate={{
                        y: [0, 50, 0],
                        x: [0, 30, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
                    animate={{
                        y: [0, -50, 0],
                        x: [0, -30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                {/* Content */}
                <div className="relative z-10 w-full h-full flex items-center justify-center px-4 pt-[110px]">
                    <div className="w-full max-w-4xl mx-auto text-center">
                        {/* Center Content */}
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* <motion.a
                                href="#!"
                                className={`inline-flex items-center gap-1 pl-3 pr-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="flex -space-x-2">
                                    {trustedUserImages.map((src, i) => (
                                        <img
                                            key={i}
                                            src={src}
                                            alt={`Client ${i + 1}`}
                                            className="size-6 rounded-full border border-black/50"
                                            width={40}
                                            height={40}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-200/90">
                                    {t.trustedBy}
                                </span>
                            </motion.a> */}

                            <motion.h1
                                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                {t.heroTitle}{' '}
                                <TypingAnimation phrases={t.typingPhrases} />
                            </motion.h1>

                            <motion.p
                                className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                {t.heroDescription}
                            </motion.p>

                            {/* Lead Form */}
                            <motion.form
                                onSubmit={handleSubmit}
                                className={`flex flex-col sm:flex-row gap-3 max-w-md mx-auto justify-center ${isRTL ? 'flex-row-reverse' : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                <div className="flex-1 relative">
                                    <Mail className={`absolute top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none ${isRTL ? 'right-4' : 'left-4'}`} />
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className={`w-full py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    className="px-6 py-3 rounded-lg bg-brand text-white font-semibold hover:shadow-lg hover:shadow-brand/50 transition-all whitespace-nowrap"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isSubmitted ? 'Sent!' : t.getStarted}
                                </motion.button>
                            </motion.form>

                            {/* Stats */}
                            <motion.div
                                className={`flex flex-wrap gap-8 pt-4 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <div>
                                    <motion.div
                                        className="text-2xl md:text-3xl font-bold text-brand"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        20+
                                    </motion.div>
                                    <p className="text-xs md:text-sm text-gray-400">{t.projectsCompleted}</p>
                                </div>
                                <div>
                                    <motion.div
                                        className="text-2xl md:text-3xl font-bold text-brand"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                                    >
                                        50+
                                    </motion.div>
                                    <p className="text-xs md:text-sm text-gray-400">{t.happyClients}</p>
                                </div>
                                <div>
                                    <motion.div
                                        className="text-2xl md:text-3xl font-bold text-brand"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                                    >
                                        5+
                                    </motion.div>
                                    <p className="text-xs md:text-sm text-gray-400">{t.yearsExperience}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* LOGO MARQUEE */}
            <motion.section
                className="border-y border-white/6 bg-white/1"
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <div className="max-w-6xl mx-auto px-6">
                    <div className="w-full overflow-hidden py-2" style={{ direction: 'ltr' }}>
                        <div className={`flex gap-14 items-center justify-center ${isRTL ? 'animate-marquee-rtl' : 'animate-marquee'}`}>
                            {trustedLogos.concat(trustedLogos).map((logo, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-center  min-w-max"
                                >
                                    <img
                                        src={logo.url}
                                        alt={logo.name}
                                        className="w-32 object-contain opacity-60 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>
        </>
    );
}
