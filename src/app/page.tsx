import { getHomeData, getOptionsData } from '@/services/network_requests';
import HomeBanner from '@/components/Banners/HomeBanner';

export default async function Home() {
  const response = await getHomeData();
  const data = response?.data?.data;

  const optionsDataResponse = await getOptionsData();
  const optionsData = optionsDataResponse?.data?.data;

  return (
    <main>
      <HomeBanner optionalData={optionsData} />
    </main>
  );
}
