import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/HomeComponents/NavBar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";


// import TestimonialsCarousel from './component/Testimonials/TestimonialsCarousel'
// function App() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900">
//       <h1 className="text-5xl font-bold text-blue-400">
//         Tailwind is Working 🎉
//         <TestimonialsCarousel/>
//       </h1>
//     </div>
//   )
// }

// export default App
// src/App.jsx

import TestimonialsCarousel from "./component/TestimonialsCarousel";
import CaseStudiesPage from "./CaseStudy/CaseStudiesPage";
import Hero from "./components/Hero";

function App() {
  return (
    <div>
      <Hero/>
      <About/>
      <TestimonialsCarousel />
      <CaseStudiesPage /> 
      <Contact />
    </div>
  );
}

export default App;
