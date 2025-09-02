const SITE_KEY = process.env.SITE_KEY;

import HomeBanner from '@/components/Banners/HomeBanner';
import FeaturedCategory from '@/components/FeaturedCategory/FeaturedCategory';
import FeaturedPackages from '@/components/FeaturedPackages/FeaturedPackages';
import AboutUs from '@/components/AboutUs/AboutUs';
import BestSellingPackages from '@/components/BestSellingPackages/BestSellingPackages';
import FeaturedTestimonials from '@/components/FeaturedTestimonials/FeaturedTestimonials';
import FeaturedBlog from '@/components/FeaturedBlog/FeaturedBlog';

const API_BASE =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_SERVER
    : process.env.DEVELOPMENT_SERVER;

export const revalidate = 300;

const BASE_URL = process.env.BASE_URL || '';
const IMAGE_URL = process.env.IMAGE_URL || '';

export async function generateMetadata() {
  try {
    const res = await fetch(`${API_BASE}/homepage`, {
      next: { revalidate: 300, tags: ['home'] },
      headers: SITE_KEY ? { siteKey: SITE_KEY } : undefined,
    });
    const json = await res.json();
    const data = json?.data?.data;

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
            url:
              IMAGE_URL +
              (data?.pagecontent?.carousel?.content?.[0]?.full_path || ''),
            width: 1920,
            height: 700,
          },
        ],
      },
    };
  } catch {
    return {
      title: '',
      description: '',
    };
  }
}

export default async function Home() {
  const [homeRes, optionsRes] = await Promise.all([
    fetch(`${API_BASE}/homepage`, {
      next: { revalidate: 300, tags: ['home'] },
      headers: SITE_KEY ? { siteKey: SITE_KEY } : undefined,
    }),
    fetch(`${API_BASE}/options`, {
      next: { revalidate: 300, tags: ['options'] },
      headers: SITE_KEY ? { siteKey: SITE_KEY } : undefined,
    }),
  ]);

  const homeJson = await homeRes.json();
  const optionsJson = await optionsRes.json();

  const data = homeJson?.data?.data;
  const optionsData = optionsJson?.data?.data;

  return (
    <main>
      <HomeBanner optionalData={optionsData} />
      <FeaturedCategory data={data?.featured_categories} limit={4} />

      <BestSellingPackages data={data?.category_section_a} limit={3} />

      <AboutUs data={data?.pagecontent} />

      <FeaturedPackages data={data?.featured_packages} limit={3} />

      <FeaturedTestimonials limit={3} data={data?.featured_testimonials} />

      <FeaturedBlog limit={3} data={data?.featured_blogs} />
    </main>
  );
}
