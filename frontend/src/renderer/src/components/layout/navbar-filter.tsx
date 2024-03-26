import { useState } from 'react';
import { CiFilter } from 'react-icons/ci';

export type AssetFilters = {
  nameFilter: string;
  contributorFilter: string;
  keywordsFilter: string;
  dateRange: { start: string; end: string };
};

const NavbarFilter = ({ onApply }: { onApply: (filters: AssetFilters) => void }) => {
  // States for filter criteria
  const [nameFilter, setNameFilter] = useState('');
  const [contributorFilter, setContributorFilter] = useState('');
  const [keywordsFilter, setKeywordsFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const applyFilters = () => {
    onApply({ nameFilter, contributorFilter, keywordsFilter, dateRange });
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-outline flex items-center gap-2">
        <CiFilter className="w-6 h-6" />
        Filter
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-4 shadow-lg bg-base-100 rounded-lg w-auto min-w-max mt-2"
      >
        <li className="menu-item mb-2">
          <input
            type="text"
            placeholder="By Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="input input-bordered input-sm w-full focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </li>
        <li className="menu-item mb-2">
          <input
            type="text"
            placeholder="By Contributor"
            value={contributorFilter}
            onChange={(e) => setContributorFilter(e.target.value)}
            className="input input-bordered input-sm w-full focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </li>
        <li className="menu-item mb-2">
          <input
            type="text"
            placeholder="By Keywords"
            value={keywordsFilter}
            onChange={(e) => setKeywordsFilter(e.target.value)}
            className="input input-bordered input-sm w-full focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </li>
        <div className="flex gap-2 mb-2">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            className="input input-bordered w-full focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            className="input input-bordered w-full focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <li>
          <button
            onClick={applyFilters}
            className="btn btn-outline btn-block shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out"
          >
            Apply
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavbarFilter;
