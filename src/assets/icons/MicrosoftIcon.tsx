import React from "react";

interface SvgIconProps extends React.SVGProps<SVGSVGElement> {}

export const MicrosoftIcon: React.FC<SvgIconProps> = ({ ...props }) => (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11.4 2H2v9.4h9.4V2z" fill="#F35325" />
    <path d="M22 2h-9.4v9.4H22V2z" fill="#81BC06" />
    <path d="M11.4 12.6H2V22h9.4v-9.4z" fill="#05A6F0" />
    <path d="M22 12.6h-9.4V22H22v-9.4z" fill="#FFBA08" />
  </svg>
);
