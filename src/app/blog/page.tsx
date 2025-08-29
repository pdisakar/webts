import React from 'react';
import { getBlogPage } from '@/services/network_requests';
import BlogList from '@/components/BlogList/BlogList';

const IMAGE_URL = process.env.IMAGE_URL || '';
const BASE_URL = process.env.BASE_URL || '';

export interface BlogAuthor {
  name?: string;
}

export interface UrlInfo {
  url_slug: string;
}

export interface FeaturedImage {
  full_path: string;
}

export interface Blog {
  id: string | number;
  title: string;
  urlinfo: UrlInfo;
  featured?: FeaturedImage;
  authors?: BlogAuthor[];
  blog_date: string | Date;
  [key: string]: any;
}

export interface PageContentMeta {
  meta_title: string;
  meta_description: string;
}

export interface PageContent {
  meta: PageContentMeta;
  urlinfo: UrlInfo;
  banner?: FeaturedImage;
  [key: string]: any;
}

export interface BlogPageData {
  pagecontent: PageContent;
  listcontent: Blog[];
  [key: string]: any;
}

export async function generateMetadata() {
  const response = await getBlogPage();
  const data: BlogPageData = response.data.data;

  return {
    title: data.pagecontent.meta.meta_title,
    description: data.pagecontent.meta.meta_description,
    alternates: {
      canonical: `${process.env.CANONICAL_BASE}/travel-guide/${data.pagecontent.urlinfo.url_slug}`,
    },
    openGraph: {
      title: data.pagecontent.meta.meta_title,
      description: data.pagecontent.meta.meta_description,
      url: `${BASE_URL}/travel-guide/${data.pagecontent.urlinfo.url_slug}`,
      ...(data.pagecontent.banner && {
        images: [
          {
            url: `${IMAGE_URL}${data.pagecontent.banner.full_path}`,
            width: 1650,
            height: 600,
          },
        ],
      }),
    },
  };
}

const Page: React.FC = async () => {
  const response = await getBlogPage();
  const data: BlogPageData = response.data.data;

  const initialData: Blog[] = data.listcontent;

  return (
    <div className="blog-body">
      <div className="container">
        <div className="title pt-8 text-center">
          <h2>Our Blogs</h2>
        </div>
        <BlogList initialPosts={initialData} />
      </div>
    </div>
  );
};

export default Page;
