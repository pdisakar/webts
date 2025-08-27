'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import Link from 'next/link';

interface PackageItem {
  id: string | number;
  title: string;
  slug: string;
}

interface OptionalData {
  package?: PackageItem[];
  [key: string]: any;
}

interface SmartSearchProps {
  optionalData: OptionalData;
  onClose?: () => void; // optional callback when search closes
}

const SmartSearch: React.FC<SmartSearchProps> = ({ optionalData, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<PackageItem[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  // Lock body scroll when search is open
  useEffect(() => {
    if (showSearch) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [showSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const closeSearch = () => {
    setShowSearch(false);
    if (onClose) onClose();
  };

  return (
    <div className="smart-search">
      {/* search icon button */}
      <div
        className="quick-search cursor-pointer"
        onClick={() => setShowSearch(true)}>
        <svg
          className="icon text-navbar"
          width="24"
          height="24">
          <use
            xlinkHref="/icons.svg#search"
            fill="currentColor"
          />
        </svg>
      </div>

      {showSearch && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-start justify-center pt-32"
          onClick={closeSearch}>
          <div
            className="w-full max-w-4xl px-4"
            onClick={e => e.stopPropagation()}>
            <form
              className="flex items-center justify-center"
              onSubmit={e => e.preventDefault()}
              noValidate>
              <div className="form-group w-full max-w-[900px] relative">
                <label
                  htmlFor="smart_search_input"
                  className="sr-only">
                  Location
                </label>
                <input
                  type="text"
                  id="smart_search_input"
                  value={query}
                  onChange={handleChange}
                  className="form-control border border-none bg-page-bg focus:border-primary focus:ring-0 outline-none rounded-l-md w-full px-6 py-3 bg-transparent placeholder:text-muted placeholder:capitalize"
                  placeholder="Find your perfect quiet retreat ?"
                  autoComplete="off"
                />

                {query.trim().length > 2 && (
                  <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2 z-[60] max-h-[300px] overflow-auto border border-border custom-scrollbar">
                    {filtered.length > 0 ? (
                      <ul>
                        {filtered.map(pkg => (
                          <li
                            className="py-3 px-6 border-primary/70 border-dashed border-b last:border-b-0 hover:bg-primary/5 transition-colors"
                            key={pkg.id}
                            onClick={closeSearch}>
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
                        No matching packages found for "{query}".
                      </p>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="bg-primary px-[18px] flex items-center gap-2 rounded-r-md text-white py-3"
                aria-label="Search">
                {loading ? (
                  <div className="spinner-border h-5 w-5 border-t-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <>
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
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSearch;
