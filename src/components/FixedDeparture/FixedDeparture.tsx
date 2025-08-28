'use client';

import { format, addDays, parseISO } from 'date-fns';
import React, { useState } from 'react';
import Link from 'next/link';

export interface Departure {
  id: number;
  package_id: number;
  departure_date: string;
  departure_cost: number;
  departure_note?: string | null;
  departure_status: string;
}

interface FixedDepartureProps {
  data: Departure[];
  duration?: number | string;
}

const FixedDeparture: React.FC<FixedDepartureProps> = ({ data, duration }) => {
  const monthYears = Array.from(
    new Set(
      data.map(d => {
        const date = parseISO(d.departure_date);
        return `${date.getFullYear()}-${date.getMonth()}`;
      })
    )
  ).sort((a, b) => {
    const [yearA, monthA] = a.split('-').map(Number);
    const [yearB, monthB] = b.split('-').map(Number);
    return yearA - yearB || monthA - monthB; 
  });

  const currentDate = new Date();
  const currentKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
  const [selectedMonthYear, setSelectedMonthYear] = useState(
    monthYears.includes(currentKey) ? currentKey : monthYears[0]
  );

  const filteredDepartures = data
    .filter(d => {
      const date = parseISO(d.departure_date);
      return `${date.getFullYear()}-${date.getMonth()}` === selectedMonthYear;
    })
    .sort(
      (a, b) =>
        new Date(a.departure_date).getTime() -
        new Date(b.departure_date).getTime()
    );

  return (
    <div className="overflow-x-auto w-full">
      <ul className="flex flex-wrap gap-2 mb-4">
        {monthYears.map(key => {
          const [year, month] = key.split('-').map(Number);
          return (
            <li
              key={key}
              className={`cursor-pointer px-3 py-1 rounded text-sm ${
                selectedMonthYear === key
                  ? 'bg-primary text-white'
                  : 'bg-primary/10 text-gray-700'
              }`}
              onClick={() => setSelectedMonthYear(key)}>
              {format(new Date(year, month, 1), 'MMM yyyy')}
            </li>
          );
        })}
      </ul>

      <table className="w-full min-w-[600px] border-collapse [&_tr:nth-child(odd)]:bg-primary/5 [&_td]:px-6 [&_td]:py-3 [&_p]:text-sm [&_p]:pb-1 [&_p]:text-gray-600 [&_p]:font-bold [&_p]:text-headings [&_span]:font-medium [&_td:last-child]:text-right">
        <tbody>
          {filteredDepartures.map(departure => {
            const startDate = new Date(departure.departure_date);
            const finalDate = duration
              ? addDays(startDate, Number(duration) - 1)
              : startDate;

            return (
              <tr key={departure.id}>
                <td>
                  <p>Starting From:</p>
                  <span>{format(startDate, 'do MMM yyyy')}</span>
                </td>
                <td>
                  <p>End At:</p>
                  <span>{format(finalDate, 'do MMM yyyy')}</span>
                </td>
                <td className="capitalize">
                  <p>Status</p>
                  <span>{departure.departure_status}</span>
                </td>
                <td>
                  <Link
                    href="#"
                    className="inline-block px-4 py-[6px] border border-primary/50 bg-primary/10 text-primary rounded-md hover:bg-primary hover:text-white text-center">
                    Book Now
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FixedDeparture;
