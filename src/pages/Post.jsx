import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  ScrollText,
} from "lucide-react";
import { getPostBySlug, getAdjacentPosts } from "../data/blogPosts";

const transitionConfig = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
};

const containerVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: transitionConfig },
  exit: { opacity: 0, y: -24, transition: { ...transitionConfig, duration: 0.45 } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug ?? "");
  const { previous, next } = getAdjacentPosts(slug ?? "");

  useEffect(() => {
    if (!post) {
      const timeout = setTimeout(() => navigate("/blog"), 1500);
      return () => clearTimeout(timeout);
    }
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    return undefined;
  }, [post, navigate]);

  if (!post) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0f172a] text-white">
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ScrollText className="mx-auto h-12 w-12 text-[#c084fc]" />
          <h1 className="text-3xl font-semibold">We couldn't find that story.</h1>
          <p className="text-gray-300">Redirecting you back to Fluxxion Insights…</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white/90 transition-colors duration-300 hover:text-white"
          >
            Back to Blog
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={post.id}
        className="bg-[#0b1120] text-white min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: transitionConfig }}
        exit={{ opacity: 0, transition: { ...transitionConfig, duration: 0.45 } }}
      >
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              className="h-full w-full object-cover opacity-40"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-[#0b1120]" />
          </div>

          <motion.div
            className="relative max-w-4xl mx-auto px-6 lg:px-10 pt-32 pb-20"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#c084fc] opacity-90 transition hover:opacity-100"
            >
              <ArrowLeft className="h-4 w-4" /> Back to insights
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/80">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-6 text-4xl lg:text-5xl font-extrabold leading-tight">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-white/70 text-sm">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[#ff7aa2]" />
                {dateFormatter.format(new Date(post.publishedAt))}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#4f46e5]" />
                {post.readingTime}
              </span>
            </div>
          </motion.div>
        </section>

        <section className="relative -mt-12 pb-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg px-8 py-12 shadow-2xl">
              <motion.div
                className="prose prose-invert prose-lg max-w-none"
                initial="hidden"
                animate="show"
              >
                {post.content.map((block, index) => {
                  switch (block.type) {
                    case "heading":
                      return (
                        <motion.h2
                          key={`heading-${index}`}
                          variants={contentVariants}
                          custom={index}
                          className="text-3xl font-bold text-white"
                        >
                          {block.text}
                        </motion.h2>
                      );
                    case "paragraph":
                      return (
                        <motion.p
                          key={`paragraph-${index}`}
                          variants={contentVariants}
                          custom={index}
                          className="text-lg leading-8 text-white/80"
                        >
                          {block.text}
                        </motion.p>
                      );
                    case "list":
                      return (
                        <motion.ul
                          key={`list-${index}`}
                          variants={contentVariants}
                          custom={index}
                          className="mt-6 list-disc space-y-3 pl-6 text-white/85"
                        >
                          {block.items.map((item, itemIndex) => (
                            <li key={`${index}-${itemIndex}`}>{item}</li>
                          ))}
                        </motion.ul>
                      );
                    case "quote":
                      return (
                        <motion.blockquote
                          key={`quote-${index}`}
                          variants={contentVariants}
                          custom={index}
                          className="border-l-4 border-[#ff7aa2] bg-white/5 px-6 py-4 text-lg italic text-white/90"
                        >
                          {block.text}
                        </motion.blockquote>
                      );
                    default:
                      return null;
                  }
                })}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0f172a]">
          <div className="max-w-5xl mx-auto px-6 lg:px-10 py-16 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            {previous ? (
              <Link
                to={`/blog/${previous.slug}`}
                className="group inline-flex items-center gap-3 text-left text-white/80 transition hover:text-white"
              >
                <span className="rounded-full bg-white/10 p-3 group-hover:bg-white/20">
                  <ArrowLeft className="h-5 w-5" />
                </span>
                <span>
                  <p className="text-xs uppercase tracking-widest text-white/50">Previous</p>
                  <p className="text-sm font-semibold">{previous.title}</p>
                </span>
              </Link>
            ) : (
              <span className="text-white/40 text-sm">Start of the archive</span>
            )}

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-[#4f46e5] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4338ca]"
            >
              Back to Blog
            </Link>

            {next ? (
              <Link
                to={`/blog/${next.slug}`}
                className="group inline-flex items-center gap-3 text-right text-white/80 transition hover:text-white"
              >
                <span>
                  <p className="text-xs uppercase tracking-widest text-white/50">Next</p>
                  <p className="text-sm font-semibold">{next.title}</p>
                </span>
                <span className="rounded-full bg-white/10 p-3 group-hover:bg-white/20">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Link>
            ) : (
              <span className="text-white/40 text-sm">More stories coming soon</span>
            )}
          </div>
        </section>
      </motion.main>
    </AnimatePresence>
  );
}

export default Post;