import React from 'react';
import Image from 'next/image';
import cards from '../../../public/CardsWeAccept/cards.png';
import SocialMedia from '@/components/SocialMedia/SocialMedia';
import Affiliations from '@/components/Affiliations/Affiliations';

const Footer = ({ globalData }) => {
  return (
    <div className="footer-body">
      <Affiliations />
      <footer className="footer common-box bg-footer-color">
        <div className="container">
          <div className="top-section flex items-center justify-between gap-6 flex-wrap mb-9">
            <div className="quick-access text-white flex items-center gap-6 flex-wrap">
              <div className="quick-call flex items-center gap-3">
                <svg
                  className="icon text-primary shrink-0"
                  width="50"
                  height="50">
                  <use
                    xlinkHref="/icons.svg#footer-call"
                    fill="currentColor"
                  />
                </svg>
                <div className="quick-call-body">
                  <p className="mb-1 text-xl font-bold">Call us 24/7</p>
                  <a href={`https://wa.me/${globalData?.phone}`}>
                    {globalData?.phone}
                  </a>
                </div>
              </div>
              <SocialMedia globalData={globalData} />
            </div>
            <figure className="card-we-accept w-[292px]">
              <Image
                src={cards}
                alt="Cards We Accept"
                width={292}
                height={32.67}
                className="w-full h-auto"
              />
            </figure>
          </div>

          <div className="main-footer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-11 border-y border-white/25">
            <div className="company-info">
              <h3 className=" text-xl font-bold text-white/90">
                {globalData?.company_name}
              </h3>
              <ul className=" mt-6 [&>li+li]:mt-[18px] font-light text-white/90">
                <li className="company-address flex gap-3">
                  <svg
                    className="icon text-white/90  shrink-0 mt-1"
                    width="22"
                    height="22">
                    <use
                      xlinkHref="/icons.svg#footer-location"
                      fill="currentColor"
                    />
                  </svg>
                  {globalData?.address}
                </li>
                <li className="company-email flex gap-3">
                  <svg
                    className="icon text-white/90  shrink-0 mt-1"
                    width="22"
                    height="22">
                    <use
                      xlinkHref="/icons.svg#footer-mail"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="company-mail-details">
                    <p className="text-sm">Mail Us</p>
                    <a href={`mailto:${globalData?.email}`}>
                      {globalData?.email}
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="footer-navigation">
              {globalData?.footer_menu?.menu?.slice(0, 1).map(section => (
                <div key={section.id}>
                  <h3 className="text-xl font-bold text-white/90 mb-4">
                    {section.item_title}
                  </h3>
                  <ul className="mt-6 columns-2 space-y-[10px] text-[15px] text-white/90 font-light">
                    {section.children?.map(child => (
                      <li key={child.id}>
                        <a
                          href={`/${child.url_segment}`}
                          className=" hover:text-primary transition-colors">
                          {child.item_title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="news-letter md:col-span-3 lg:col-span-1">
              <div className="newsletter-title flex gap-5">
                <svg
                  className="icon text-white/90 shrink-0"
                  width="46"
                  height="50">
                  <use
                    xlinkHref="/icons.svg#footer-mail2"
                    fill="currentColor"
                  />
                </svg>
                <div className="newsletter-text text-white/90">
                  <h3 className="text-xl font-bold">Subscribe Newsletter</h3>
                  <p className="text-sm mt-1 font-light">
                    sign up for new clothing ideas to your inbox every week{' '}
                  </p>
                </div>
              </div>
              <form className="mt-6 w-full">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-white/15 bg-primary/10 text-white/90 placeholder:text-white/90 font-light focus:border-primary focus:outline-none rounded-full px-6 py-[10px] text-[15px] mt-[10px]"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border border-white/15 bg-primary/10 text-white/90 placeholder:text-white/90 font-light focus:border-primary focus:outline-none rounded-full px-6 py-[10px] text-[15px] mt-[10px]"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-[2px] w-fit mt-[10px] group">
                  <p className="py-[11px] px-5 border border-primary/65 bg-primary/10 w-fit rounded-full text-primary text-base leading-[1] capitalize">
                    Subscribe Now
                  </p>
                  <div className="h-[40px] w-[40px] border border-primary rounded-full p-1 shrink-0 group-hover:p-[0px] transition-[padding] duration-75 ease-in-out">
                    <i className="h-full w-full bg-primary rounded-full flex items-center justify-center">
                      <svg
                        className="icon text-white/90 group-hover:-rotate-45 group-hover:scale-125 transition-transform duration-200"
                        width="11"
                        height="9">
                        <use
                          xlinkHref="/icons.svg#arrow"
                          fill="currentColor"
                        />
                      </svg>
                    </i>
                  </div>
                </button>
              </form>
            </div>
          </div>

          <div className="copy-right text-center text-white/90 pt-9 uppercase italic text-sm font-light">
            <p>
              All content on this website, including photographs, is exclusively
              owned by Good Vibe Adventure Pvt. Ltd.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
