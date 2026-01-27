import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 py-8 md:py-8 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
