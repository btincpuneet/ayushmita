// // src/components/Footer.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import Logo from "./Logo"; // your separate logo component (should NOT render an <a> itself)

// const Footer = () => {
//   const quickLinks = [
//     { label: "About Us", to: "/about" },
//     { label: "Our Pricing", to: "/pricing" },
//     { label: "Our Gallery", to: "/gallery" },
//     { label: "Appointment", to: "/appointment" },
//     { label: "Privacy Policy", to: "/privacy" },
//   ];

//   const departments = [
//     "Orthology",
//     "Neurology",
//     "Dental Care",
//     "Opthalmology",
//     "Cardiology",
//   ];

//   const useful = [
//     "About Us",
//     "Our Pricing",
//     "Our Gallery",
//     "Appointment",
//     "Privacy Policy",
//   ];

//   return (
//     <footer className="bg-[#333333] text-gray-200">
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
//           {/* LEFT: logo + address + socials */}
//           <div>
//             <Link to="/" className="inline-block mb-5">
//               {/* Logo should be link-agnostic */}
//               <Logo />
//             </Link>

//             <div className="space-y-3 text-gray-300">
//               <p>Sahibabad, Ghaziabad, Uttar Pradesh</p>
//               <p>201005</p>
//               <p>+91-9555741758</p>
//               <p className="text-sm text-gray-400">info@upraj.com</p>
//             </div>

//             <div className="flex items-center gap-3 mt-6">
//               {/* Facebook */}
//               <a
//                 href="#"
//                 aria-label="Facebook"
//                 className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
//               >
//                 <svg className="w-4 h-4 text-[#ff8a00]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
//                   <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12H20l-1 3.9h-2.3v7A10 10 0 0022 12z"/>
//                 </svg>
//               </a>

//               {/* Twitter */}
//               <a
//                 href="#"
//                 aria-label="Twitter"
//                 className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
//               >
//                 <svg className="w-4 h-4 text-[#ff8a00]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
//                   <path d="M22 5.9c-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.5-1.8-.7.4-1.5.7-2.3.9A4.1 4.1 0 0015.5 5c-2.3 0-4.2 1.9-4.2 4.3 0 .3 0 .6.1.8C7.7 10 4.1 8 1.7 5.1c-.4.7-.6 1.6-.6 2.5 0 1.5.8 2.8 2 3.6-.6 0-1.3-.2-1.8-.5v.1c0 2.2 1.5 4 3.5 4.4-.4.1-.9.2-1.3.2-.3 0-.6 0-.9-.1.6 1.8 2.4 3.1 4.5 3.1A8.3 8.3 0 012 19.1c1.7 1 3.7 1.6 5.9 1.6 7.1 0 11-6 11-11.2v-.5c.8-.6 1.4-1.2 1.9-2z"/>
//                 </svg>
//               </a>

//               {/* YouTube */}
//               <a
//                 href="#"
//                 aria-label="YouTube"
//                 className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
//               >
//                 <svg className="w-4 h-4 text-[#ff8a00]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
//                   <path d="M23 7.1s-.2-1.7-.8-2.4c-.8-.8-1.7-.8-2.1-.9C16.4 3.5 12 3.5 12 3.5h-.1s-4.4 0-7.9.3C3 3.9 2 3.9 1.2 4.8.6 5.5.4 7.1.4 7.1S.2 9 .2 10.9v.2c0 1.9.2 3.8.2 3.8s.2 1.7.8 2.4c.6.7 1.3.7 1.7.8 1.3.1 5.4.3 8.4.3s6.9-.2 8.4-.3c.4 0 1.2 0 1.7-.8.6-.7.8-2.4.8-2.4s.2-1.9.2-3.8v-.2c0-1.9-.2-3.8-.2-3.8zM9.8 15.1V8.9l6 3.1-6 3.1z"/>
//                 </svg>
//               </a>

//               {/* Pinterest */}
//               <a
//                 href="#"
//                 aria-label="Pinterest"
//                 className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
//               >
//                 <svg className="w-4 h-4 text-[#ff8a00]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
//                   <path d="M12 2.2A9.8 9.8 0 1021.8 12 9.8 9.8 0 0012 2.2zm.2 14.4c-.6 2.5-2.3 4.4-4.4 4.4-1.6 0-2.5-1.1-2.1-2.4.4-1.4 1.6-4 1.6-4s-.3-.7-.3-1.8c0-1.6.9-2.8 2.1-2.8 1 0 1.5.7 1.5 1.6 0 1-.6 2.6-.9 4-.2.9.4 1.7 1.2 1.7 1.4 0 2.4-1.8 2.4-4.3 0-1.8-1.2-3.1-3.4-3.1-2.4 0-3.9 1.8-3.9 3.8 0 1 .4 1.7 1.1 2 .2.1.2.3.1.6-.1.6-.4 1.9-.5 2.3-.1.4-.3.6-.7.4-2.6-1.1-3.7-4.1-3.7-6.6 0-4.7 3.8-8.5 8.6-8.5s8.5 3.8 8.5 8.5c0 4.7-2.9 7.6-6.7 7.6-.9 0-1.8-.5-2.2-1.2z" />
//                 </svg>
//               </a>
//             </div>
//           </div>

//           {/* QUICK LINKS */}
//           <div>
//             <h3 className="text-white font-semibold text-xl mb-6">Quick Links</h3>
//             <ul className="space-y-4">
//               {quickLinks.map((link) => (
//                 <li key={link.label} className="flex items-center gap-3 text-gray-300">
//                   <svg className="w-4 h-4 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                     <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//                   </svg>
//                   <Link to={link.to} className="text-sm hover:underline">{link.label}</Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* DEPARTMENT */}
//           <div>
//             <h3 className="text-white font-semibold text-xl mb-6">Department</h3>
//             <ul className="space-y-4">
//               {departments.map((d) => (
//                 <li key={d} className="flex items-center gap-3 text-gray-300">
//                   <svg className="w-4 h-4 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                     <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//                   </svg>
//                   <a href="#" className="text-sm hover:underline">{d}</a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-gray-700 mt-8" />

//         {/* Copyright */}
//         <div className="mt-6 text-center text-gray-300">
//           <p>Copyright ©{new Date().getFullYear()} ayushm.com. All Rights Reserved</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  const quickLinks = [
    { label: "About Us", to: "/about" },
    { label: "Our Pricing", to: "/pricing" },
    { label: "Our Gallery", to: "/gallery" },
    { label: "Appointment", to: "/appointment" },
    { label: "Privacy Policy", to: "/privacy" },
  ];

  const departments = [
    "Orthology",
    "Neurology",
    "Dental Care",
    "Opthalmology",
    "Cardiology",
  ];

  const usefulLinks = [
    { label: "About Us", to: "/about" },
    { label: "Our Pricing", to: "/pricing" },
    { label: "Our Gallery", to: "/gallery" },
    { label: "Appointment", to: "/appointment" },
    { label: "Privacy Policy", to: "/privacy" },
  ];

  return (
    <footer className="bg-[#333333] text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* LEFT — LOGO + ADDRESS + CONTACT + SOCIALS */}
          <div>
            <Link to="/" className="inline-block mb-5">
              <Logo />
            </Link>

            <div className="space-y-2 text-gray-300">
              <p>Sahibabad, Ghaziabad, Uttar Pradesh</p>
              <p>201005</p>
              <p>+91-9555741758</p>
              <p className="text-sm text-gray-400">info@upraj.com</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">

              {/* Facebook */}
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-[#ff8a00]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12H20l-1 3.9h-2.3v7A10 10 0 0022 12z"/>
                </svg>
              </a>

              {/* Twitter */}
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-[#ff8a00]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 5.9c-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.5-1.8-.7.4-1.5.7-2.3.9A4.1 4.1 0 0015.5 5c-2.3 0-4.2 1.9-4.2 4.3 0 .3 0 .6.1.8C7.7 10 4.1 8 1.7 5.1c-.4.7-.6 1.6-.6 2.5 0 1.5.8 2.8 2 3.6-.6 0-1.3-.2-1.8-.5v.1c0 2.2 1.5 4 3.5 4.4-.4.1-.9.2-1.3.2-.3 0-.6 0-.9-.1.6 1.8 2.4 3.1 4.5 3.1A8.3 8.3 0 012 19.1c1.7 1 3.7 1.6 5.9 1.6 7.1 0 11-6 11-11.2v-.5c.8-.6 1.4-1.2 1.9-2z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-[#ff8a00]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 7.1s-.2-1.7-.8-2.4c-.8-.8-1.7-.8-2.1-.9C16.4 3.5 12 3.5 12 3.5h-.1s-4.4 0-7.9.3C3 3.9 2 3.9 1.2 4.8.6 5.5.4 7.1.4 7.1S.2 9 .2 10.9v.2c0 1.9.2 3.8.2 3.8s.2 1.7.8 2.4c.6.7 1.3.7 1.7.8 1.3.1 5.4.3 8.4.3s6.9-.2 8.4-.3c.4 0 1.2 0 1.7-.8.6-.7.8-2.4.8-2.4s.2-1.9.2-3.8v-.2c0-1.9-.2-3.8-.2-3.8zM9.8 15.1V8.9l6 3.1-6 3.1z"/>
                </svg>
              </a>

              {/* Pinterest */}
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-[#ff8a00]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.2A9.8 9.8 0 1021.8 12 9.8 9.8 0 0012 2.2zm.2 14.4c-.6 2.5-2.3 4.4-4.4 4.4-1.6 0-2.5-1.1-2.1-2.4.4-1.4 1.6-4 1.6-4s-.3-.7-.3-1.8c0-1.6.9-2.8 2.1-2.8 1 0 1.5.7 1.5 1.6 0 1-.6 2.6-.9 4-.2.9.4 1.7 1.2 1.7 1.4 0 2.4-1.8 2.4-4.3 0-1.8-1.2-3.1-3.4-3.1-2.4 0-3.9 1.8-3.9 3.8 0 1 .4 1.7 1.1 2 .2.1.2.3.1.6-.1.6-.4 1.9-.5 2.3-.1.4-.3.6-.7.4-2.6-1.1-3.7-4.1-3.7-6.6 0-4.7 3.8-8.5 8.6-8.5s8.5 3.8 8.5 8.5c0 4.7-2.9 7.6-6.7 7.6-.9 0-1.8-.5-2.2-1.2z" />
                </svg>
              </a>

            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white font-semibold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <Link to={item.to} className="text-sm hover:underline">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* DEPARTMENT */}
          <div>
            <h3 className="text-white font-semibold text-xl mb-6">Department</h3>
            <ul className="space-y-4">
              {departments.map((name) => (
                <li key={name} className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm hover:underline cursor-pointer">{name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* USEFUL LINKS */}
          <div>
            <h3 className="text-white font-semibold text-xl mb-6">Useful Links</h3>
            <ul className="space-y-4">
              {usefulLinks.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-gray-300">
                  <svg className="w-4 h-4 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <Link to={item.to} className="text-sm hover:underline">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8" />

        {/* Copyright */}
        <div className="mt-6 text-center text-gray-300">
          <p>Copyright ©{new Date().getFullYear()} ayushm.com. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
