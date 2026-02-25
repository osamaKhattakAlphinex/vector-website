'use client';
import { ArrowRightIcon, Mail, Phone, User, MessageSquare, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export default function CTA() {
    const { language, isRTL } = useLanguage();
    const t = translations[language];
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        } else if (formData.name.trim().length > 50) {
            newErrors.name = 'Name must not exceed 50 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        } else if (formData.phone.replace(/\D/g, '').length < 10) {
            newErrors.phone = 'Phone number must have at least 10 digits';
        }

        // Description validation
        if (!formData.description.trim()) {
            newErrors.description = 'Project description is required';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        } else if (formData.description.trim().length > 500) {
            newErrors.description = 'Description must not exceed 500 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            setFormData({ name: '', email: '', phone: '', description: '' });
            setErrors({});
            setIsLoading(false);

            // Hide success message after 3 seconds
            setTimeout(() => setIsSubmitted(false), 3000);
        }, 1000);
    };

    const getInputClass = (fieldName: string) => {
        const baseClass = `w-full py-3 rounded-lg bg-white/10 border text-white placeholder-gray-400 focus:outline-none focus:bg-white/15 transition-all ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'}`;
        const errorClass = errors[fieldName] ? 'border-red-500/50 focus:border-red-500' : 'border-white/20 focus:border-brand';
        return `${baseClass} ${errorClass}`;
    };

    return (
        <section id="CTA" className="relative py-20 2xl:pb-32 px-4 overflow-hidden">
            {/* Animated Background Orbs */}
            <motion.div
                className="absolute top-10 left-10 w-96 h-96 bg-brand/10 rounded-full blur-3xl"
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
                className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
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

            {/* Geometric shapes */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-12 h-12 border-2 border-brand/20 rounded-full"
                animate={{
                    y: [0, -65, 0],
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute bottom-1/4 right-1/3 w-14 h-14 border-2 border-secondary/20 rounded-lg"
                animate={{
                    y: [0, -75, 0],
                    rotate: [0, 180, 360],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                }}
            />

            {/* X marks */}
            <motion.div
                className="absolute top-1/3 right-1/4 text-brand/20 text-3xl font-light"
                animate={{
                    y: [0, -55, 0],
                    rotate: [0, 45, 0],
                    opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                ×
            </motion.div>

            <div className="container mx-auto max-w-4xl relative z-10">
                <div className={`rounded-3xl bg-linear-to-b from-brand/5 to-dark-card border border-brand/20 p-12 md:p-16 relative overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20" />
                    <div className="relative z-10">
                        <motion.h2 className="text-2xl sm:text-4xl font-semibold mb-6 text-center"
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
                        >
                            {t.readyToGrow}
                        </motion.h2>
                        <motion.p className="max-sm:text-sm text-slate-400 mb-10 max-w-xl mx-auto text-center"
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.2 }}
                        >
                            {t.ctaDescription}
                        </motion.p>

                        {/* Lead Form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            className="max-w-2xl mx-auto space-y-4"
                            initial={{ y: 60, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1, delay: 0.3 }}
                        >
                            {/* Name Input */}
                            <div className="relative">
                                <User className={`absolute top-1/2 -translate-y-1/2 size-5 pointer-events-none ${errors.name ? 'text-red-400' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={getInputClass('name')}
                                />
                                {errors.name && (
                                    <motion.div
                                        className="flex items-center gap-2 mt-1 text-red-400 text-sm"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <AlertCircle className="size-4" />
                                        {errors.name}
                                    </motion.div>
                                )}
                            </div>

                            {/* Email Input */}
                            <div className="relative">
                                <Mail className={`absolute top-1/2 -translate-y-1/2 size-5 pointer-events-none ${errors.email ? 'text-red-400' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={getInputClass('email')}
                                />
                                {errors.email && (
                                    <motion.div
                                        className="flex items-center gap-2 mt-1 text-red-400 text-sm"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <AlertCircle className="size-4" />
                                        {errors.email}
                                    </motion.div>
                                )}
                            </div>

                            {/* Phone Input */}
                            <div className="relative">
                                <Phone className={`absolute top-1/2 -translate-y-1/2 size-5 pointer-events-none ${errors.phone ? 'text-red-400' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={getInputClass('phone')}
                                />
                                {errors.phone && (
                                    <motion.div
                                        className="flex items-center gap-2 mt-1 text-red-400 text-sm"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <AlertCircle className="size-4" />
                                        {errors.phone}
                                    </motion.div>
                                )}
                            </div>

                            {/* Description Textarea */}
                            <div className="relative">
                                <MessageSquare className={`absolute top-4 size-5 pointer-events-none ${errors.description ? 'text-red-400' : 'text-gray-400'} ${isRTL ? 'right-4' : 'left-4'}`} />
                                <textarea
                                    name="description"
                                    placeholder="Tell us about your project..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className={`w-full py-3 rounded-lg bg-white/10 border text-white placeholder-gray-400 focus:outline-none focus:bg-white/15 transition-all resize-none ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} ${errors.description ? 'border-red-500/50 focus:border-red-500' : 'border-white/20 focus:border-brand'}`}
                                />
                                {errors.description && (
                                    <motion.div
                                        className="flex items-center gap-2 mt-1 text-red-400 text-sm"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <AlertCircle className="size-4" />
                                        {errors.description}
                                    </motion.div>
                                )}
                                <div className="text-xs text-gray-400 mt-1">
                                    {formData.description.length}/500 characters
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                className="w-full px-8 py-3 rounded-lg bg-brand text-black font-semibold hover:shadow-lg hover:shadow-brand/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            >
                                {isLoading ? (
                                    <>
                                        <motion.div
                                            className="size-4 border-2 border-white/30 border-t-white rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        {isSubmitted ? 'Message Sent!' : t.startProject}
                                        {!isSubmitted && <ArrowRightIcon size={20} />}
                                    </>
                                )}
                            </motion.button>
                        </motion.form>
                    </div>
                </div>
            </div>
        </section>
    );
};