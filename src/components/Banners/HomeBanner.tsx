import React from 'react';
import Image from 'next/image';
import HomeSearch from '../HomeSearch/HomeSearch';

interface HomeBannerProps {
  optionalData: {
    [key: string]: any;
  };
}

const HomeBanner: React.FC<HomeBannerProps> = ({ optionalData }) => {
  return (
    <section className="hero-section px-0 lg:px-6">
      <figure className="image-slot before:aspect-[1856/750] w-full mx-auto">
        <Image
          src="/banner.webp"
          alt="Hero"
          width={1856}
          height={750}
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw,
           (max-width: 1280px) 90vw,
           1856px"
        />
      </figure>

      <div className="home-search bg-secondary rounded-b-[20px] hidden lg:block">
        <div className="container py-6">
          <HomeSearch optionalData={optionalData} />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
