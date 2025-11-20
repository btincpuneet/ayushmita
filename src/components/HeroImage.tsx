import React from "react";
import hero from "../assets/hero-medical.jpg";

const HeroImage: React.FC = () => {
  return (
    <section
      aria-label="Medical And Health - Hero"
      className="relative w-full h-screen overflow-hidden "
    >
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={hero}
          alt="Professional healthcare provider"
          loading="eager"
          className="block w-full h-full object-cover object-right-top"
        />

        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />

        {/* Decorative wave top-left */}
        <svg
          className="absolute left-0 top-0 w-72 h-72 -translate-x-14 -translate-y-14 opacity-25"
          viewBox="0 0 600 600"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <g transform="translate(300,300)">
            <path
              d="M120,-150C160,-120,190,-80,197,-35C205,10,191,60,158,96C125,131,73,153,24,152C-25,151,-50,128,-92,113C-134,98,-193,90,-217,60C-241,30,-230,-21,-207,-55C-183,-88,-147,-104,-109,-128C-71,-151,-35,-182,5,-192C45,-203,90,-193,120,-150Z"
              fill="#2563EB"
            />
          </g>
        </svg>
      </div>

      {/* Foreground text */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            
            {/* Left Content */}
            <div className="py-16 md:py-24">
              <p className="text-[#F6A800] text-base font-semibold mb-4 tracking-wide">
                Medical And Health
              </p>

              <h1 className="font-extrabold text-[clamp(2.5rem,6vw,4.6rem)] leading-tight text-gray-900 tracking-tight">
                A professional <br />
                and friendly care <br />
                provider.
              </h1>

              <p className="mt-6 text-gray-600 max-w-xl text-lg">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>

              <div className="mt-8 flex gap-4 flex-wrap">
                {/* Primary Button */}
                <a
                  href="#"
                  className="inline-flex items-center px-7 py-3 rounded-full bg-[#F6A800] text-black font-semibold text-base shadow-md hover:brightness-90 transition-all"
                >
                  Get a FREE quote
                  <svg
                    className="ml-3 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right side empty (image visible) */}
            <div className="hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroImage;
