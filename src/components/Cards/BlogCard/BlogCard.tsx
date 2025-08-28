import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

import { IMAGE_URL } from '@/lib/constants';

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

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <li className="lg:[&>.item]:grid lg:[&>.item]:items-center [&>.item>figcaption]:pt-2 lg:[&>.item]:grid-cols-5 lg:[&>.item]:gap-5 lg:[&>.item>figure]:col-span-2 lg:[&>.item>figcaption]:col-span-3 lg:[&>.item>figcaption]:pt-0">
      <div className="item transation-all overflow-hidden group">
        <figure className="card-img h-full rounded-[4px]">
          <Link
            className="image-slot before:aspect-[235/156] min-w-[235px] h-full rounded-[4px]"
            href={`blog/${blog.urlinfo.url_slug}`}
            aria-label={`View image for ${blog.title}`}>
            <Image
              src={IMAGE_URL + blog?.featured?.full_path}
              alt={blog.title}
              width={235}
              height={156}
              className="object-cover rounded-[4px] bg-page-bg hover:scale-110 transition-transform duration-400 ease-in h-full"
              sizes="auto, (max-width: 235px), 235px"
              fetchPriority="high"
            />
          </Link>
        </figure>
        <figcaption className="blog-details">
          <Link
            className="package-title"
            href={`blog/${blog.urlinfo.url_slug}`}
            aria-label={`View details for ${blog.title}`}>
            <h3 className="text-xl text-headings font-black leading-[160%] hover:text-primary hover:underline transition-all duration-150 ease-linear">
              {blog.title}
            </h3>
          </Link>
          <div className="about-blog flex items-center gap-3 mt-4">
            <span className="blog-author capitalize text-primary font-semibold">
              {blog.authors?.[0]?.name || 'Unknown Author'}
            </span>
            <span className="blog-date capitalize font-semibold">
              {format(new Date(blog.blog_date), 'dd MMM yyyy')}
            </span>
          </div>
        </figcaption>
      </div>
    </li>
  );
};

export default BlogCard;
