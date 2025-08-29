import { getHomeData } from '@/services/network_requests';
import PackageCard from '@/components/Cards/PackageCard/PackageCard';

export interface FeaturedPackage {
  id: number | string;
  package_title: string;
  package_duration: number;
  package_duration_type?: string;
  total_testimonials: number;
  group_default_price: number;
  urlinfo: { url_slug: string };
  featured: { full_path: string };
  destination?: { title: string };
  grade?: { title: string };
  style?: { title: string };
  [key: string]: any;
}

export interface HomeDataResponse {
  featured_packages: FeaturedPackage[];
  [key: string]: any;
}

export async function generateMetadata() {
  return {
    title:
      'Featured Nepal Tours & Trekking Packages | Nepal Adventure Holidays',
    description:
      'Explore our handpicked featured Nepal tours and trekking packages. Adventure, culture, and Himalayas await! Book your unforgettable journey today.',
    alternates: { canonical: `${process.env.CANONICAL_BASE || ''}/` },
    openGraph: {
      title:
        'Featured Nepal Tours & Trekking Packages | Nepal Adventure Holidays',
      description:
        'Explore our handpicked featured Nepal tours and trekking packages. Adventure, culture, and Himalayas await! Book your unforgettable journey today.',
      url: `${process.env.CANONICAL_BASE || ''}/`,
      images: [
        {
          url: `${process.env.IMAGE_URL || ''}/default-home-banner.jpg`,
          width: 1200,
          height: 600,
        },
      ],
    },
    keywords:
      'Nepal tours, trekking in Nepal, Everest Base Camp, Annapurna Circuit, Nepal adventure packages, featured Nepal tours, Himalaya trekking, Nepal travel',
  };
}

const Page = async () => {
  const response = await getHomeData();
  const data: HomeDataResponse = response.data.data;

  return (
    <div className="our-featured-packages bg-secondary/10">
      <div className="common-box">
        <div className="container">
          <div className="title text-center">
            <h2>Our Featured Packages</h2>
            <div className="flex items-center gap-2 mx-auto justify-center text-[15px] text-primary">
              <p>{data.featured_packages.length} Packages</p>
            </div>
          </div>

          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.featured_packages?.map((itm, idx) => (
              <li key={idx}>
                <PackageCard pkg={itm} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
