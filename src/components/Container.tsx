import React from "react";

/**
 * Reusable Container
 * - Default: centered, responsive horizontal padding
 * - Pass `className` to add/override section-level styles
 * - Optionally pass `maxClass` to change the max-width (e.g. "max-w-4xl", "max-w-6xl", "max-w-7xl")
 */
export default function Container({ children, className = "", maxClass = "max-w-7xl" }) {
  return (
    <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${maxClass} ${className}`}>
      {children}
    </div>
  );
}
