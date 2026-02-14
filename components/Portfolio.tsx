import { motion } from 'framer-motion';
import { ArrowRightIcon, SparklesIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

const Portfolio = () => {
    const { language } = useLanguage();
    const t = translations[language];

    const staticPortfolioData = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
            tags: ['React', 'Node.js', 'MongoDB']
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
            tags: ['Figma', 'Prototyping', 'User Research']
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=400&fit=crop',
            tags: ['Logo Design', 'Guidelines', 'Visual Identity']
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
            tags: ['Next.js', 'TypeScript', 'Tailwind']
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
            tags: ['Responsive', 'SEO', 'Performance']
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
            tags: ['React Native', 'Firebase', 'iOS/Android']
        },
    ];

    const portfolioItems = staticPortfolioData.map((item, index) => ({
        ...item,
        title: t.portfolioItems[index]?.title ?? '',
        category: t.portfolioItems[index]?.category ?? '',
    }));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 300, damping: 30 },
        },
    };

    return (
        <section id="portfolio" className="relative py-20 2xl:py-32 px-4 overflow-hidden">
            {/* Animated Background Orbs */}
            <motion.div
                className="absolute top-0 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
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
                className="absolute bottom-0 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
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

            {/* Floating Sparkles */}
            <motion.div
                className="absolute top-20 right-20 text-[#43B9AA]"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <SparklesIcon className="w-12 h-12" />
            </motion.div>

            <motion.div
                className="absolute bottom-32 left-20 text-[#43B9AA]"
                animate={{
                    y: [0, 20, 0],
                    rotate: [360, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <SparklesIcon className="w-10 h-10" />
            </motion.div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.span
                        className="inline-block px-4 py-2 rounded-full border-[#43B9AA]  border text-white/80 text-sm font-semibold mb-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {t.ourWork}
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#43B9AA]">
                        {t.previousWorks}
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        {t.previousWorksDesc}
                    </p>
                </motion.div>

                {/* Portfolio Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {portfolioItems.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
                            whileHover={{ y: -5 }}
                        >
                            {/* Glow effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-cyan-500/0 group-hover:from-indigo-500/10 group-hover:to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />

                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <motion.img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.4 }}
                                />
                                {/* Overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-6">
                                <motion.span
                                    className="inline-block px-3 py-1 rounded-full border border-[#43B9AA]  text-white text-xs font-semibold mb-3"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {item.category}
                                </motion.span>

                                <h3 className="text-xl text-[#43B9AA] font-bold mb-2  transition-colors">
                                    {item.title}
                                </h3>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {item.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs text-gray-100/90 bg-[#43B9AA] px-2 py-1 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* View Project Button */}
                                <motion.button
                                    className="flex items-center gap-2 text-white  text-sm font-semibold"
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {t.viewProject}
                                    <ArrowRightIcon className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <motion.button
                        className="px-8 py-4 rounded-lg bg-[#43B9AA] text-white font-semibold hover:shadow-lg hover:shadow-[#43B9AA]/50 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t.viewAllProjects}
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Portfolio;
