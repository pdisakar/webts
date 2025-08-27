import React from 'react';
import PackageCard from '../Cards/PackageCard/PackageCard';
import PrimaryButton from '../Buttons/PrimaryButton';

interface FeaturedPackage {
  package_title: string;
  package_duration: number;
  total_testimonials: number;
  group_default_price: number;
  urlinfo: { url_slug: string };
  featured: { full_path: string };
  [key: string]: any;
}

interface FeaturedPackagesProps {
  limit: number;
  data: FeaturedPackage[];
}

const FeaturedPackages: React.FC<FeaturedPackagesProps> = ({ limit, data }) => {
  const currentYear = new Date().getFullYear() % 100;
  const nextYear = (new Date().getFullYear() + 1) % 100;

  return (
    <section className="featured-packages common-box pt-0">
      <div className="container">
        <div className="title">
          <span>
            <svg
              className="icon"
              width="26"
              height="28"
              fill="currentColor">
              <use xlinkHref="/icons.svg#title-top" />
            </svg>
            Made Just For You
          </span>
          <h2 className="text-center mx-auto">
            Featured Holidays {currentYear}/{nextYear}
          </h2>
          <p className="text-center mx-auto">
            Set out on remarkable adventures with our Featured Holidays. From
            serene beach retreats to enriching cultural explorations, every
            destination is handpicked to create your ideal escape.
          </p>
        </div>
        <div className="package-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {data?.slice(0, limit).map((pkg, index) => (
            <PackageCard
              key={index}
              pkg={pkg}
            />
          ))}
        </div>

        <div className="action-btn relative flex justify-center mt-12 after:absolute after:top-1/2 after:left-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:content-[''] after:w-full after:h-[1px] after:bg-dottedline after:-z-10">
          <PrimaryButton
            href="/featured-packages"
            label="View All Packages"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
