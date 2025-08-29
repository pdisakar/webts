import { notFound } from 'next/navigation';
import { getArticle } from '@/services/network_requests';
import Package from '@/components/Pages/Package/Package';
import Category from '@/components/Pages/Category/Category';
import Article from '@/components/Pages/Article/Article';

import type { Metadata } from 'next';

const siteUrl = `${process.env.CANONICAL_BASE}/`;

interface PageParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = params;
  const articleResponse = await getArticle(slug);
  const data = articleResponse?.data?.data;

  if (!data) {
    notFound(); 
  }

  const meta = data.content?.meta;
  const banner = data.content?.banner?.full_path;

  return {
    title: meta?.meta_title || 'Untitled',
    description: meta?.meta_description || '',
    alternates: {
      canonical: `${process.env.CANONICAL_BASE}/${slug}`,
    },
    openGraph: {
      title: meta?.meta_title || 'Untitled',
      description: meta?.meta_description || '',
      url: `${siteUrl}${slug}`,
      ...(banner && {
        images: [
          {
            url: `${process.env.IMAGE_URL}${banner}`,
            width: 1200,
            height: 600,
          },
        ],
      }),
    },
  };
}

export default async function Slug({ params }: PageParams) {
  const { slug } = params;

  let data;
  try {
    const articleResponse = await getArticle(slug);
    data = articleResponse?.data?.data;

    if (!data) {
      notFound();
    }
  } catch (error) {
    notFound();
  }

  switch (data.page_type) {
    case 'category':
      return <Category categoryData={data.content} />;
    case 'package':
      return <Package packageData={data.content} />;
    case 'article':
      return <Article articleData={data.content} />;
    default:
      notFound();
  }
}

