import { useRef } from 'react';
import { featuresData } from '@/data/dummy-data';
import Title from './Title';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function Features() {
    const refs = useRef<(HTMLDivElement | null)[]>([]);
    const { language } = useLanguage();
    const t = translations[language];

    const features = featuresData.map((feature, index) => {
        let title = feature.title;
        let desc = feature.desc;

        if (index === 0) {
            title = t.discovery;
            desc = t.discoveryDesc;
        } else if (index === 1) {
            title = t.design;
            desc = t.designDesc;
        } else if (index === 2) {
            title = t.launch;
            desc = t.launchDesc;
        }

        return { ...feature, title, desc };
    });

    return (
        <section id="features" className="relative pb-20 2xl:py-32 overflow-hidden pt-10">
            {/* Animated Background Orbs */}
            <motion.div
                className="absolute top-10 left-0 w-80 h-80 bg-brand/8 rounded-full blur-3xl"
                animate={{
                    y: [0, 40, 0],
                    x: [0, 20, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute bottom-10 right-0 w-80 h-80 bg-secondary/8 rounded-full blur-3xl"
                animate={{
                    y: [0, -40, 0],
                    x: [0, -20, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Geometric shapes */}
            <motion.div
                className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-[#F7A95D] rounded-lg"
                animate={{
                    y: [0, -80, 0],
                    rotate: [0, 180, 360],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute top-1/2 left-1/3 w-12 h-12 border-2 border-[#F7A95D]"
                animate={{
                    y: [0, -100, 0],
                    rotate: [0, -180, -360],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                }}
            />

            <motion.div
                className="absolute bottom-1/3 right-1/3 w-20 h-20 border-2 border-[#F7A95D] rounded-full"
                animate={{
                    y: [0, -90, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                }}
            />

            {/* Star shapes */}
            <motion.div
                className="absolute top-1/3 left-1/4 text-[#F7A95D]"
                animate={{
                    y: [0, -60, 0],
                    rotate: [0, 360],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            </motion.div>

            <motion.div
                className="absolute bottom-1/4 right-1/4 text-secondary/20"
                animate={{
                    y: [0, -70, 0],
                    rotate: [360, 0],
                    scale: [1, 1.4, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                }}
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            </motion.div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">

                <Title
                    title={t.services}
                    heading={t.servicesHeading}
                    description={t.servicesDescription}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            ref={(el) => {
                                refs.current[i] = el;
                            }}
                            initial={{ y: 100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 + i * 0.1 }}
                            key={i}
                            onAnimationComplete={() => {
                                const card = refs.current[i];
                                if (card) {
                                    card.classList.add("transition", "duration-300", "hover:border-white/15", "hover:-translate-y-1");
                                }
                            }}
                            className="group relative rounded-2xl p-6 bg-dark-card border border-secondary/10 hover:border-brand/40 overflow-hidden"
                            whileHover={{ y: -5 }}
                        >
                            {/* Glow effect on hover */}
                            <motion.div
                                className="absolute inset-0 bg-linear-to-br from-brand/0 to-secondary/0 group-hover:from-brand/5 group-hover:to-secondary/5 rounded-2xl"
                                transition={{ duration: 0.3 }}
                            />

                            <div className="relative z-10">
                                <motion.div
                                    className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center mb-4 text-brand"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-lg font-semibold mb-2 text-secondary">{feature.title}</h3>
                                <p className="text-secondary/80 text-sm leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};