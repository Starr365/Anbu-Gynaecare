'use client';

import { motion } from 'framer-motion';

export const dynamic = 'force-dynamic';

export default function ForgotPasswordPage() {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
    };

    return (
        <motion.div
            className="min-h-screen bg-linear-to-br from-accent/30 via-blush/50 to-rose/30 flex items-center justify-center px-4 relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Background decorative elements for depth */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blush/30 rounded-full blur-3xl"></div>
            </div>
            <motion.div
                className="relative mt-8 mb-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full p-8 border border-white/20"
                variants={itemVariants}
            >
                <motion.div className="text-center mb-8" variants={itemVariants}>
                    <motion.h1
                        className="font-headline text-3xl font-semibold text-text mb-2"
                        variants={itemVariants}
                    >
                        Anbu Gynaecare
                    </motion.h1>
                    <motion.h2
                        className="font-headline text-xl font-semibold text-text mb-4"
                        variants={itemVariants}
                    >
                        Reset Your Password 🔐
                    </motion.h2>
                    <motion.p
                        className="font-body text-sm text-muted"
                        variants={itemVariants}
                    >
                        Enter your email address and we&apos;ll send you a link to reset your password.
                    </motion.p>
                </motion.div>
                {/* Forgot Password Form */}
                <form className="space-y-6">
                    <motion.div variants={itemVariants}>
                        <label htmlFor="email" className="block font-body text-sm font-medium text-muted mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            className="w-full px-4 py-3 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm text-text placeholder-muted/70 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300"
                        />
                    </motion.div>
                    <motion.button
                        type="submit"
                        className="w-full bg-accent/80 backdrop-blur-sm text-bg font-semibold py-3 px-6 rounded-2xl shadow-lg hover:bg-accent/90 hover:scale-105 hover:shadow-xl transition-all duration-300 border border-white/20"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Reset Password
                    </motion.button>
                </form>
                <motion.div className="text-center mt-6" variants={itemVariants}>
                    <a href="/login" className="font-body text-sm text-accent hover:underline">
                        ← Back to Login
                    </a>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}