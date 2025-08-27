import { getHomeData, getOptionsData } from '@/services/network_requests';
import HomeBanner from '@/components/Banners/HomeBanner';
import FeaturedCategory from '@/components/FeaturedCategory/FeaturedCategory';
import FeaturedPackages from '@/components/FeaturedPackages/FeaturedPackages';
import AboutUs from '@/components/AboutUs/AboutUs';
import BestSellingPackages from '@/components/BestSellingPackages/BestSellingPackages';

const BASE_URL = process.env.BASE_URL;
const IMAGE_URL = process.env.IMAGE_URL;

export interface FeaturedCategoryItem {
  id: string | number;
  title: string;
  all_packages: number;
  urlinfo: { url_slug: string };
  [key: string]: any;
}

export interface FeaturedPackage {
  package_title: string;
  package_duration: number;
  total_testimonials: number;
  group_default_price: number;
  urlinfo: { url_slug: string };
  featured: { full_path: string };
  [key: string]: any;
}

export interface BestSellingCategory {
  packages?: FeaturedPackage[];
  [key: string]: any;
}

export interface HomeData {
  featured_categories?: FeaturedCategoryItem[];
  featured_packages?: FeaturedPackage[];
  category_section_a?: BestSellingCategory;
  pagecontent?: { [key: string]: any };
  [key: string]: any;
}

export interface OptionsData {
  [key: string]: any;
}

export async function generateMetadata() {
  const response = await getHomeData();
  const data: HomeData = response?.data?.data;

  return {
    title: data?.pagecontent?.meta?.meta_title,
    description: data?.pagecontent?.meta?.meta_description,
    alternates: {
      canonical: process.env.CANONICAL_BASE,
    },
    openGraph: {
      title: data?.pagecontent?.meta?.meta_title,
      description: data?.pagecontent?.meta?.meta_description,
      url: BASE_URL,
      images: [
        {
          url: IMAGE_URL + data?.pagecontent?.carousel?.content?.[0]?.full_path,
          width: 1920,
          height: 700,
        },
      ],
    },
  };
}

export default async function Home() {
  const response = await getHomeData();
  const data: HomeData = response?.data?.data;

  const optionsDataResponse = await getOptionsData();
  const optionsData: OptionsData = optionsDataResponse?.data?.data;

  return (
    <main>
      <HomeBanner optionalData={optionsData} />
      <FeaturedCategory
        data={data?.featured_categories || []}
        limit={4}
      />
      <FeaturedPackages
        data={data?.featured_packages || []}
        limit={3}
      />
      <AboutUs data={data?.pagecontent} />
      <BestSellingPackages
        data={data?.category_section_a}
        limit={3}
      />
    </main>
  );
}
