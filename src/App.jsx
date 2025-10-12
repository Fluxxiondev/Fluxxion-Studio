
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
import React from "react";
import TestimonialsCarousel from "./component/TestimonialsCarousel";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      
      <TestimonialsCarousel />
      <div style={{width:'100%'}}>
        <Contact />
      </div>
    </div>
  );
}

export default App;
