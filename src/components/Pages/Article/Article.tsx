import React from 'react';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';

interface ArticleData {
  page_title: string;
  page_description: string;
  [key: string]: any;
}

interface BreadcrumbItem {
  title: string;
  slug: string;
}

interface breadcrumbData extends Array<Array<BreadcrumbItem>> {}

interface ArticleProps {
  articleData: ArticleData;
  breadcrumb: breadcrumbData;
}

export default function Article({ articleData, breadcrumb }: ArticleProps) {
  return (
    <div className="article-body">
      <div className="pb-0 common-box">
        <div className="container">
          <div className="common-module mb-0">
            <div className=" flex justify-center">
              <BreadCrumb breadcrumb={breadcrumb} />
            </div>
            <div className="title text-center">
              <h1
                dangerouslySetInnerHTML={{
                  __html: articleData.page_title,
                }}
              />
            </div>
          </div>
          <article
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: articleData.page_description,
            }}
          />
        </div>
      </div>
    </div>
  );
}
