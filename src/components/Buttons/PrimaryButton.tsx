import React from 'react';
import Link from 'next/link';

interface PrimaryButtonProps {
  href: string;
  label: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ href, label }) => {
  return (
    <button
  type="submit"
  className="flex items-center justify-center w-fit mt-[10px] group"
  aria-label="Subscribe Now"
>
  <span className="py-[14px] px-[26px] bg-primary rounded-full text-white font-bold leading-[1] capitalize border-b-[3px] border-r-[3px] border-[#5C6554]">
    Subscribe Now
  </span>
</button>

  );
};

export default PrimaryButton;
