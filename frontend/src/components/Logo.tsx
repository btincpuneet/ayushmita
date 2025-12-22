import React from "react";

const Logo: React.FC = () => (
  <a href="/" className="flex items-center gap-3">
    <div className="flex items-center gap-2">
      {/* Icon Box */}
      <div className="w-12 h-12 bg-primary/90 rounded-lg flex items-center justify-center">
        <svg
          className="w-7 h-7 text-green"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>

      {/* Text */}
      <div>
        <div className="text-xl font-bold text-primary">AYUSHMI</div>
        <div className="text-xs text-muted-foreground tracking-wide">
          MEDICAL CARE
        </div>
      </div>
    </div>
  </a>
);

export default Logo;
