import React from 'react';

interface ArticleData {
  page_title: string;
  page_description: string;
  [key: string]: any;
}

interface ArticleProps {
  articleData: ArticleData;
}

export default function Article({ articleData }: ArticleProps) {
  return (
    <div className="article-body">
      <div className="pb-0 common-box">
        <div className="container">
          <div className="title text-center">
            <h2
              dangerouslySetInnerHTML={{
                __html: articleData.page_title,
              }}
            />
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
