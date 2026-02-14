'use client';
import Navbar from './Navbar';
import { LanguageProvider } from '@/context/LanguageContext';
import RTLWrapper from './RTLWrapper';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <RTLWrapper />
            <Navbar />
            {children}
        </LanguageProvider>
    );
}

