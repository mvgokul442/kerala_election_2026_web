import React, { useCallback, useEffect, useRef, useState } from 'react';
import CandidateCard from '../components/CandidateCard';
import FiltersSidebar from '../components/FiltersSidebar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Candidate } from '../types/Candidate';

interface Filters {
  party?: string;
  constituency?: string;
  name?: string;
}

const CandidateCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 animate-pulse">
    <div className="h-40 sm:h-52 bg-slate-200 dark:bg-slate-700" />
    <div className="p-3 sm:p-6 space-y-3">
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
    </div>
  </div>
);

const CandidateExplorer: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const limit = 9;

  const isInitialSync = useRef(true);
  const activeFetchId = useRef(0);

  const fetchCandidates = useCallback(
    async (pageNum = 1, appliedFilters: Filters = filters) => {
      const fetchId = ++activeFetchId.current;
      try {
        setLoading(true);

        const queryParams = new URLSearchParams({
          page: pageNum.toString(),
          limit: limit.toString(),
        });

        if (appliedFilters.constituency) queryParams.append('constituency', appliedFilters.constituency);
        if (appliedFilters.party) queryParams.append('party', appliedFilters.party);
        if (appliedFilters.name) queryParams.append('name', appliedFilters.name);

        const url = `https://kerala-election-2026.onrender.com/candidates?${queryParams.toString()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (fetchId !== activeFetchId.current) return;

        setCandidates(data.candidates || []);
        setTotalPages(data.totalPages || 1);
        setPage(data.page || pageNum);
      } catch (err) {
        console.error('Error fetching candidates:', err);
        setCandidates([]);
        setTotalPages(1);
      } finally {
        if (fetchId === activeFetchId.current) setLoading(false);
      }
    },
    [filters]
  );

  // Restore state from URL on first load and fetch once
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = parseInt(params.get('page') || '1', 10);
    const newFilters: Filters = {};

    if (params.get('constituency')) newFilters.constituency = params.get('constituency')!;
    if (params.get('party')) newFilters.party = params.get('party')!;
    if (params.get('name')) newFilters.name = params.get('name')!;

    setPage(pageParam);
    setFilters(newFilters);

    fetchCandidates(pageParam, newFilters).finally(() => {
      isInitialSync.current = false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep browser URL in sync whenever page/filters change (skip initial restore)
  useEffect(() => {
    if (isInitialSync.current) return;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filters.constituency) queryParams.append('constituency', filters.constituency);
    if (filters.party) queryParams.append('party', filters.party);
    if (filters.name) queryParams.append('name', filters.name);

    window.history.replaceState(null, '', `?${queryParams.toString()}`);
  }, [page, filters]);

  // Fetch whenever page or filters change (skip initial fetch)
  useEffect(() => {
    if (isInitialSync.current) return;
    fetchCandidates(page, filters);
  }, [page, filters, fetchCandidates]);

  const handlePrev = () => { if (page > 1) setPage((p) => p - 1); };
  const handleNext = () => { if (page < totalPages) setPage((p) => p + 1); };

  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1);
    // effect will fetch and update URL
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-16">
      <div className="flex">
        {/* Desktop Sidebar (fixed on lg and up) */}
        <div className="hidden lg:block lg:w-72 lg:flex-shrink-0">
          <FiltersSidebar onApply={handleApplyFilters} />
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-12 max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between lg:items-end mb-6 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/70 text-blue-800 dark:text-blue-100 text-xs font-bold uppercase tracking-wider rounded-full">
                  2026 Elections
                </span>
                <span className="text-xs text-slate-500">Updated 4 hours ago</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white">
                Candidate Registry
              </h1>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <p className="text-sm text-slate-500 whitespace-nowrap ml-auto md:ml-0">
                Showing page <span className="font-semibold text-slate-900 dark:text-white">{page}</span> of {totalPages}
              </p>
            </div>
          </div>
            {/* Mobile: show filters above list (block on small, hidden on lg) */}
          <div className="block lg:hidden mb-6">
            <FiltersSidebar onApply={handleApplyFilters} />
          </div>

          {/* Candidates Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading
              ? Array.from({ length: limit }).map((_, i) => <CandidateCardSkeleton key={i} />)
              : candidates.map((candidate) => (
                  <CandidateCard key={candidate._id} candidate={candidate} />
                ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button onClick={handlePrev} disabled={page === 1 || loading} className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold disabled:opacity-50">
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Prev
            </button>

            <div className="flex flex-wrap gap-1 justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((num) => num === 1 || num === totalPages || (num >= page - 2 && num <= page + 2))
                .map((num, idx, arr) => {
                  const prev = arr[idx - 1];
                  const showEllipsis = prev && num - prev > 1;
                  return (
                    <React.Fragment key={num}>
                      {showEllipsis && <span className="hidden sm:inline px-2">…</span>}
                      <button onClick={() => setPage(num)} disabled={loading} className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl text-xs sm:text-sm font-semibold ${num === page ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                        {num}
                      </button>
                    </React.Fragment>
                  );
                })}
            </div>

            <button onClick={handleNext} disabled={page === totalPages || loading} className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold disabled:opacity-50">
              Next <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CandidateExplorer;
