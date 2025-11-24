import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Container from "./Container";

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
      <Container className="py-14">
        {/* 4 equal(ish) columns */}
        <div className="grid gap-12 md:grid-cols-4">
          {/* Col 1 - Logo + address */}
          <div>
            <div className="mb-5">
              <Logo />
            </div>

            <div className="space-y-1 text-gray-300 text-sm leading-relaxed">
              <p>Sahibabad, Ghaziabad, Uttar Pradesh</p>
              <p>201005</p>
              <p>+91-9555741758</p>
              <p className="text-gray-400">info@upraj.com</p>
            </div>

            <div className="flex items-center gap-3 mt-6">
              {/* Social icons here */}
            </div>
          </div>

          {/* Col 2 - Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">
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
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Department */}
          <div>
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
          <div>
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
        <p className="mt-6 text-center text-gray-300 text-sm">
          © {new Date().getFullYear()} ayushm.com. All Rights Reserved
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
