import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  title: string;
  slug: string;
}

interface BreadcrumbProps {
  breadcrumb: Array<Array<BreadcrumbItem>>;
}

const BreadCrumb = ({ breadcrumb }: BreadcrumbProps) => {
  const breadcrumbItems = breadcrumb[0] || [];

  return (
    <div className="breadcrumb-container flex justify-center">
      <nav aria-label="breadcrumb">
        <ul className="flex items-center text-[13px] font-semibold text-muted [&>li:last-child]:text-primary">
          {/* ✅ Home link always first */}
          <li className="flex items-center">
            <Link href="/">Home</Link>
            {breadcrumbItems.length > 0 && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                className="text-muted mx-1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <use
                  xlinkHref="./icons.svg#breadcrumb"
                  fill="currentColor"
                />
              </svg>
            )}
          </li>

          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <li
                key={index}
                className="flex items-center">
                {isLast ? (
                  <span aria-current="page">{item.title}</span>
                ) : (
                  <Link href={`/${item.slug}`}>{item.title}</Link>
                )}
                {!isLast && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    className="text-muted mx-1"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <use
                      xlinkHref="./icons.svg#breadcrumb"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default BreadCrumb;
