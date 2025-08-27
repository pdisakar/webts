'use client';
import React, { useState, useRef } from 'react';

interface GroupFaq {
  id?: string | number;
  question: string;
  answer: string;
}

interface TripFaqsProps {
  data: GroupFaq[];
}

const TripFaqs: React.FC<TripFaqsProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const toggle = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-accordion [&>*:nth-child(1)]:pt-0">
      {data.map((faq, index) => {
        const isActive = activeIndex === index;
        const key = faq.id ?? index;

        return (
          <div
            key={key}
            className="accordion-item border-b py-5 border-primary/50 border-dashed">
            <button
              onClick={() => toggle(index)}
              className="w-full font-bold text-lg flex justify-between items-center text-headings text-left"
              aria-expanded={isActive}
              aria-controls={`faq-content-${key}`}>
              <span className="text-left">{faq.question}</span>

              <svg
                className={`icon transition-transform duration-300 ${
                  isActive ? 'rotate-180' : ''
                }`}
                width="13"
                height="7">
                <use
                  xlinkHref="/icons.svg#arrow-down"
                  fill="currentColor"
                />
              </svg>
            </button>

            <div
              id={`faq-content-${key}`}
              ref={el => {
                contentRefs.current[index] = el;
              }}
              style={{
                maxHeight: isActive
                  ? `${contentRefs.current[index]?.scrollHeight || 0}px`
                  : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}
              className="accordion-content text-gray-700 leading-relaxed">
              <article
                className="pt-2"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TripFaqs;
