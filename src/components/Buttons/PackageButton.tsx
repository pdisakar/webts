import React from 'react';
import Link from 'next/link';

const PackageButton = ({ href, label }) => {
  return (
    <Link
      href={href}
      aria-label="View package details"
      className="flex items-center justify-center px-4 py-2 text-sm font-extrabold text-primary bg-primary/10 border border-primary/40 rounded-[4px] gap-2 hover:bg-primary hover:text-white transition-colors duration-300 ease-in-out">
      {label}
      <svg
        className="icon "
        width="11"
        height="14"
        fill="currentColor">
        <use xlinkHref="/icons.svg#package-arrow" />
      </svg>
    </Link>
  );
};

export default PackageButton;
