import { motion } from 'framer-motion';

export const Logo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            className="fixed top-6 left-8 z-50 pointer-events-auto"
        >
            <a href="#hero" className="block relative group">
                <div className="absolute -inset-2 bg-neon-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                    src="/bm-logo.png"
                    alt="BMugesh Logo"
                    className="relative h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]"
                />
            </a>
        </motion.div>
    );
};
