import React, { useState, useRef } from "react";
import {
    motion,
    useMotionValue,
    useTransform,
    useMotionTemplate,
} from "framer-motion";

const FEATURE_DATA = [
    {
        icon: "⚡",
        title: "Real-time Synchronization",
        description:
            "Experience sub-second data updates across all devices. Our sync engine ensures you always work with the latest information.",
    },
    {
        icon: "🧠",
        title: "AI-Powered Insights",
        description:
            "Harness machine learning to get smart, actionable insights. Make data-driven decisions effortlessly.",
    },
    {
        icon: "✨",
        title: "Intuitive Drag & Drop",
        description:
            "Customize your workflow with zero code. Our elegant interface makes complex configuration simple and enjoyable.",
    },
    {
        icon: "🌐",
        title: "Cross-Platform Compatibility",
        description:
            "Work seamlessly from any browser, OS, or device. A consistent, optimized experience everywhere you go.",
    },
    {
        icon: "🛡️",
        title: "Secure Vault Encryption",
        description:
            "Your data is protected with 256-bit AES encryption. Privacy and compliance are our top priorities.",
    },
    {
        icon: "🔗",
        title: "Seamless API Integration",
        description:
            "Connect with hundreds of tools instantly. Build powerful, interconnected applications effortlessly.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 },
    },
};

const FeatureCard = ({ feature }) => {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-1, 1], [12, -12]);
    const rotateY = useTransform(mouseX, [-1, 1], [-12, 12]);
    const scale = useTransform([mouseX, mouseY], [-1, 1], [1, 1.05]);

    const backgroundX = useTransform(mouseX, [-1, 1], ["0%", "100%"]);
    const backgroundY = useTransform(mouseY, [-1, 1], ["0%", "100%"]);
    const glow = useMotionTemplate`
        radial-gradient(400px at ${backgroundX} ${backgroundY},
        rgba(192, 132, 252, 0.25) 0%, transparent 80%)`;

    const innerX = useTransform(mouseX, [-1, 1], [5, -5]);
    const innerY = useTransform(mouseY, [-1, 1], [5, -5]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                scale,
                transformPerspective: 1000,
            }}
            variants={itemVariants}
            className="relative group p-6 sm:p-8 rounded-3xl bg-[#1f2937]
                shadow-2xl border border-[#374151] cursor-pointer overflow-hidden 
                hover:-translate-y-3 transition-transform duration-500"
        >
            <motion.div
                style={{ background: glow }}
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300 pointer-events-none"
            />

            <motion.div style={{ x: innerX, y: innerY }} className="relative z-10">
                <motion.div
                    whileHover={{
                        scale: 1.15,
                        boxShadow: "0 0 20px rgba(192,132,252,0.5)",
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-16 h-16 mb-5 flex items-center justify-center rounded-2xl 
                        bg-[#111827] shadow-xl"
                >
                    <span className="text-4xl">{feature.icon}</span>
                </motion.div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[#f3f4f6]">
                    {feature.title}
                </h3>
                <p className="text-base text-[#9ca3af] leading-relaxed mb-4">
                    {feature.description}
                </p>
                <motion.a
                    whileHover={{ x: 8 }}
                    href="#"
                    className="inline-flex items-center text-[#c084fc] font-semibold 
                        hover:text-[#e3b8ff] transition-colors"
                >
                    Explore Feature
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 ml-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </motion.svg>
                </motion.a>
            </motion.div>
        </motion.div>
    );
};

const HeroSection = () => {
    return (
        <section className="pt-8 pb-16 text-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <span className="inline-block px-4 py-1 rounded-full bg-[#1f2937] text-[#c084fc] text-sm font-semibold tracking-wide border border-[#374151] backdrop-blur-sm">
                    ✨ Elevate Your Workflow
                </span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-6xl sm:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight mb-6 max-w-5xl mx-auto"
            >
                <span className="text-[#f3f4f6] block">Unleash the System's</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] to-[#ff7aa2] block">
                    Simplified Power.
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-xl text-[#9ca3af] max-w-3xl mx-auto mb-10"
            >
                The only platform built from the ground up to be elegant, efficient, and instantly intuitive across all your devices.
            </motion.p>

            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.5 }}
                whileHover={{
                    scale: 1.05,
                    boxShadow: "0 15px 35px rgba(255,122,162,0.7)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-gradient-to-r from-[#ff7aa2] to-[#ff4d8b] text-white font-bold text-xl rounded-full shadow-xl transition-all duration-300 hover:from-[#ff8fb1] hover:to-[#ff5d96] relative z-20"
            >
                Start Free Trial Today →
            </motion.button>
        </section>
    );
};

export default function App() {
    const bodyClass = `bg-[#111827] text-[#f3f4f6]`;

    return (
        <div className={`min-h-screen ${bodyClass} transition-colors duration-700 font-inter relative`}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            >
                <div className="flex items-center space-x-3 py-6 sm:py-8">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff7aa2] to-[#ff4d8b] flex items-center justify-center text-white font-bold">
                        F
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-[#f3f4f6]">
                            Flux Features
                        </h1>
                        <p className="text-xs text-[#9ca3af]">
                            Clean • Minimal • Motion
                        </p>
                    </div>
                </div>

                <HeroSection />

                <div className="pt-20 pb-10 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="text-xl font-extrabold uppercase tracking-widest text-[#c084fc] mb-2"
                    >
                        CORE STRENGTHS
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-4 text-3xl sm:text-4xl font-bold text-[#f3f4f6] max-w-4xl mx-auto"
                    >
                        Everything you need for peak performance, all in one place.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
                >
                    {FEATURE_DATA.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="mt-32 mb-20 text-center p-10 sm:p-16 rounded-3xl bg-[#1f2937] backdrop-blur-sm shadow-2xl border border-[#374151]"
                >
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-[#f3f4f6] mb-4">
                        Ready to experience the elegance?
                    </h3>
                    <p className="text-xl text-[#9ca3af] mb-8 max-w-2xl mx-auto">
                        Join thousands of innovators and start building powerful, interconnected applications today.
                    </p>
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 10px 30px rgba(255,122,162,0.6)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 bg-gradient-to-r from-[#ff7aa2] to-[#ff4d8b] text-white font-bold text-lg rounded-full shadow-lg transition-all duration-300 hover:from-[#ff8fb1] hover:to-[#ff5d96]"
                    >
                        Get Started Now →
                    </motion.button>
                </motion.div>

                <footer className="w-full border-t border-[#374151] py-8">
                    <div className="max-w-7xl mx-auto text-center text-sm">
                        <p className="text-[#9ca3af]">
                            &copy; {new Date().getFullYear()} Elegant Solutions, Inc. All rights reserved.
                        </p>
                        <div className="mt-3 space-x-6">
                            <a href="#" className="text-[#9ca3af] hover:text-[#c084fc] transition-colors font-medium">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-[#9ca3af] hover:text-[#c084fc] transition-colors font-medium">
                                Terms of Service
                            </a>
                            <a href="#" className="text-[#9ca3af] hover:text-[#c084fc] transition-colors font-medium">
                                Contact Sales
                            </a>
                        </div>
                    </div>
                </footer>
            </motion.div>
        </div>
    );
}
