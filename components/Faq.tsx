import { ChevronDownIcon } from 'lucide-react';
import Title from './Title';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function Faq() {
    const refs = useRef<(HTMLDetailsElement | null)[]>([]);
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <section id="faq" className="relative py-20 2xl:py-32 overflow-hidden">
            {/* Animated Background Orbs */}
            <motion.div
                className="absolute top-20 left-10 w-80 h-80 bg-brand/10 rounded-full blur-3xl"
                animate={{
                    y: [0, 60, 0],
                    x: [0, 40, 0],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
                animate={{
                    y: [0, -60, 0],
                    x: [0, -40, 0],
                }}
                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Geometric shapes */}
            <motion.div
                className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-brand/20"
                animate={{
                    y: [0, -70, 0],
                    rotate: [0, -180, -360],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute bottom-1/4 left-1/3 w-14 h-14 border-2 border-secondary/20 rounded-full"
                animate={{
                    y: [0, -80, 0],
                    scale: [1, 1.4, 1],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.5,
                }}
            />

            {/* Question marks */}
            <motion.div
                className="absolute top-1/3 left-1/4 text-brand/20 text-4xl font-light"
                animate={{
                    y: [0, -60, 0],
                    rotate: [0, 15, -15, 0],
                    opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                ?
            </motion.div>

            <motion.div
                className="absolute bottom-1/3 right-1/4 text-secondary/20 text-3xl font-light"
                animate={{
                    y: [0, -65, 0],
                    rotate: [0, -15, 15, 0],
                    opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                }}
            >
                ?
            </motion.div>

            <div className="max-w-3xl mx-auto px-4 relative z-10">

                <Title
                    title={t.faqTitle}
                    heading={t.faqHeading}
                    description={t.faqDescription}
                />

                <div className="space-y-3">
                    {t.faqQuestions.map((faq, i) => (
                        <motion.details
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
                                    card.classList.add("transition", "duration-300");
                                }
                            }}
                            className="group bg-white/6 rounded-xl select-none"
                        >
                            <summary className="flex items-center justify-between p-4 cursor-pointer">
                                <h4 className="font-medium">{faq.question}</h4>
                                <ChevronDownIcon className="w-5 h-5 text-gray-300 group-open:rotate-180 transition-transform" />
                            </summary>
                            <p className="p-4 pt-0 text-sm text-gray-300 leading-relaxed">
                                {faq.answer}
                            </p>
                        </motion.details>
                    ))}
                </div>
            </div>
        </section>
    );
};