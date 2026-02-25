import { Check } from 'lucide-react';
import { PrimaryButton, GhostButton } from './Buttons';
import Title from './Title';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function Pricing() {
    const refs = useRef<(HTMLDivElement | null)[]>([]);
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <section id="pricing" className="relative py-20 bg-white/3 border-t border-white/6 overflow-hidden">
            {/* Animated Background Orbs */}
            <motion.div
                className="absolute top-0 right-0 w-96 h-96 bg-brand/10 rounded-full blur-3xl"
                animate={{
                    y: [0, 50, 0],
                    x: [0, -30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
                animate={{
                    y: [0, -50, 0],
                    x: [0, 30, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Geometric shapes */}
            <motion.div
                className="absolute top-1/3 left-1/4 w-14 h-14 border-2 border-[#F7A95D] rounded-lg"
                animate={{
                    y: [0, -70, 0],
                    rotate: [0, 180, 360],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute bottom-1/3 right-1/4 w-16 h-16 border-2 border-secondary/20"
                animate={{
                    y: [0, -80, 0],
                    rotate: [0, -180, -360],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.5,
                }}
            />

            {/* Plus signs */}
            <motion.div
                className="absolute top-1/4 right-1/3 text-brand/20 text-3xl font-light"
                animate={{
                    y: [0, -60, 0],
                    rotate: [0, 90, 0],
                    opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                +
            </motion.div>

            <motion.div
                className="absolute bottom-1/4 left-1/3 text-secondary/20 text-4xl font-light"
                animate={{
                    y: [0, -70, 0],
                    rotate: [0, -90, 0],
                    opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                }}
            >
                +
            </motion.div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">

                <Title
                    title={t.pricing}
                    heading={t.simplePricing}
                    description={t.pricingDesc}
                />

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {t.plansData.map((plan, i) => (
                        <motion.div
                            key={i}

                            ref={(el) => {
                                refs.current[i] = el;
                            }}
                            initial={{ y: 150, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.1 + i * 0.1 }}
                            onAnimationComplete={() => {
                                const card = refs.current[i];
                                if (card) {
                                    card.classList.add("transition", "duration-500", "hover:scale-102");
                                }
                            }}
                            className={`group relative p-6 rounded-xl border backdrop-blur overflow-hidden ${plan.popular
                                ? 'border-brand/50 bg-brand/5'
                                : 'border-secondary/10 bg-dark-card/50'
                                }`}
                            whileHover={{ y: -5 }}
                        >
                            {/* Glow effect */}
                            <motion.div
                                className="absolute inset-0 bg-linear-to-br from-brand/0 to-secondary/0 group-hover:from-brand/5 group-hover:to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />

                            {plan.popular && (
                                <motion.p
                                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#EFFF43] !text-gray-950 rounded-md text-xs font-semibold"
                                    animate={{
                                        y: [0, -5, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                >
                                    {t.mostPopular}
                                </motion.p>
                            )}

                            <div className="relative z-10 mb-6">
                                <p>{plan.name}</p>
                                <div className="flex items-end gap-3">
                                    <span className="text-3xl font-extrabold">{plan.price}</span>
                                    <span className="text-sm text-gray-400">
                                        / {plan.credits}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-300 mt-2">
                                    {plan.desc}
                                </p>
                            </div>

                            <ul className="relative z-10 space-y-3 mb-6">
                                {plan.features.map((feat, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-3 text-sm text-gray-300"
                                    >
                                        <Check className="w-4 h-4 text-brand" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <div className="relative z-10">
                                {plan.popular ? (
                                    <PrimaryButton className="w-full text-black">
                                        {t.getStartedBtn}
                                    </PrimaryButton>
                                ) : (
                                    <GhostButton className="w-full justify-center text-[#EFFF43]">
                                        {t.getStartedBtn}
                                    </GhostButton>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};