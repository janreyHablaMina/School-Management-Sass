import React from 'react';
import { FilterSelect, listStyles, SearchField } from '@/components/Teacher/shared';

interface StudentsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const StudentsFilters: React.FC<StudentsFiltersProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className={listStyles.filtersPanel}>
      <SearchField
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search students..."
        aria-label="Search students"
      />
      <FilterSelect
        label="Grade Level"
        value="All Grade Levels"
        onChange={() => {}}
        options={['All Grade Levels', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']}
      />
      <FilterSelect
        label="Class"
        value="All Sections"
        onChange={() => {}}
        options={['All Sections', 'Section A', 'Section B']}
      />
      <FilterSelect
        label="Status"
        value="All Status"
        onChange={() => {}}
        options={['All Status', 'Active', 'Inactive']}
      />
      <FilterSelect
        label="Gender"
        value="All Gender"
        onChange={() => {}}
        options={['All Gender', 'Male', 'Female']}
      />

      <button 
        type="button"
        className={searchTerm !== '' ? listStyles.toolBtnActive : listStyles.toolBtn}
        onClick={() => setSearchTerm('')}
      >
        Reset Filters
      </button>
    </div>
  );
};
