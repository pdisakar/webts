import { getHomeData, getOptionsData } from '@/services/network_requests';
import HomeBanner from '@/components/Banners/HomeBanner';
import FeaturedCategory from '@/components/FeaturedCategory/FeaturedCategory';

interface FeaturedCategoryItem {
  id: string | number;
  title: string;
  all_packages: number;
  urlinfo: {
    url_slug: string;
  };
  [key: string]: any;
}

interface HomeData {
  featured_categories?: FeaturedCategoryItem[];
  [key: string]: any;
}

interface OptionsData {
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
    </main>
  );
}
