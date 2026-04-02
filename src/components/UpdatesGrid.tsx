import { ExternalLink } from "lucide-react";
import React from "react";
import { useFiltersStore } from "../store/useFiltersStore";

const UpdatesGrid: React.FC = () => {

  const candidateStats = useFiltersStore((s) => s.candidateCounts);

  console.log(candidateStats)

  return (
    <section className="bg-surface-container-low py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest font-label text-secondary">
              Verified Archives
            </span>
            <h2 className="text-4xl font-headline font-extrabold text-primary tracking-tight">
              Latest Updates
            </h2>
          </div>
          <a
            href="#"
            className="text-sm font-bold text-secondary flex items-center gap-1 hover:underline"
          >
            View Audit Logs
            <ExternalLink />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          {/* Main Feature */}
          <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden group shadow-sm flex flex-col justify-end">
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center px-2 py-1 bg-secondary-fixed text-on-secondary-container rounded text-[10px] font-bold uppercase tracking-widest">
                Breaking
              </div>
              <h3 className="text-3xl font-headline font-bold text-primary">
                State Assembly Financial Reports Released
              </h3>
              <p className="text-on-surface-variant max-w-md">
                247 new candidate expense filings have been verified and added to the public ledger for District 04.
              </p>
              <span className="text-xs font-bold text-outline uppercase tracking-widest">
                Scraped 2m ago
              </span>
            </div>
          </div>

          {/* Metrics Panel */}
          <div className="md:col-span-4 bg-primary text-white rounded-xl p-8 flex flex-col justify-between shadow-sm">
            <h3 className="text-2xl font-headline font-bold">Real-time Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-sm">Total Candidates</span>
                <span className="text-2xl font-headline font-bold">{candidateStats.total || 0} </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-sm">Accepted Candidates</span>
                <span className="text-2xl font-headline font-bold">{candidateStats?.countsByStatus?.Accepted || 0} </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-sm">Rejected Candidates</span>
                <span className="text-2xl font-headline font-bold">{candidateStats?.countsByStatus?.Rejected || 0} </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-sm">Pending Candidates</span>
                <span className="text-2xl font-headline font-bold">{candidateStats?.countsByStatus?.Pending || 0} </span>
              </div>
            </div>
          </div>

          {/* Smaller Cards */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-6 shadow-sm">
            <h4 className="font-headline font-bold text-primary">New Redistricting Map Drafts</h4>
            <p className="text-xs text-on-surface-variant mt-2">
              Visualizing the proposed changes for the 2026 Western Sector.
            </p>
          </div>

          <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-6 shadow-sm">
            <h4 className="font-headline font-bold text-primary">Campaign Finance Bill #402</h4>
            <p className="text-xs text-on-surface-variant mt-2">
              New disclosure requirements passed for primary candidates.
            </p>
          </div>

          <div className="md:col-span-4 bg-secondary text-white rounded-xl p-6 shadow-sm">
            <h4 className="font-headline font-bold text-lg">Public Data Access Portal Now Online</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatesGrid;
