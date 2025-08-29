'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export interface Package {
  id: string | number;
  title: string;
  slug: string;
}

export interface OptionalData {
  package?: Package[];
  [key: string]: any;
}

interface HomeSearchProps {
  optionalData: OptionalData;
}

const HomeSearch: React.FC<HomeSearchProps> = ({ optionalData }) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Package[]>([]);

  useEffect(() => {
    setQuery('');
    setFiltered([]);
  }, [optionalData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);

    if (q.trim().length < 3) {
      setFiltered([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const searchableData = optionalData?.package || [];
    const lowerQ = q.trim().toLowerCase();

    const results = searchableData
      .filter(pkg => pkg.title.toLowerCase().includes(lowerQ))
      .slice(0, 10);

    setFiltered(results);
    setLoading(false);
  };

  return (
    <div
      className="trip-search"
      id="trip_search">
      <form
        className="flex items-center justify-center"
        onSubmit={e => e.preventDefault()}
        noValidate>
        <div className="form-group w-full max-w-[900px] relative">
          <label
            htmlFor="trip_search_input"
            className="sr-only">
            Location
          </label>
          <input
            type="text"
            id="trip_search_input"
            value={query}
            onChange={handleChange}
            className="form-control border-none bg-page-bg focus:border-primary focus:ring-0 outline-none rounded-md w-full px-6 py-3 placeholder:text-muted placeholder:capitalize"
            placeholder="Find your perfect quiet retreat ?"
            autoComplete="off"
          />

          {query.trim().length > 2 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 z-10 max-h-[300px] overflow-auto border border-border custom-scrollbar">
              {filtered.length > 0 ? (
                <ul>
                  {filtered.map(pkg => (
                    <li
                      className="py-3 px-6 border-primary/70 border-dashed border-b last:border-b-0 hover:bg-primary/5 transition-colors"
                      key={pkg.id}
                      id={`package-${pkg.id}`}>
                      <Link
                        href={`/${pkg.slug}`}
                        className="block w-full">
                        <h3 className="text-base font-semibold text-headings hover:text-primary">
                          {pkg.title}
                        </h3>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-muted p-4">
                  No matching packages found for &quot;{query}&quot;.
                </p>
              )}
            </div>
          )}
          <button
            type="submit"
            className="bg-primary px-[18px] flex items-center gap-2 rounded-r-md text-white py-3 absolute top-0 right-0"
            aria-label="Search">
            <svg
              className="icon text-white"
              width="20"
              height="20"
              aria-hidden="true">
              <use
                xlinkHref="/icons.svg#search"
                fill="currentColor"
              />
            </svg>
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeSearch;
