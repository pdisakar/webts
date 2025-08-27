import Accordion from '@/components/Accordion/Accordion';
import PageBanner from '@/components/Banners/PageBanner';
import TestimonialsCard from '@/components/Cards/TestimonialsCard/TestimonialsCard';
import TripFaqs from '@/components/TripFaqs/TripFaqs';
import TripGallery from '@/components/TripGallery/TripGallery';
import React from 'react';

export interface Destination {
  title: string;
}

export interface Grade {
  title: string;
}

export interface Style {
  title: string;
}

export interface Accommodation {
  title: string;
}

export interface Transportation {
  title: string;
}

export interface Testimonial {
  id: string | number;
  [key: string]: any;
}

export interface CarouselContent {
  [key: string]: any;
}

export interface ItineraryItem {
  id?: string | number;
  itinerary_title?: string | null;
  itinerary_description?: string | null;
  duration?: string | null;
  meals?: string | null;
  accommodation?: string | null;
  origin_elevation?: string | null;
  destination_elevation?: string | null;
  travel_mode?: string | null;
}

export interface Itinerary {
  details: ItineraryItem[];
}

export interface GroupFaq {
  question?: string;
  answer?: string;
  [key: string]: any;
}

export interface Media {
  id: number;
  parent_id: number;
  name: string;
  mime: string;
  extension: string;
  alt_text?: string | null;
  caption?: string;
  description?: string | null;
  size: number;
  directory: string;
  full_name: string;
  full_path: string;
  variations?: any;
  status: number;
  manageable: number;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface BannerItem {
  attachment_type: string;
  media_id: number;
  status: number;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
  media: Media;
}

export interface PackageData {
  banner?: any;
  banners?: BannerItem[];
  package_title: string;
  destination?: Destination;
  package_duration?: number | string;
  package_duration_type?: string;
  grade?: Grade;
  style?: Style;
  accommodation?: Accommodation;
  bestseason?: string;
  package_max_altitude?: number;
  transportation?: Transportation;
  package_group_size?: number;
  package_highlights?: string;
  package_details?: string;
  itinerary?: Itinerary;
  package_cost_includes?: string;
  package_cost_excludes?: string;
  package_trip_info?: string;
  carousel?: { content: CarouselContent[] };
  groupfaqs?: GroupFaq[];
  testimonials?: Testimonial[];
}

export interface PackageProps {
  packageData: PackageData;
}

const Package: React.FC<PackageProps> = ({ packageData }) => {
  console.log(packageData);

  return (
    <main className="package-details">
      {packageData.banner && <PageBanner banner={packageData.banner} />}
      <div className="container">
        <div className="title mt-3">
          <h2
            className="common-module mb-0"
            dangerouslySetInnerHTML={{
              __html: packageData.package_title,
            }}></h2>
        </div>
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="page-left lg:col-span-8">
            <div className="package-quick-info">
              <div className="common-module">
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 [&>li>.item]:border [&>li>.item]:shadow-custom-shadow [&>li>.item]:rounded-lg [&>li>.item]:border-primary/25 [&>li>.item]:py-6 [&>li>.item]:px-1 md:[&>li>.item]:px-6 [&>li>.item]:flex [&>li>.item]:flex-col [&>li>.item]:items-center [&>li>.item>.text]:flex  [&>li>.item>.text]:mt-[10px]  [&>li>.item>.text]:capitalize  [&>li>.item>.text]:gap-[2px] [&>li>.item>.text]:flex-col [&>li>.item>.text]:text-center [&>li>.item>.text>.info-title]:text-base md:[&>li>.item>.text>.info-title]:text-lg [&>li>.item>.text>.info-title]:font-bold [&>li>.item>.text>.info]:text-muted [&>li>.item>.text>.info]:text-sm">
                  {packageData.destination?.title && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="45"
                            height="45"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#country"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <span className="info-title">Destination</span>
                          <span className="info">
                            {packageData.destination.title}
                          </span>
                        </div>
                      </div>
                    </li>
                  )}

                  {packageData.package_duration && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="45"
                            height="45"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#durations"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <span className="info-title">Duration</span>
                          <span className="info">
                            {packageData.package_duration}{' '}
                            {packageData.package_duration_type}
                          </span>
                        </div>
                      </div>
                    </li>
                  )}

                  {packageData.grade?.title && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="45"
                            height="45"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#grade"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <span className="info-title">Trip Difficulty</span>
                          <span className="info">
                            {packageData.grade.title}
                          </span>
                        </div>
                      </div>
                    </li>
                  )}

                  {packageData.style?.title && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="45"
                            height="45"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#activity"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <span className="info-title">Activity</span>
                          <span className="info">
                            {packageData.style.title}
                          </span>
                        </div>
                      </div>
                    </li>
                  )}

                  {packageData.accommodation?.title && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="45"
                            height="45"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#accommodation"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <span className="info-title">Accommodation</span>
                          <span className="info">
                            {packageData.accommodation.title}
                          </span>
                        </div>
                      </div>
                    </li>
                  )}

                  {packageData.bestseason && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="45"
                            height="45"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#bestseason"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <span className="info-title">Best Season</span>
                          <span className="info">{packageData.bestseason}</span>
                        </div>
                      </div>
                    </li>
                  )}

                  {packageData.package_max_altitude && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="45"
                            height="45"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#altitude"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <span className="info-title">Max Elevation</span>
                          <span className="info">
                            {packageData.package_max_altitude}m
                          </span>
                        </div>
                      </div>
                    </li>
                  )}

                  {packageData.transportation?.title && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="45"
                            height="45"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#car"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <span className="info-title">Transportation</span>
                          <span className="info">
                            {packageData.transportation.title}
                          </span>
                        </div>
                      </div>
                    </li>
                  )}

                  {packageData.package_group_size && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="45"
                            height="45"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#group-size"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <span className="info-title">Group Size</span>
                          <span className="info">
                            Min. {packageData.package_group_size} Pax
                          </span>
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {packageData.package_highlights && (
              <div className="highlight">
                <div className="common-module">
                  <div className="title">
                    <h2>Highlights</h2>
                  </div>
                  <article
                    className="highlights [&>ul>li]:relative [&>ul>li]:pl-7 [&>ul>li]:before:h-5 [&>ul>li]:before:w-5 [&>ul>li]:before:top-1 [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:content-[''] [&>ul>li]:before:bg-checkmark [&>ul>li]:before:bg-no-repeat [&>ul>li]:before:bg-cover [&>ul>li>p]:mb-3"
                    dangerouslySetInnerHTML={{
                      __html: packageData.package_highlights,
                    }}
                  />
                </div>
              </div>
            )}

            {packageData.package_details && (
              <div
                className="overview"
                id="overview">
                <div className="common-module">
                  <div className="title">
                    <h2>Overview</h2>
                  </div>
                  <article
                    id="overview"
                    className="overview"
                    dangerouslySetInnerHTML={{
                      __html: packageData.package_details,
                    }}></article>
                </div>
              </div>
            )}

            {packageData.itinerary && (
              <div
                className="package-itinerary"
                id="package-itinerary">
                <div className="common-module">
                  <div className="title">
                    <h2>Detailed Itinerary</h2>
                  </div>
                  <Accordion data={packageData.itinerary.details} />
                </div>
              </div>
            )}

            {packageData.package_cost_includes && (
              <div
                className="cost-include"
                id="cost-include">
                <div className="common-module">
                  <div className="title">
                    <h2>Cost Included</h2>
                  </div>
                  <article
                    className="[&_ul]:mb-3 [&_ul>li]:mt-1.5 [&_ul>li]:leading-[170%] [&_ul>li]:relative [&_ul>li]:pl-7 [&_ul>li]:before:h-5 [&_ul>li]:before:w-5 [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-1 [&_ul>li]:before:content-[''] [&_ul>li]:before:bg-correct [&_ul>li]:before:bg-no-repeat [&_ul>li]:before:bg-cover"
                    dangerouslySetInnerHTML={{
                      __html: packageData.package_cost_includes,
                    }}
                  />
                </div>
              </div>
            )}

            {packageData.package_cost_excludes && (
              <div
                className="cost-exclude"
                id="cost-exclude">
                <div className="common-module">
                  <div className="title">
                    <h2>Cost Excluded</h2>
                  </div>
                  <article
                    className="[&_ul]:mb-3 [&_ul>li]:mt-1.5 [&_ul>li]:leading-[170%] [&_ul>li]:relative [&_ul>li]:pl-7 [&_ul>li]:before:h-5 [&_ul>li]:before:w-5 [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-1 [&_ul>li]:before:content-[''] [&_ul>li]:before:bg-incorrect [&_ul>li]:before:bg-no-repeat [&_ul>li]:before:bg-cover"
                    dangerouslySetInnerHTML={{
                      __html: packageData.package_cost_excludes,
                    }}
                  />
                </div>
              </div>
            )}

            {packageData.package_trip_info && (
              <div
                className="good-to-know"
                id="good-to-know">
                <div className="common-module p-6 bg-primary/[0.05] relative z-10 after:-z-10 after:absolute after:bg-[length:32px_auto] after:bg-pattern after:opacity-100 after:inset-0 after:bottom-[100px]">
                  <div className="title">
                    <h2>Good to Know Before</h2>
                  </div>
                  <article
                    className=""
                    dangerouslySetInnerHTML={{
                      __html: packageData.package_trip_info,
                    }}
                  />
                </div>
              </div>
            )}

            {packageData.banners && (
              <div
                className="trip-gallery"
                id="trip-gallery">
                <div className="common-module">
                  <div className="title">
                    <h2>Trip Gallery</h2>
                  </div>
                  <TripGallery data={packageData.banners} />
                </div>
              </div>
            )}

            {packageData.groupfaqs && (
              <div
                className="trip-faqs"
                id="package-faqs">
                <div className="common-module">
                  <div className="title">
                    <h2>Trip FAQs</h2>
                  </div>
                  <TripFaqs
                    data={packageData.groupfaqs.map((faq, index) => ({
                      id: index,
                      question: faq.question || '',
                      answer: faq.answer || '',
                    }))}
                  />
                </div>
              </div>
            )}

            {packageData.testimonials && (
              <div
                className="trip-testimonials"
                id="testimonials">
                <div className="common-module">
                  <div className="title">
                    <h2>Traveller Review</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {packageData.testimonials.slice(0, 2).map(testimonial => (
                      <TestimonialsCard
                        key={testimonial.id}
                        testimonial={testimonial}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Package;
