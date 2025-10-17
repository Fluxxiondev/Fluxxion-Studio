import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import { ArrowRight, Sparkles } from "lucide-react";
import { blogPosts } from "../data/blogPosts";

const heroVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, y: -24, transition: { duration: 0.4, ease: "easeIn" } },
};

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function Blog() {
  const [searchTerm] = useState("");

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";

    return () => {
      root.style.scrollBehavior = previousBehavior;
    };
  }, []);

  const posts = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    const sortedPosts = [...blogPosts].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    if (!normalizedTerm) {
      return sortedPosts;
    }

    return sortedPosts.filter((post) => {
      const haystack = [post.title, post.excerpt, post.tags.join(" ")]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedTerm);
    });
  }, [searchTerm]);

  return (
    <Motion.main
      className="pt-28 pb-24 bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeIn" } }}
    >
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#1a1a2e]" />
        <Motion.div
          className="relative max-w-5xl mx-auto px-6 lg:px-12 py-20 text-white"
          variants={heroVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="flex items-center gap-3 text-[#c084fc] font-medium uppercase tracking-widest">
            <Sparkles className="w-5 h-5" />
            <span>Fluxxion Insights</span>
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1]">
            Creative Engineering Stories Crafted for Motion-First Teams
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-3xl">
            <ReactTyped
              strings={[
                "Explore how we build expressive digital experiences with React, Framer Motion, and purposeful design systems. Every article focuses on clarity, performance, and the art of animation.",
              ]}
              typeSpeed={40}
              backSpeed={20}
              startDelay={500}
              backDelay={2500}
              loop
            />
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/blog/motion-first-experience-design"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-xl transition-all duration-300 hover:bg-indigo-700 hover:scale-105 hover:shadow-2xl"
            >
              Read Latest Story
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white/90 transition-all duration-300 hover:text-white hover:border-white/50 hover:-translate-y-1 hover:scale-105"
            >
              Back to Studio
            </Link>
          </div>
        </Motion.div>
      </section>

      <section className="relative z-10 -mt-14">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <Motion.div
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="grid gap-8 md:grid-cols-2"
          >
            {posts.map((post, index) => {
              const isFirst = index === 0;
              return (
                <Motion.article
                  key={post.id}
                  variants={cardVariants}
                  whileHover={{
                    y: -14,
                    scale: 1.03,
                    boxShadow: "0 24px 60px rgba(26, 26, 46, 0.14)",
                    transition: { type: "spring", stiffness: 260, damping: 20 },
                  }}
                  className="group rounded-3xl border border-gray-200/70 bg-white shadow-xl transition-all duration-300 ease-out overflow-hidden"
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex h-full flex-col"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <Motion.img
                        src={post.coverImage.src}
                        alt={post.coverImage.alt}
                        loading={isFirst ? "eager" : "lazy"}
                        className="absolute inset-0 h-full w-full object-cover"
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
                      <div className="absolute left-6 bottom-6 flex items-center gap-3 text-sm font-medium text-white/90">
                        <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">
                          {dateFormatter.format(new Date(post.publishedAt))}
                        </span>
                        <span className="rounded-full bg-[#4f46e5]/90 px-3 py-1">
                          {post.readingTime}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-5 p-8">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#f5f3ff] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#4f46e5]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827] transition-colors duration-300 group-hover:text-[#4f46e5]">
                        {post.title}
                      </h2>
                      <p className="text-base leading-relaxed text-gray-600">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto flex items-center gap-2 text-[#4f46e5] font-semibold">
                        Continue Reading
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </Motion.article>
              );
            })}
          </Motion.div>
        </div>
      </section>
    </Motion.main>
  );
}

export default Blog;