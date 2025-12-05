import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Logo from '../assets/logo.png';

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

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#333333] text-gray-200">
      <div className="max-w-7xl mx-auto px-5 py-14">

        {/* 4 equal(ish) columns */}
        <div className="grid gap-12 md:grid-cols-4">
          {/* Col 1 - Logo + address */}
          <div>
            <div className="mb-5">
              <img
                src={Logo}
                alt="Company Logo"
                className="h-[80px] w-[100px]"  // adjust size as needed
              />
            </div>

            <div className="space-y-1 text-gray-300 text-sm leading-relaxed">
              <p style={{
                fontFamily: 'Roboto',
                fontWeight: 400,          // Regular weight
                fontStyle: 'normal',      // Regular corresponds to normal
                fontSize: '17px',
                lineHeight: '28px',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                // leading-trim: NONE is not standard CSS, so it's ignored
              }}>Sahibabad, Ghaziabad, Uttar Pradesh</p>
              <p style={{
                fontFamily: 'Roboto',
                fontWeight: 400,          // Regular weight
                fontStyle: 'normal',      // Regular corresponds to normal
                fontSize: '17px',
                lineHeight: '28px',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                // leading-trim: NONE is not standard CSS, so it's ignored
              }}>201005</p>
              <p style={{
                fontFamily: 'Roboto',
                fontWeight: 400,          // Regular weight
                fontStyle: 'normal',      // Regular corresponds to normal
                fontSize: '17px',
                lineHeight: '28px',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                // leading-trim: NONE is not standard CSS, so it's ignored
              }}>+91-9555741758</p>
              <p style={{
                fontFamily: 'Roboto',
                fontWeight: 400,          // Regular weight
                fontStyle: 'normal',      // Regular corresponds to normal
                fontSize: '17px',
                lineHeight: '28px',
                letterSpacing: '0%',
                verticalAlign: 'middle',
                // leading-trim: NONE is not standard CSS, so it's ignored
              }} >info@upraj.com</p>
            </div>

            <div className="social-icons">
              <ul className="flex items-center gap-3 mt-6">
                <li className="bg-white p-2 rounded-[25px] h-[35px] w-[35px] flex items-center justify-center">
                  <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.03125 9H5.6875V16H2.5625V9H0V6.125H2.5625V3.90625C2.5625 1.40625 4.0625 0 6.34375 0C7.4375 0 8.59375 0.21875 8.59375 0.21875V2.6875H7.3125C6.0625 2.6875 5.6875 3.4375 5.6875 4.25V6.125H8.46875L8.03125 9Z" fill="#F0A324" />
                  </svg>
                </li>
                <li className="bg-white p-2 rounded-[25px] h-[35px] w-[35px] flex items-center justify-center"><svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.3438 3.21875C14.3438 3.375 14.3438 3.5 14.3438 3.65625C14.3438 8 11.0625 12.9688 5.03125 12.9688C3.15625 12.9688 1.4375 12.4375 0 11.5C0.25 11.5312 0.5 11.5625 0.78125 11.5625C2.3125 11.5625 3.71875 11.0312 4.84375 10.1562C3.40625 10.125 2.1875 9.1875 1.78125 7.875C2 7.90625 2.1875 7.9375 2.40625 7.9375C2.6875 7.9375 3 7.875 3.25 7.8125C1.75 7.5 0.625 6.1875 0.625 4.59375V4.5625C1.0625 4.8125 1.59375 4.9375 2.125 4.96875C1.21875 4.375 0.65625 3.375 0.65625 2.25C0.65625 1.625 0.8125 1.0625 1.09375 0.59375C2.71875 2.5625 5.15625 3.875 7.875 4.03125C7.8125 3.78125 7.78125 3.53125 7.78125 3.28125C7.78125 1.46875 9.25 0 11.0625 0C12 0 12.8438 0.375 13.4688 1.03125C14.1875 0.875 14.9062 0.59375 15.5312 0.21875C15.2812 1 14.7812 1.625 14.0938 2.03125C14.75 1.96875 15.4062 1.78125 15.9688 1.53125C15.5312 2.1875 14.9688 2.75 14.3438 3.21875Z" fill="#F0A324" />
                </svg>
                </li>
                <li className="bg-white p-2 rounded-[25px] h-[35px] w-[35px] flex items-center justify-center"><svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.7188 1.90625C17.0938 3.21875 17.0938 6.03125 17.0938 6.03125C17.0938 6.03125 17.0938 8.8125 16.7188 10.1562C16.5312 10.9062 15.9375 11.4688 15.2188 11.6562C13.875 12 8.5625 12 8.5625 12C8.5625 12 3.21875 12 1.875 11.6562C1.15625 11.4688 0.5625 10.9062 0.375 10.1562C0 8.8125 0 6.03125 0 6.03125C0 6.03125 0 3.21875 0.375 1.90625C0.5625 1.15625 1.15625 0.5625 1.875 0.375C3.21875 0 8.5625 0 8.5625 0C8.5625 0 13.875 0 15.2188 0.375C15.9375 0.5625 16.5312 1.15625 16.7188 1.90625ZM6.8125 8.5625L11.25 6.03125L6.8125 3.5V8.5625Z" fill="#F0A324" />
                </svg>
                </li>
                <li className="bg-white p-2 rounded-[25px] h-[35px] w-[35px] flex items-center justify-center"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 7.75C15.5 12.0312 12.0312 15.5 7.75 15.5C6.9375 15.5 6.15625 15.4062 5.4375 15.1562C5.75 14.6562 6.21875 13.8125 6.40625 13.125C6.5 12.7812 6.875 11.2812 6.875 11.2812C7.125 11.7812 7.875 12.1875 8.65625 12.1875C11 12.1875 12.6875 10.0312 12.6875 7.375C12.6875 4.8125 10.5938 2.875 7.90625 2.875C4.5625 2.875 2.78125 5.125 2.78125 7.5625C2.78125 8.71875 3.375 10.125 4.34375 10.5938C4.5 10.6562 4.59375 10.625 4.625 10.4688C4.625 10.375 4.78125 9.84375 4.84375 9.59375C4.84375 9.53125 4.84375 9.4375 4.78125 9.375C4.46875 9 4.21875 8.28125 4.21875 7.59375C4.21875 5.90625 5.5 4.25 7.71875 4.25C9.59375 4.25 10.9375 5.53125 10.9375 7.40625C10.9375 9.5 9.875 10.9375 8.5 10.9375C7.75 10.9375 7.1875 10.3125 7.34375 9.5625C7.5625 8.625 8 7.625 8 6.96875C8 6.375 7.6875 5.875 7.03125 5.875C6.25 5.875 5.625 6.6875 5.625 7.75C5.625 8.4375 5.84375 8.90625 5.84375 8.90625C5.84375 8.90625 5.09375 12.1562 4.9375 12.75C4.78125 13.4375 4.84375 14.375 4.90625 14.9688C2.03125 13.8438 0 11.0625 0 7.75C0 3.46875 3.46875 0 7.75 0C12.0312 0 15.5 3.46875 15.5 7.75Z" fill="#F0A324" />
                </svg>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 2 - Quick Links */}
          <div className="flex flex-col items-start sm:items-end">
            <h3
              className="text-white mb-6 font-medium text-[20px] leading-[100%] tracking-[0%] align-middle"
              style={{
                fontFamily: 'Poppins',
              }}
            >
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 text-white/90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Link
                    to={item.to}
                    className="text-sm hover:text-white transition"
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,          // Regular weight
                      fontStyle: 'normal',      // Regular corresponds to normal
                      fontSize: '16px',
                      lineHeight: '28px',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                      // leading-trim: NONE is not standard CSS, so it's ignored
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Department */}
          <div className="flex flex-col items-start sm:items-end">
            <h3 className="text-xl font-semibold text-white mb-6">
              Department
            </h3>
            <ul className="space-y-4">
              {departments.map((name) => (
                <li key={name} className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 text-white/90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm hover:text-white transition">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Useful Links */}
          <div className="flex flex-col items-start sm:items-end">
            <h3 className="text-xl font-semibold text-white mb-6">
              Useful Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 text-white/90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Link
                    to={item.to}
                    className="text-sm hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10" />
        <p className="mt-6 text-start sm:text-center text-gray-300 text-sm"
          style={{
            fontFamily: 'Poppins',
            fontWeight: 400,          // Regular weight
            fontStyle: 'normal',      // Regular corresponds to normal
            fontSize: '16px',
            lineHeight: '28px',
            letterSpacing: '0%',
            verticalAlign: 'middle',
            // leading-trim: NONE is not standard CSS, so it's ignored
          }}>
          © {new Date().getFullYear()} ayushm.com. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
