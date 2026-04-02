import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useFiltersStore } from '../store/useFiltersStore';

interface Option {
  value: string;
  label: string;
}

const FiltersSidebar: React.FC<{ onApply: (filters: any) => void }> = ({ onApply }) => {
  const constituencies = useFiltersStore((s) => s.constituencies) as Option[];
  const parties = useFiltersStore((s) => s.parties) as Option[];

  const [selectedConstituency, setSelectedConstituency] = useState<Option | null>(null);
  const [selectedParties, setSelectedParties] = useState<Option | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const constituencyParam = params.get('constituency');
    const partyParam = params.get('party');

    if (constituencyParam) {
      const match = constituencies.find((o) => o.value === constituencyParam || o.label === constituencyParam);
      setSelectedConstituency(match ?? { value: constituencyParam, label: constituencyParam });
    }

    if (partyParam) {
      const match = parties.find((o) => o.value === partyParam || o.label === partyParam);
      setSelectedParties(match ?? { value: partyParam, label: partyParam });
    }
  }, [constituencies, parties]);

  const handleApply = () => {
    const filters: any = {};
    if (selectedConstituency && selectedConstituency.value !== 'All') filters.constituency = selectedConstituency.value;
    if (selectedParties && selectedParties.value) filters.party = selectedParties.value;
    onApply(filters);
  };

  const handleClear = () => {
    setSelectedConstituency(null);
    setSelectedParties(null);
    onApply({});
  };

  return (
    // NOTE: responsive classes — normal block on mobile, fixed on lg
    <aside className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 lg:border-t-0 lg:border-r lg:w-72 lg:fixed lg:left-0 lg:top-16 lg:h-[calc(100vh-4rem)] lg:flex lg:flex-col">
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
            Constituency
          </label>
          <Select
            options={constituencies}
            value={selectedConstituency}
            onChange={(option) => setSelectedConstituency(option as Option)}
            placeholder="Select constituency..."
            className="text-sm"
            isClearable
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
            Party
          </label>
          <Select
            options={parties}
            value={selectedParties}
            onChange={(option) => setSelectedParties(option as Option)}
            placeholder="Select party..."
            className="text-sm"
            isClearable
          />
        </div>
      </div>

      <div className="p-6 border-t border-slate-200 dark:border-slate-800 mt-auto">
        <button
          onClick={handleApply}
          className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 transition-all text-white text-xs font-bold uppercase tracking-widest rounded-2xl shadow-lg"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClear}
          className="w-full py-3 mt-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all text-slate-700 dark:text-slate-200 text-xs font-bold uppercase tracking-widest rounded-2xl"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
