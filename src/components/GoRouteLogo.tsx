
import React from 'react';

interface GoRouteLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const GoRouteLogo: React.FC<GoRouteLogoProps> = ({ className, ...props }) => {
  return (
    <img 
      src="/lovable-uploads/goroute-logo.png" 
      alt="GoRoute Logo" 
      className={`${className}`} 
      {...props} 
    />
  );
};

export default GoRouteLogo;
