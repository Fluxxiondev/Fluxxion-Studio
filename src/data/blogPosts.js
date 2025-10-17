import motionCover from "../assets/images/pexels-jakubzerdzicki-34212896.jpg";
import performanceCover from "../assets/images/pexels-danbuilds-633409.jpg";
import storytellingCover from "../assets/images/pexels-digitalbuggu-374563.jpg";
import react19Cover from "../assets/images/react-19-features.svg";

export const blogPosts = [
  {
    id: "motion-first-experiences",
    slug: "motion-first-experience-design",
    title: "Designing Motion-First Experiences for Creative Studios",
    publishedAt: "2025-10-10",
    readingTime: "6 min read",
    excerpt:
      "Learn how to use Framer Motion variants, staggered entrances, and ambient parallax to craft expressive agency experiences that still feel performant.",
    coverImage: {
      src: motionCover,
      alt: "Abstract neon lights forming motion trails",
    },
    tags: ["Framer Motion", "Design Systems", "Guides"],
    content: [
      {
        type: "paragraph",
        text: "Motion-first interfaces balance delight with clarity. The goal is to guide the eye without overwhelming users who are trying to scan or trigger interactions. For Fluxxion Studio we favor smooth fade-ins, subtle depth, and cohesive easing curves so every animation feels like part of the same system.",
      },
      {
        type: "heading",
        text: "Use Variants to Stay Consistent",
      },
      {
        type: "paragraph",
        text: "Define a motion vocabulary once and reuse it. Framer Motion variants let you centralize timing, easing, and staggering so every section fades with the same personality. Keep durations around 0.6–0.8s and use `ease:\"easeOut\"` to land confidently without abrupt stops.",
      },
      {
        type: "list",
        items: [
          "Create a `fadeRaise` variant that lifts cards by 12px while fading",
          "Compose a `staggeredContainer` variant to delay children by 0.12s",
          "Use `viewport={{ once: true }}` so animations trigger only when needed",
        ],
      },
      {
        type: "heading",
        text: "Balance Motion With Performance",
      },
      {
        type: "paragraph",
        text: "A performant experience preloads critical assets, minimizes layout shift, and scopes animation work to visible regions. Combine Tailwind's utility classes with `motion.div` so styles remain lightweight while you gain access to `whileHover` and `whileTap` primitives for interactive feedback.",
      },
      {
        type: "quote",
        text: "If users feel the motion, they should also feel in control.",
      },
      {
        type: "paragraph",
        text: "Add reduced motion fallbacks by checking `window.matchMedia('(prefers-reduced-motion: reduce)')`. When motion should be muted, keep the layout pristine by simply fading elements with no transforms.",
      },
    ],
  },
  {
    id: "static-blog-performance",
    slug: "static-react-blog-performance-checklist",
    title: "Building a Static React Blog That Still Feels Alive",
    publishedAt: "2025-10-05",
    readingTime: "5 min read",
    excerpt:
      "Static routes are perfect for creative agencies. Pair smart bundling with targeted animation cues and your posts will feel handcrafted without sacrificing speed.",
    coverImage: {
      src: performanceCover,
      alt: "Laptop screen showing a fast loading analytics dashboard",
    },
    tags: ["Best Practices", "Vite", "Performance"],
    content: [
      {
        type: "paragraph",
        text: "Static generation keeps our content blazing fast, especially when combined with Vite's dev-time DX. We write posts as JavaScript objects so they ship as part of the bundle—no runtime fetch needed and no hydration confusion.",
      },
      {
        type: "heading",
        text: "Organize Content for Team Collaboration",
      },
      {
        type: "paragraph",
        text: "Store post metadata in a single `blogPosts` array. Each object can drive cards, hero sections, and SEO tags. Because the structure lives in code, contributors can rely on type hints and lint rules to stay consistent.",
      },
      {
        type: "list",
        items: [
          "Keep excerpts under 180 characters for clean card layouts",
          "Add a `readingTime` string so the UI doesn't guess",
          "Derive hero gradients from the style guide palette",
        ],
      },
      {
        type: "heading",
        text: "Animate with Restraint",
      },
      {
        type: "paragraph",
        text: "Use `AnimatePresence` for route transitions and limit the number of simultaneously animating elements. Wrapping routes in a `mode=\"wait\"` presence ensures outgoing pages finish before newcomers appear, which yields smooth cross-fades.",
      },
      {
        type: "paragraph",
        text: "Finally, preload hero imagery with `loading=\"eager\"` on the first card and rely on lazy loading for the rest. This keeps the first impression sharp while guarding against layout jank on longer lists.",
      },
    ],
  },
  {
    id: "story-driven-showcases",
    slug: "story-driven-3d-showcases",
    title: "Story-Driven 3D Showcases Without Overwhelm",
    publishedAt: "2025-09-22",
    readingTime: "7 min read",
    excerpt:
      "Subtle depth, progressive disclosure, and well-timed copy help complex 3D scenes stay approachable. Here's how we approach narrative-driven showcases.",
    coverImage: {
      src: storytellingCover,
      alt: "Creative professional reviewing storyboards on a desk",
    },
    tags: ["React Three Fiber", "Storytelling", "Process"],
    content: [
      {
        type: "paragraph",
        text: "React Three Fiber is powerful, but the trick is to resist adding everything at once. Begin with a clear story arc—introduction, reveal, payoff—and decorate each step with motion that clarifies instead of distracts.",
      },
      {
        type: "heading",
        text: "Lead With Narrative Anchors",
      },
      {
        type: "paragraph",
        text: "Use copy and supporting UI to set context before immersive scenes load. We like to animate section headings with a slight upward drift and delay the canvas entrance until the user scrolls within 45% of the viewport height.",
      },
      {
        type: "heading",
        text: "Keep Accessibility in View",
      },
      {
        type: "paragraph",
        text: "Offer a reduced motion path that swaps heavy 3D canvases for static imagery. Provide descriptive captions and ensure focus states remain visible. Animations should never obscure essential controls or text.",
      },
      {
        type: "list",
        items: [
          "Use Tailwind focus utilities like `focus-visible:outline` to keep keyboard users oriented",
          "Avoid auto-playing audio or video without explicit user intent",
          "Track GPU memory usage in devtools when introducing larger GLTF assets",
        ],
      },
      {
        type: "paragraph",
        text: "When everything aligns—story, motion, accessibility—you get immersive experiences that feel intentional. That's the heart of every Fluxxion Studio showcase.",
      },
    ],
  },
  {
    id: "getting-started-react-19",
    slug: "getting-started-with-react-19",
    title: "Getting Started with React 19",
    publishedAt: "2024-01-15",
    readingTime: "8 min read",
    excerpt:
      "Explore the latest features and improvements in React 19, including enhanced hooks and performance optimizations.",
    coverImage: {
      src: react19Cover,
      alt: "Stylized layout highlighting React 19 feature tiles",
    },
    tags: ["React", "Hooks", "Performance"],
    content: [
      {
        type: "heading",
        text: "Introduction to React 19",
      },
      {
        type: "paragraph",
        text: "React 19 brings significant improvements to the developer experience and application performance. In this comprehensive guide, we'll explore the key features that make React 19 a game-changer for modern web development.",
      },
      {
        type: "heading",
        text: "Key Features",
      },
      {
        type: "paragraph",
        text: "The new version introduces several groundbreaking features:",
      },
      {
        type: "list",
        items: [
          "Enhanced Hooks: New hooks provide better state management and side effect handling.",
          "Automatic Batching: React now batches updates more intelligently for better performance.",
          "Concurrent Features: Improved support for concurrent rendering patterns.",
        ],
      },
      {
        type: "heading",
        text: "Performance Improvements",
      },
      {
        type: "paragraph",
        text: "React 19 includes several optimizations that can significantly improve your application's performance. The new rendering engine is more efficient, and the framework now provides better tools for identifying performance bottlenecks.",
      },
      {
        type: "heading",
        text: "Migration Guide",
      },
      {
        type: "paragraph",
        text: "Upgrading to React 19 is straightforward for most projects. The team has ensured backward compatibility while introducing new features. Follow the official migration guide for a smooth transition.",
      },
      {
        type: "heading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "React 19 represents a significant step forward in web development. Whether you're building a new project or upgrading an existing one, the improvements in performance and developer experience make it worth the effort.",
      },
    ],
  },
];

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug) {
  const index = blogPosts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? blogPosts[index - 1] : null,
    next: index < blogPosts.length - 1 ? blogPosts[index + 1] : null,
  };
}