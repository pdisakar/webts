'use client';
import React, { useState, useRef } from 'react';

export interface ItineraryItem {
  id?: string | number;
  itinerary_title?: string | null;
  itinerary_description?: string | null;
  duration?: string | null;
  meals?: string | null;
  accommodation?: string | null;
  origin_elevation?: string | null;
  destination_elevation?: string | null;
}

interface AccordionProps {
  data: ItineraryItem[];
}

const Accordion: React.FC<AccordionProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const toggle = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="accordion [&>*:nth-child(1)]:pt-0">
      {data.map((item, index) => {
        if (!item.itinerary_title || item.itinerary_title === 'null')
          return null;

        const isActive = activeIndex === index;

        return (
          <div
            key={item.id}
            className="accordion-item border-b border-primary/50 border-dashed py-5">
            <button
              onClick={() => toggle(index)}
              className="w-full font-bold text-lg flex justify-between items-center text-headings text-left">
              <span>
                <span className="text-primary mr-2">Day {index + 1}:</span>
                {item.itinerary_title}
              </span>
              <span
                className={`transition-transform duration-300 w-7 h-7 shrink-0 flex items-center justify-center border border-primary/50 rounded-full bg-primary/5 ${
                  isActive ? 'rotate-180' : ''
                }`}>
                <svg
                  className="icon text-headings"
                  width="13"
                  height="7">
                  <use
                    xlinkHref={`/icons.svg#arrow-down`}
                    fill="currentColor"
                  />
                </svg>
              </span>
            </button>

            <div
              ref={el => {
                contentRefs.current[index] = el;
              }}
              style={{
                maxHeight: isActive
                  ? contentRefs.current[index]?.scrollHeight + 'px'
                  : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}
              className="accordion-content">
              {item.itinerary_description &&
                item.itinerary_description !== 'null' && (
                  <article
                    className="pt-2"
                    dangerouslySetInnerHTML={{
                      __html: item.itinerary_description,
                    }}
                  />
                )}

              {((item.duration && item.duration !== 'null') ||
                (item.meals && item.meals !== 'null') ||
                (item.accommodation && item.accommodation !== 'null') ||
                (item.origin_elevation && item.origin_elevation !== 'null') ||
                (item.destination_elevation &&
                  item.destination_elevation !== 'null')) && (
                <div className="quick-info mt-4">
                  <ul className="flex items-center gap-4 flex-wrap px-3 py-2 [&>li]:flex [&>li]:gap-[6px] [&>li>span]:text-primary text-sm bg-primary/5 border border-border rounded-lg">
                    {item.duration && item.duration !== 'null' && (
                      <li>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none">
                          <use
                            xlinkHref="./icons.svg#durations"
                            fill="currentColor"
                          />
                        </svg>
                        Duration: <span>{item.duration}</span>
                      </li>
                    )}

                    {item.origin_elevation &&
                      item.origin_elevation !== 'null' && (
                        <li>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none">
                            <use
                              xlinkHref="./icons.svg#altitude"
                              fill="currentColor"
                            />
                          </svg>
                          Elevation: <span>{item.origin_elevation}m</span>
                        </li>
                      )}

                    {item.meals && item.meals !== 'null' && (
                      <li>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none">
                          <use
                            xlinkHref="./icons.svg#food"
                            fill="currentColor"
                          />
                        </svg>
                        Meal: <span>{item.meals}</span>
                      </li>
                    )}

                    {item.accommodation && item.accommodation !== 'null' && (
                      <li>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none">
                          <use
                            xlinkHref="./icons.svg#accommodation"
                            fill="currentColor"
                          />
                        </svg>
                        Accommodation: <span>{item.accommodation}</span>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
