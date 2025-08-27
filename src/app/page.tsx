import { getHomeData, getOptionsData } from '@/services/network_requests';
import HomeBanner from '@/components/Banners/HomeBanner';
import FeaturedCategory from '@/components/FeaturedCategory/FeaturedCategory';
import FeaturedPackages from '@/components/FeaturedPackages/FeaturedPackages';

export interface FeaturedCategoryItem {
  id: string | number;
  title: string;
  all_packages: number;
  urlinfo: {
    url_slug: string;
  };
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

export interface HomeData {
  featured_categories?: FeaturedCategoryItem[];
  featured_packages?: FeaturedPackage[];
  [key: string]: any;
}

export interface OptionsData {
  [key: string]: any;
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
        limit={3}
        data={data?.featured_packages || []}
      />
    </main>
  );
}
