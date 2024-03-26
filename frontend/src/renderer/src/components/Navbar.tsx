import React, { useState } from 'react';

// components
import { CiSearch } from 'react-icons/ci';
import { CiFilter } from 'react-icons/ci';
import Filter from './Filter';

const Navbar: React.FC = () => {
  // Function to handle the application of filters
  const handleApplyFilters = (filters) => {
    console.log('Applying filters:', filters);
    // Implement the logic to filter your data based on the filters object
  };

  return (
    <nav className="navbar shadow-md border-black p-7 flex justify-between items-center">
      {/* Logo Placeholder */}
      <div className="logo">
        <a className="btn btn-ghost text-xl">Griddle</a>
      </div>

      {/* Center Group */}
      <div className="flex-grow flex justify-center items-center gap-x-4 ">
        {/* New Asset Button */}
        <button className="btn btn-outline">+ New Asset</button>

        {/* Search Bar */}
        <div className="form-control relative w-1/3">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
          <input
            type="text"
            placeholder="Search assets..."
            className="input input-bordered pl-10 pr-4" // Adjust padding to ensure icon and text do not overlap
          />
        </div>

        {/* Filter Component */}
        <Filter onApply={handleApplyFilters} />
      </div>

      {/* Placeholder for Right-Side Content */}
      <div>{/* Content such as profile menu or additional buttons could go here */}</div>
    </nav>
  );
};

export default Navbar;
