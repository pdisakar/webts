import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  title: string;
  slug: string;
}

interface BreadcrumbProps {
  breadcrumb: BreadcrumbItem[][];
}

const BreadCrumb = ({ breadcrumb }: BreadcrumbProps) => {
  if (!breadcrumb || !breadcrumb[0] || breadcrumb[0].length === 0) return null;

  const breadcrumbItems = breadcrumb[0];
  const lastItem = breadcrumbItems[breadcrumbItems.length - 1];

  return (
    <div className="breadcrumb-container">
      <nav aria-label="breadcrumb">
        <ul className="flex items-center text-[13px] font-semibold text-muted [&>li:last-child]:text-primary">
          <li className="flex items-center">
            <Link href="/">Home</Link>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              className="text-muted mx-1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <use xlinkHref="./icons.svg#breadcrumb" fill="currentColor" />
            </svg>
          </li>

          <li className="flex items-center">
            <span aria-current="page">{lastItem.title}</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BreadCrumb;
