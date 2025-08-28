'use client';

import React, { useState, useTransition } from 'react';
import axios from 'axios';
import BlogCard from '../Cards/BlogCard/BlogCard';
import { PRODUCTION_SERVER, SITE_KEY } from '@/lib/constants';

export interface BlogAuthor {
  name?: string;
}

export interface BlogItemType {
  id: string | number;
  title: string;
  summary?: string;
  blog_date: string | Date;
  urlinfo: { url_slug: string };
  featured?: { full_path: string };
  authors?: BlogAuthor[];
  [key: string]: any;
}

interface BlogListProps {
  initialPosts: BlogItemType[];
}

const BlogList: React.FC<BlogListProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<BlogItemType[]>(initialPosts);
  const [isPending, startTransition] = useTransition();
  const [noData, setNoData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = async () => {
    try {
      const response = await axios.get(
        `${PRODUCTION_SERVER}/allblogs?_start=${posts.length}&_limit=6`,
        { headers: { sitekey: SITE_KEY } }
      );

      const newPost: BlogItemType[] = response.data?.data.content || [];

      startTransition(() => {
        setPosts(prevPosts => [...prevPosts, ...newPost]);
      });

      if (newPost.length === 0) {
        setNoData(true);
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    }
  };

  return (
    <div className="container">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((item, idx) => (
          <BlogCard
            blog={item}
            key={idx}
          />
        ))}
      </ul>

      {noData && (
        <p>
          <b>No more posts to show!</b>
        </p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!noData && (
        <button
          onClick={loadMore}
          disabled={isPending}
          aria-label="Load more"
          className={`mt-6 button group flex items-center justify-center gap-[6px] w-fit
            ${isPending ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          `}>
          <span className="py-[11px] px-5 border border-primary/65 bg-primary/10 rounded-full text-primary text-base leading-[1] capitalize">
            {isPending ? 'Loading...' : 'Load More'}
          </span>

          <span
            className={`h-[40px] w-[40px] border border-primary p-1 shrink-0 rounded-full flex items-center justify-center transition-[padding] duration-75 ease-in-out
              group-hover:p-[0px]
            `}>
            <i className="h-full w-full bg-primary rounded-full flex items-center justify-center">
              {!isPending ? (
                <svg
                  className="icon text-white group-hover:-rotate-45 group-hover:scale-125 transition-transform duration-200"
                  width="11"
                  height="9"
                  fill="currentColor">
                  <use xlinkHref="/icons.svg#arrow" />
                </svg>
              ) : (
                <svg
                  className="animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="20"
                  height="20">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
            </i>
          </span>
        </button>
      )}
    </div>
  );
};

export default BlogList;
