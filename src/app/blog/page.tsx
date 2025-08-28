import React from 'react';
import { getBlogPage } from '@/services/network_requests';
import BlogList from '@/components/BlogList/BlogList';

export interface Blog {
  id: string | number;
  title: string;
  urlinfo: { url_slug: string };
  featured?: { full_path: string };
  authors?: { name?: string }[];
  blog_date: string | Date;
  [key: string]: any;
}

export interface BlogPageData {
  listcontent: Blog[];
  [key: string]: any;
}

const Page = async () => {
  const response = await getBlogPage();
  const initialData: Blog[] = response.data.data.listcontent;

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
