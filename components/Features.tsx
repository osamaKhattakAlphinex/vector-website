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
                className="absolute top-10 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
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
                className="absolute bottom-10 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"
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
                            className="group relative rounded-2xl p-6 bg-white/3 border border-white/6 hover:border-indigo-500/30 overflow-hidden"
                            whileHover={{ y: -5 }}
                        >
                            {/* Glow effect on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-cyan-500/0 group-hover:from-indigo-500/10 group-hover:to-cyan-500/10 rounded-2xl"
                                transition={{ duration: 0.3 }}
                            />

                            <div className="relative z-10">
                                <motion.div
                                    className="w-12 h-12 rounded-lg bg-violet-900/20 flex items-center justify-center mb-4"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
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