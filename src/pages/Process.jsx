import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tilt from "react-parallax-tilt";
import { Search, Lightbulb, Palette, Laptop, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    title: "Discovery & Research",
    subtitle: "Stakeholder interviews, user research, competitive audit",
    details:
      "We dive deep into understanding your goals, audience, and competitors to form solid foundations.",
    icon: <Search className="w-7 h-7 sm:w-8 sm:h-8 text-[#ff7aa2]" />,
  },
  {
    title: "Ideation & Brainstorming",
    subtitle: "Sketches, workshops, and concept selection",
    details:
      "Creative sessions and idea sprints to identify high-impact concepts that align with your brand.",
    icon: <Lightbulb className="w-7 h-7 sm:w-8 sm:h-8 text-[#facc15]" />,
  },
  {
    title: "Design & Prototyping",
    subtitle: "Wireframes, UI/UX design, and interaction prototypes",
    details:
      "Transforming ideas into beautiful, functional designs with real-time feedback and iterations.",
    icon: <Palette className="w-7 h-7 sm:w-8 sm:h-8 text-[#a855f7]" />,
  },
  {
    title: "Development & QA",
    subtitle: "Implementation, testing, performance tuning",
    details:
      "Robust code, optimized assets, and quality testing to ensure flawless performance.",
    icon: <Laptop className="w-7 h-7 sm:w-8 sm:h-8 text-[#38bdf8]" />,
  },
  {
    title: "Launch & Iterate",
    subtitle: "Deployment, analytics, and continuous improvement",
    details:
      "Seamless launch followed by data-driven enhancements for long-term success.",
    icon: <Rocket className="w-7 h-7 sm:w-8 sm:h-8 text-[#10b981]" />,
  },
];

export default function ProcessPage() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const stepRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const sections = gsap.utils.toArray(".process-step");

    const tlTrigger = ScrollTrigger.create({
      trigger: timelineRef.current,
      start: "top top",
      end: () => `+=${sections.length * window.innerHeight * 0.9}`,
      pin: true,
      scrub: 1,
      pinSpacing: false,
    });

    sections.forEach((step, i) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveStep(i),
        onEnterBack: () => setActiveStep(i),
      });
    });

    return () => {
      tlTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleStepClick = (index) => {
    setActiveStep(index);
    stepRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full text-slate-100 overflow-hidden pt-20 sm:pt-24"
      style={{
        background: "radial-gradient(circle at top right, #0b1220, #0f1724 70%)",
      }}
    >
      <header className="max-w-6xl mx-auto px-6 py-8 sm:py-12 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-6">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: "#c084fc" }}
          >
            Our Process
          </motion.h1>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-md mx-auto sm:mx-0">
            Experience the creative journey — from idea to impact.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.97 }}
          className="px-5 py-3 rounded-xl text-white font-semibold shadow-lg transition-all w-fit mx-auto sm:mx-0"
          style={{
            background: "linear-gradient(135deg, #ff7aa2, #ff4d8b)",
          }}
        >
          Get in Touch
        </motion.button>
      </header>

      <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        <aside
          ref={timelineRef}
          className="lg:col-span-4 order-2 lg:order-1 hidden sm:block"
        >
          <div className="sticky top-28 bg-[#1f2937]/60 p-6 rounded-2xl border border-[#374151] backdrop-blur-lg">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#c084fc" }}>
              Timeline
            </h2>
            <div className="space-y-8 relative">
              <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#ff7aa2] to-[#c084fc] opacity-30"></div>

              {STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleStepClick(i)}
                  className="relative flex items-start gap-4 cursor-pointer group transition-all"
                >
                  <motion.div
                    className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border-2 relative z-10"
                    animate={{
                      background:
                        activeStep === i
                          ? "linear-gradient(135deg,#ff7aa2,#ff4d8b)"
                          : "#1f2937",
                      borderColor: activeStep === i ? "#ff4d8b" : "#374151",
                      boxShadow:
                        activeStep === i
                          ? "0 0 20px rgba(255,122,162,0.6)"
                          : "none",
                      scale: activeStep === i ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      animate={{
                        scale: activeStep === i ? [1, 1.15, 1] : 1,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: activeStep === i ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    >
                      {step.icon}
                    </motion.div>
                  </motion.div>

                  <div>
                    <div
                      className={`font-semibold text-sm sm:text-base transition-colors ${activeStep === i
                          ? "text-[#ff7aa2]"
                          : "text-slate-300 group-hover:text-[#c084fc]"
                        }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-slate-400">
                      {step.subtitle}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8 order-1 lg:order-2 space-y-16 sm:space-y-20 pb-12">
          {STEPS.map((step, i) => (
            <section
              key={i}
              ref={(el) => (stepRefs.current[i] = el)}
              className="process-step flex flex-col sm:flex-row items-center justify-center text-center sm:text-left min-h-[50vh] sm:min-h-[60vh]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 60, rotateY: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  exit={{ opacity: 0, y: -50, rotateY: 15 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.4 }}
                  className="w-full"
                >
                  <Tilt
                    glareEnable={true}
                    glareMaxOpacity={0.2}
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.03,
                        rotateX: 3,
                        rotateY: -3,
                        boxShadow:
                          "10px 10px 30px rgba(255,122,162,0.3), -10px -10px 30px rgba(192,132,252,0.2)",
                      }}
                      transition={{ type: "spring", stiffness: 120 }}
                      className="p-5 sm:p-8 rounded-2xl border border-[#374151] shadow-2xl backdrop-blur-md bg-[#111827]/60 hover:shadow-pink-500/30"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, rgba(17,24,39,0.85) 0%, rgba(31,41,55,0.8) 100%)",
                      }}
                    >
                      <motion.h3
                        className="text-2xl sm:text-3xl font-bold"
                        style={{ color: "#f3f4f6" }}
                        whileHover={{ color: "#c084fc" }}
                      >
                        {step.title}
                      </motion.h3>
                      <p className="mt-1 text-slate-400 text-sm sm:text-base">
                        {step.subtitle}
                      </p>
                      <p className="mt-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                        {step.details}
                      </p>

                      <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#c084fc]/10 text-[#c084fc]">
                          Design
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#a855f7]/10 text-[#a855f7]">
                          Collaboration
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#ff7aa2]/10 text-[#ff7aa2]">
                          Speed
                        </span>
                      </div>
                    </motion.div>
                  </Tilt>
                </motion.div>
              </AnimatePresence>
            </section>
          ))}
        </div>
      </main>

      <footer className="py-10 text-center text-slate-500 text-xs sm:text-sm">
        © {new Date().getFullYear()} Fluxxion Studio — built with ❤️ and motion
      </footer>
    </div>
  );
}
