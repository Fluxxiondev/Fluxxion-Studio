import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({ children }) => (
  <h2 className="text-4xl sm:text-5xl font-extrabold text-[#c084fc] leading-tight">
    {children}
  </h2>
);

const PulsatingSkillTile = ({ skill, index }) => (
  <motion.div
    className="skill-tile bg-[#1f2937] p-6 rounded-3xl border border-[#374151] cursor-pointer 
                   relative overflow-hidden group flex flex-col items-center"
    initial={{ opacity: 0, y: 50 }}
    whileInView="animate"
    viewport={{ once: true, amount: 0.5 }}
    variants={{
      animate: {
        opacity: 1,
        y: 0,
        boxShadow: [
          '0 0 0px #374151',
          '0 0 15px rgba(192, 132, 252, 0.4)',
          '0 0 0px #374151'
        ]
      },
    }}
    whileHover={{
      scale: 1.05,
      y: -8,
      rotateZ: 0.5,
      boxShadow: "0 15px 50px rgba(168, 85, 247, 0.6)",
    }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 15,
      boxShadow: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: index * 0.15 }
    }}
  >

    <div className="relative w-20 h-20 mb-4">
      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
        <path
          className="text-[#374151]"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <motion.path
          fill="none"
          stroke="url(#skillGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={`${skill.level}, 100`}
          d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: skill.level / 100 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xl font-extrabold text-[#c084fc]">
        {skill.icon}
      </div>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#ff7aa2", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#c084fc", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <h4 className="font-bold text-xl text-[#f3f4f6] mt-2">{skill.name}</h4>
    <p className="mt-2 text-sm font-medium text-[#9ca3af]">{skill.level}% Mastery</p>
  </motion.div>
);


export default function About() {
  const timelineRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timelineItems = gsap.utils.toArray(".timeline-item");

      gsap.to(".timeline-line", {
        height: "100%",
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
      });

      timelineItems.forEach((item, index) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          },
        });
      });

    }, timelineRef);

    return () => ctx.revert();
  }, []);

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  const skills = [
    { name: "UI/UX Design", level: 90, icon: "💡" },
    { name: "Frontend Development", level: 95, icon: "💻" },
    { name: "Motion & Animation", level: 85, icon: "✨" },
    { name: "Brand Strategy", level: 80, icon: "🎯" },
  ];

  const timeline = [
    { year: "2018", title: "Founded", desc: "Fluxxion started as a two-person studio focused on experimental UIs." },
    { year: "2019", title: "First Product", desc: "Launched an award-winning design system for startups." },
    { year: "2021", title: "Scaling", desc: "Expanded to a full-service team: designers, devs, motion artists." },
    { year: "2024", title: "SaaS Focus", desc: "Built multiple SaaS experiences with performance-first architecture." },
  ];

  const team = [
    { name: "Aisha Khan", role: "Creative Director", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop&crop=faces" },
    {
      name: "Bilal Raza", role: "Lead Frontend",
      img: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=400&auto=format&fit=crop&crop=faces"
    },
    { name: "Sara Ali", role: "Motion Artist", img: "https://images.unsplash.com/photo-1546525848-3ce03ca516f6?q=80&w=400&auto=format&fit=crop&crop=faces" },
    { name: "Hamza Iqbal", role: "Product Strategist", img: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=400&auto=format&fit=crop&crop=faces" },
  ];

  return (
    <div className="min-h-screen bg-[#111827] text-[#f3f4f6] overflow-hidden">
      <header className="pt-24 pb-20 px-4 sm:px-8 lg:px-20 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none"
        >
          Crafting digital experiences with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] to-[#ff4d8b]">
            Clarity
          </span>{" "}
          and{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d8b] to-[#c084fc]">
            Motion
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="mt-6 text-[#9ca3af] max-w-4xl mx-auto text-lg sm:text-xl"
        >
          Fluxxion Studio blends **design** and **engineering** to build products that are beautiful,
          performative, and memorable. We focus on human-centered interfaces, high-quality code,
          and motion to communicate purpose.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#story"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#ff7aa2] to-[#ff4d8b] text-white font-bold text-lg shadow-lg 
                                 hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] transition-all duration-300 transform hover:scale-[1.05]"
          >
            Discover Our Story
          </a>
          <a
            href="#contact"
            className="inline-block px-8 py-3 rounded-full border border-[#374151] text-[#f3f4f6] font-semibold text-lg transition-colors duration-300
                                 hover:border-[#a855f7] hover:text-[#a855f7] hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transform hover:scale-[1.02]"
          >
            Work With Us
          </a>
        </motion.div>
      </header>

      <section id="story" className="px-4 sm:px-8 lg:px-20 py-20">
        <motion.div
          className="mx-auto max-w-6xl bg-[#1f2937] rounded-3xl p-8 sm:p-12 border border-[#374151] shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <SectionTitle>Our Story</SectionTitle>
          <p className="mt-6 text-[#9ca3af] text-lg leading-relaxed max-w-4xl">
            We started as a tiny team with a big obsession: to make digital products that feel alive.
            Over the years, we merged **craft with engineering**—producing interfaces that are
            intuitive and motion that clarifies function. Our work sits at the intersection of
            strategy, design, and code, delivering solutions that not only look incredible but also
            drive measurable results.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#111827] rounded-2xl border border-[#374151] transition-all duration-300 
                                     hover:border-[#c084fc] hover:shadow-xl hover:shadow-[#c084fc]/30 transform hover:-translate-y-1">
              <h4 className="font-semibold text-xl text-[#f3f4f6]">Purpose-Driven</h4>
              <p className="text-[#9ca3af] mt-2">To solve real problems with elegant interfaces and robust engineering.</p>
            </div>
            <div className="p-6 bg-[#111827] rounded-2xl border border-[#374151] transition-all duration-300 
                                     hover:border-[#c084fc] hover:shadow-xl hover:shadow-[#c084fc]/30 transform hover:-translate-y-1">
              <h4 className="font-semibold text-xl text-[#f3f4f6]">Iterative Approach</h4>
              <p className="text-[#9ca3af] mt-2">Research-led design, iterative development, and continuous performance tuning.</p>
            </div>
            <div className="p-6 bg-[#111827] rounded-2xl border border-[#374151] transition-all duration-300 
                                     hover:border-[#c084fc] hover:shadow-xl hover:shadow-[#c084fc]/30 transform hover:-translate-y-1">
              <h4 className="font-semibold text-xl text-[#f3f4f6]">Motion Clarity</h4>
              <p className="text-[#9ca3af] mt-2">Using animation not just for flash, but to enhance user experience and communication.</p>
            </div>
          </div>
        </motion.div>
      </section>


      <section id="skills" ref={skillsRef} className="px-4 sm:px-8 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>Core Expertise</SectionTitle>
          <p className="text-[#9ca3af] mt-4 max-w-3xl text-lg">
            A compact view of the capabilities we bring to every project, rooted in high standards
            of design and frontend engineering.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <PulsatingSkillTile key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>


      <section id="journey" ref={timelineRef} className="px-4 sm:px-8 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>Our Journey</SectionTitle>
          <p className="text-[#9ca3af] mt-4 max-w-3xl text-lg">
            A short timeline of milestones that shaped Fluxxion Studio from a tiny startup to a
            full-service digital partner.
          </p>
        </div>
        <div className="mt-12 relative">
          <div className="absolute left-4 sm:left-10 lg:left-0 top-0 bottom-0 w-0.5 transform -translate-x-1/2">
            <div className="timeline-line absolute w-full top-0 h-0 bg-gradient-to-b from-[#c084fc] to-[#ff4d8b] rounded-full"></div>
          </div>

          <div className="space-y-12 pl-8 sm:pl-16 lg:pl-0">
            {timeline.map((t) => (
              <div key={t.year} className="timeline-item flex relative items-start lg:items-center">

                <div className="absolute left-4 sm:left-10 lg:left-0 w-4 h-4 rounded-full bg-[#ff4d8b] border-2 border-[#1f2937] transform -translate-x-1/2 z-10"></div>

                <div className="bg-[#1f2937] border border-[#374151] rounded-2xl p-6 w-full lg:max-w-2xl lg:ml-20 
                                             transition-all duration-300 transform hover:scale-[1.01] hover:shadow-xl hover:shadow-[#a855f7]/20 
                                             relative overflow-hidden group">

                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[#c084fc]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">

                    <div className="min-w-[80px] text-center sm:text-left text-[#c084fc] font-extrabold text-2xl">
                      {t.year}
                    </div>
                    <div className="w-full">
                      <h4 className="text-[#f3f4f6] font-bold text-xl">{t.title}</h4>
                      <p className="text-[#9ca3af] mt-1">{t.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="team" className="px-4 sm:px-8 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>Meet the Visionaries</SectionTitle>
          <p className="text-[#9ca3af] mt-4 max-w-3xl text-lg">
            A small, focused team of passionate designers, developers, and strategists.
          </p>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((m, index) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 300, damping: 15 }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0.3,
                  boxShadow: "0 15px 40px rgba(168, 85, 247, 0.5)",
                  borderColor: '#a855f7',
                }}

                className="bg-[#1f2937] p-6 rounded-3xl border border-[#374151] text-center"
              >
                <div className="w-full flex justify-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#ff4d8b] shadow-lg">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-[#f3f4f6] font-bold text-xl">{m.name}</h4>
                  <p className="text-[#9ca3af] mt-1 text-sm font-medium">{m.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section id="contact" className="px-4 sm:px-8 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto text-center bg-[#1f2937] p-10 sm:p-16 rounded-3xl border-2 border-[#ff4d8b] shadow-[0_0_40px_rgba(255,77,139,0.1)] 
                                 transition-all duration-500 hover:border-[#a855f7] hover:shadow-[0_0_50px_rgba(168,85,247,0.3)]">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#f3f4f6] leading-tight">
            Ready to build something **memorable**?
          </h3>
          <p className="text-[#9ca3af] mt-4 text-lg max-w-2xl mx-auto">
            Tell us about your project, and we’ll get back with a plan that fits your vision and
            delivers exceptional results.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#ff7aa2] to-[#ff4d8b] text-white font-bold text-lg shadow-lg 
                                     hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] transition-all duration-300 transform hover:scale-[1.05]"
            >
              Start a Conversation
            </a>
            <a
              href="/works"
              className="inline-block px-8 py-3 rounded-full border border-[#374151] text-[#f3f4f6] font-semibold text-lg transition-colors duration-300
                                     hover:border-[#a855f7] hover:text-[#a855f7] hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transform hover:scale-[1.02]"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>



      <footer className="py-10 text-center text-sm text-[#9ca3af] border-t border-[#374151]">
        © {new Date().getFullYear()} Fluxxion Studio. All rights reserved. Built with 💻 and ✨.
      </footer>
    </div>

  );
}