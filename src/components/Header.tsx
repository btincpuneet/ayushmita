// // src/components/Header.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Logo from "./Logo"; // link-agnostic Logo component

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const navItems = [
//     { label: "Find Doctors", to: "/find-doctors" },
//     { label: "Hospitals", to: "/hospitals" },
//     { label: "Medicines", to: "/medicines" },
//     { label: "Surgeries", to: "/surgeries" },
//     { label: "Software for Provider", to: "/software" },
//     { label: "Facilities", to: "/facilities" },
//   ];

//   return (
//     <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         <div className="h-20 flex items-center justify-between">
//           {/* Left: Logo */}
//           <div className="flex items-center">
//             <Link to="/" className="inline-flex items-center gap-3 shrink-0">
//               <Logo />
//             </Link>
//           </div>

//           {/* Center: Nav (absolutely centered to match Figma) */}
//           <nav className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
//             <ul className="flex items-center gap-8">
//               {navItems.map((item) => (
//                 <li key={item.to}>
//                   <Link
//                     to={item.to}
//                     className="text-sm font-medium text-gray-800 hover:text-primary transition-colors"
//                   >
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Right: CTA + Language */}
//           <div className="hidden lg:flex items-center gap-4">
//             <Link
//               to="/quote"
//               className="inline-flex items-center px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold shadow-sm hover:opacity-95 transition"
//               style={{ backgroundColor: "var(--tw-color-primary, #ff8a00)" }}
//             >
//               Get a FREE quote
//             </Link>

//             <button
//               type="button"
//               className="flex items-center gap-2 text-sm font-medium text-gray-800"
//               aria-label="Select language"
//             >
//               <img
//                 src="https://flagcdn.com/w40/us.png"
//                 alt="English"
//                 className="w-5 h-4 object-cover rounded-sm"
//               />
//               ENG
//             </button>
//           </div>

//           {/* Mobile menu button */}
//           <div className="lg:hidden">
//             <button
//               onClick={() => setIsOpen((s) => !s)}
//               aria-expanded={isOpen}
//               aria-label={isOpen ? "Close menu" : "Open menu"}
//               className="p-2 rounded-md inline-flex items-center justify-center text-gray-700 hover:bg-gray-100"
//             >
//               {isOpen ? (
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu content */}
//         {isOpen && (
//           <div className="lg:hidden border-t border-gray-200">
//             <nav className="px-4 py-4 space-y-1">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.to}
//                   to={item.to}
//                   onClick={() => setIsOpen(false)}
//                   className="block px-3 py-2 rounded-md text-gray-800 hover:bg-gray-50 hover:text-primary transition-colors"
//                 >
//                   {item.label}
//                 </Link>
//               ))}

//               <div className="pt-3">
//                 <Link
//                   to="/quote"
//                   onClick={() => setIsOpen(false)}
//                   className="block w-full text-center px-4 py-2 rounded-md bg-primary text-white font-semibold"
//                   style={{ backgroundColor: "var(--tw-color-primary, #ff8a00)" }}
//                 >
//                   Get a FREE quote
//                 </Link>
//               </div>

//               <div className="pt-3 flex items-center gap-3">
//                 <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-6 h-5 object-cover rounded-sm" />
//                 <span className="text-sm font-medium text-gray-800">ENG</span>
//               </div>
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo"; // link-agnostic Logo component

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Find Doctors", to: "/find-doctors" },
    { label: "Hospitals", to: "/hospitals" },
    { label: "Medicines", to: "/medicines" },
    { label: "Surgeries", to: "/surgeries" },
    { label: "Software for Provider", to: "/software" },
    { label: "Facilities", to: "/facilities" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="h-20 flex items-center justify-between">

          {/* Left: Logo. Use flex-none to avoid shrinking on mobile */}
          <div className="flex items-center flex-none">
            <Link to="/" className="inline-flex items-center gap-3 flex-none">
              <Logo />
            </Link>
          </div>

          {/* Center: Nav (absolutely centered on large screens) */}
          <nav className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 pointer-events-auto">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm font-medium text-gray-800 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: CTA + Language */}
          <div className="hidden lg:flex items-center gap-4 flex-none">
            <Link
              to="/quote"
              className="inline-flex items-center px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold shadow-sm hover:opacity-95 transition"
              style={{ backgroundColor: "var(--tw-color-primary, #ff8a00)" }}
            >
              Get a FREE quote
            </Link>

            <button
              type="button"
              className="flex items-center gap-2 text-sm font-medium text-gray-800"
              aria-label="Select language"
            >
              <img
                src="https://flagcdn.com/w40/us.png"
                alt="English"
                className="w-5 h-4 object-cover rounded-sm"
              />
              ENG
            </button>
          </div>

          {/* Mobile menu button (keeps space for logo) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen((s) => !s)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-md inline-flex items-center justify-center text-gray-700 hover:bg-gray-100"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu content */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <nav className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-gray-800 hover:bg-gray-50 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-3">
                <Link
                  to="/quote"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2 rounded-md bg-primary text-white font-semibold"
                  style={{ backgroundColor: "var(--tw-color-primary, #ff8a00)" }}
                >
                  Get a FREE quote
                </Link>
              </div>

              <div className="pt-3 flex items-center gap-3">
                <img src="https://flagcdn.com/w40/us.png" alt="English" className="w-6 h-5 object-cover rounded-sm" />
                <span className="text-sm font-medium text-gray-800">ENG</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
