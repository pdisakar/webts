import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  title: string;
  slug: string;
}

interface BreadCrumbPackageProps {
  breadcrumb: { [key: string]: BreadcrumbItem[] };
  currentpage: string;
}

const BreadCrumbPackage = ({
  breadcrumb,
  currentpage,
}: BreadCrumbPackageProps) => {
  const breadcrumbItems = breadcrumb[Object.keys(breadcrumb)[0]] || [];

  return (
    <div className="breadcrumb-container">
      <nav aria-label="breadcrumb">
        <ul className="flex items-center text-[13px] font-semibold text-muted [&>li:last-child]:text-primary">
          <li className="flex items-center">
            <Link href="/">Home</Link>
            {(breadcrumbItems.length > 0 || currentpage) && (
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

          {breadcrumbItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center">
              <Link href={`/${item.slug}`}>{item.title}</Link>
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
            </li>
          ))}

          {currentpage && (
            <li className="flex items-center">
              <span aria-current="page">{currentpage}</span>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default BreadCrumbPackage;
