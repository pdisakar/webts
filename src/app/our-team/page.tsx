import React from 'react';
import { getAllMembers } from '@/services/network_requests';
import Image from 'next/image';
import Link from 'next/link';

const IMAGE_URL = process.env.IMAGE_URL || '';

// --- Interfaces --- //
interface UrlInfo {
  url_slug: string;
}

interface Member {
  id: string | number;
  full_name: string;
  position?: string;
  avatar: {
    full_path: string;
  };
  urlinfo: UrlInfo;
  [key: string]: any;
}

interface Section {
  id: string | number;
  title: string;
  members?: Member[];
}

interface PageContent {
  page_title: string;
  page_description?: string;
}

interface MembersData {
  pagecontent?: PageContent;
  listcontent?: Section[];
  [key: string]: any;
}

// --- Component --- //
const Page = async () => {
  const response = await getAllMembers();
  const data: MembersData = response.data.data;

  return (
    <div className="pb-0 common-box">
      <div className="container">
        {data?.pagecontent?.page_description && (
          <div className="about-section">
            <div className="title text-center">
              <h2
                dangerouslySetInnerHTML={{
                  __html: data.pagecontent.page_title,
                }}
              />
            </div>
            <article
              className="text-center"
              dangerouslySetInnerHTML={{
                __html: data.pagecontent.page_description,
              }}
            />
          </div>
        )}

        {data?.listcontent && (
          <div className="team-member mt-6">
            {data.listcontent.map(
              section =>
                Array.isArray(section.members) && section.members.length > 0 && (
                  <div
                    className="team-category mt-6"
                    key={section.id}>
                    <h3 className="text-center text-headings font-black text-2xl">
                      {section.title}
                    </h3>
                    <ul className="mt-4 flex flex-wrap items-center justify-center gap-6">
                      {section.members.map(member => (
                        <li
                          key={member.id}
                          className="p-2 border border-primary/10 shadow-custom-shadow rounded-md">
                          <Link
                            className="image-slot before:aspect-[469/469] min-w-[250px] max-w-[250px]"
                            href={`our-team/${member.urlinfo.url_slug}`}
                            aria-label={`View profile of ${member.full_name}`}>
                            <Image
                              src={IMAGE_URL + member.avatar.full_path}
                              alt={member.full_name}
                              width={640}
                              height={648}
                              className="object-cover rounded-[4px]"
                              priority
                              sizes="(max-width: 469px) 100vw, (max-width: 469px) 50vw, 469px"
                            />
                          </Link>
                          <div className="about-member text-center px-3 pt-3 pb-4">
                            <h4 className="text-lg font-bold text-headings capitalize">
                              {member.full_name}
                            </h4>
                            <p className="mt-1 text-sm font-semibold text-muted capitalize">
                              {member.position}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
