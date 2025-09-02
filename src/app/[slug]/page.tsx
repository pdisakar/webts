import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Package from '@/components/Pages/Package/Package';
import Category from '@/components/Pages/Category/Category';
import Article from '@/components/Pages/Article/Article';

const API_BASE =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_SERVER
    : process.env.DEVELOPMENT_SERVER;
const SITE_KEY = process.env.SITE_KEY;

export const revalidate = 300;

const CANONICAL_BASE = process.env.CANONICAL_BASE || '';
const IMAGE_URL = process.env.IMAGE_URL || '';

interface PageParams {
  params: { slug: string };
}

async function fetchArticle(slug: string) {
  const res = await fetch(`${API_BASE}/content/${slug}`, {
    next: { revalidate: 300, tags: ['article', `content:${slug}`] },
    headers: SITE_KEY ? { siteKey: SITE_KEY } : undefined,
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch article: ${res.status}`);
  }

  const json = await res.json();
  return json?.data?.data ?? null;
}

export async function generateMetadata(
  { params }: PageParams
): Promise<Metadata> {
  const { slug } = params;

  const data = await fetchArticle(slug);
  if (!data) return notFound();

  const meta = data.content?.meta;
  const banner = data.content?.banner?.full_path;

  return {
    title: meta?.meta_title || 'Untitled',
    description: meta?.meta_description || '',
    alternates: {
      canonical: `${CANONICAL_BASE}/${slug}`,
    },
    openGraph: {
      title: meta?.meta_title || 'Untitled',
      description: meta?.meta_description || '',
      url: `${CANONICAL_BASE}/${slug}`,
      ...(banner && {
        images: [
          {
            url: `${IMAGE_URL}${banner}`,
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

  const data = await fetchArticle(slug);
  if (!data) notFound();

  switch (data.page_type) {
    case 'category':
      return (
        <Category
          categoryData={data.content}
          breadcrumb={data.breadcrumbs}
        />
      );
    case 'package':
      return (
        <Package
          packageData={data.content}
          breadcrumb={data.breadcrumbs}
        />
      );
    case 'article':
      return (
        <Article
          articleData={data.content}
          breadcrumb={data.breadcrumbs}
        />
      );
    default:
      notFound();
  }
}
