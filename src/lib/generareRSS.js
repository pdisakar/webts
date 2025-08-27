import { writeFileSync } from "fs";
import RSS from "rss";
import client from "../services/network";

export default async function getRSS({ data }) {
  const siteURL = process.env.baseUrl;
  const allBlogs = data.data?.content;

  const feed = new RSS({
    title: process.env.companyName,
    description: `"${process.env.companyName} travel news and updates."`,
    site_url: siteURL,
    feed_url: `${siteURL}/feed.xml`,
    language: "en",
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, ${
      process.env.companyName
    }`,
  });

  allBlogs.map((post) => {
    feed.item({
      title: post.title,
      url: `${siteURL}/blog/${post.urlinfo.url_slug}`,
      date: post.blog_date,
      description: post.meta.meta_description,
    });
  });

  writeFileSync("../../public/feed.xml", feed.xml({ indent: true }));
}

export async function getServerSideProps() {
  const res = await client.get("/allblogs");
  const data = await res.data;
  return {
    props: { data },
  };
}
