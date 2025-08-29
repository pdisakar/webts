import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/services/network_requests';
import PageBanner from '@/components/Banners/PageBanner';
import { format } from 'date-fns';

interface BlogAuthor {
  name?: string;
}

interface BlogContent {
  title: string;
  content: string;
  blog_date: string | Date;
  authors?: BlogAuthor[];
  banner?: { full_path: string };
  urlinfo?: { url_slug: string };
  meta?: {
    meta_title?: string;
    meta_description?: string;
  };
  [key: string]: any;
}

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params) {
  const res = await getBlogBySlug(params.slug);
  if (!res) return notFound();

  const data: { content: BlogContent } | undefined = res.data?.data;
  if (!data) return notFound();

  const meta = data.content?.meta;
  const slug = data.content?.urlinfo?.url_slug;
  const banner = data.content?.banner?.full_path;
  const siteUrl = `${process.env.CANONICAL_BASE}/blog/`;

  return {
    title: meta?.meta_title || null,
    description: meta?.meta_description || null,
    alternates: { canonical: `${process.env.CANONICAL_BASE}/blog/${slug}` },
    openGraph: {
      title: meta?.meta_title,
      description: meta?.meta_description,
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

const Page = async ({ params }: Params) => {
  const response = await getBlogBySlug(params.slug);
  if (!response) return notFound();

  const data: BlogContent | undefined = response.data?.data.content;
  if (!data) return notFound();

  return (
    <div className="blog-page">
      {data.banner && <PageBanner banner={data.banner} />}
      <div className="container">
        <div className="main-container lg:w-4/5 lg:mx-auto">
          <div className="title pt-8">
            <h2>{data.title}</h2>
            <div className="blog-author-details text-sm text-muted flex items-center justify-between py-3 border-y border-border border-dashed mt-2">
              <div className="author flex items-center">
                <div className="w-[32px] h-[32px] border border-primary rounded-full p-[2px] shrink-0 mr-2">
                  <div className="author-img h-full w-full flex items-center justify-center bg-primary/25 text-primary rounded-full text-lg">
                    {data.authors?.[0]?.name?.charAt(0).toUpperCase() || '?'}
                  </div>
                </div>
                Written by {data.authors?.[0]?.name || 'Unknown Author'}
              </div>
              <p className="blog-date mt-2">
                {format(new Date(data.blog_date), 'dd MMM yyyy')}
              </p>
            </div>
          </div>
          <article
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
