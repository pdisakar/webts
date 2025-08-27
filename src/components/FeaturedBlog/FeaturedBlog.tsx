import React from 'react';
import BlogCard from '../Cards/BlogCard/BlogCard';
import PrimaryButton from '../Buttons/PrimaryButton';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

const IMAGE_URL = process.env.IMAGE_URL || '';

interface BlogAuthor {
  name?: string;
}

interface Blog {
  id: string | number;
  title: string;
  urlinfo: { url_slug: string };
  featured?: { full_path: string };
  authors?: BlogAuthor[];
  blog_date: string | Date;
  [key: string]: any;
}

interface FeaturedBlogProps {
  limit: number;
  data?: Blog[];
}

const FeaturedBlog: React.FC<FeaturedBlogProps> = ({ limit, data }) => {
  if (!data || data.length === 0) return null;

  const [firstBlog, ...remainingBlogs] = data.slice(0, limit);

  return (
    <div className="featured-blog common-box bg-secondary/20">
      <div className="container">
        <ul className="grid grid-cols-1 [&>li]:grid-cols-1 gap-6 lg:grid-cols-2 lg:grid-rows-3 lg:gap-6  lg:[&>li:first-child]:row-span-3 lg:[&>li:first-child]:col-start-1 lg:[&>li:not(:first-child)]:col-start-2">
          <li className="blog-card">
            <div className="title">
              <span className=" !justify-start">
                <svg
                  className="icon"
                  width="26"
                  height="28"
                  fill="currentColor">
                  <use xlinkHref="/icons.svg#title-top" />
                </svg>
                Information for you
              </span>
              <h2>Featured Holidays 25/26 </h2>
            </div>
            <div className="main-card relative group">
              <figure className="card-img w-full">
                <Link
                  className="image-slot rounded-lg before:aspect-[628/417] w-full"
                  href={`blog/${firstBlog.urlinfo.url_slug}`}
                  aria-label={`View image for ${firstBlog.title}`}>
                  <Image
                    src={IMAGE_URL + firstBlog?.featured?.full_path}
                    alt={firstBlog.title}
                    width={628}
                    height={417}
                    className="object-cover bg-page-bg rounded-lg w-full h-full group-hover:scale-110 transition-transform duration-400 ease-in"
                    sizes="auto, (max-width: 628px), 628px"
                    fetchPriority="high"
                  />
                </Link>
              </figure>
              <figcaption className="absolute bottom-0 left-0 w-full z-10 p-6 bg-gradient-to-t from-black/80 to-transparent text-page-bg rounded-b-lg">
                <Link
                  className="package-title text-2xl font-bold group-hover:underline transition-all duration-150 leading-[160%]"
                  href={`blog/${firstBlog.urlinfo.url_slug}`}
                  aria-label={`View details for ${firstBlog.title}`}>
                  <h3 className="">{firstBlog.title}</h3>
                </Link>

                <div className="about-blog flex items-center gap-3 mt-[10px]">
                  <span className="blog-author capitalize font-semibold">
                    {firstBlog.authors?.[0]?.name || 'Unknown Author'}
                  </span>
                  <span className="blog-date capitalize font-semibold">
                    {format(new Date(firstBlog.blog_date), 'dd MMM yyyy')}
                  </span>
                </div>
              </figcaption>
            </div>
          </li>
          {remainingBlogs.map(blog => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}
          <li>
            <PrimaryButton
              href="/blog"
              label="View All Blogs"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FeaturedBlog;
