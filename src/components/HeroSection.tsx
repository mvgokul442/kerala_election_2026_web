import { MoveRight } from "lucide-react";
import React, { useState } from "react";
import { useFiltersStore } from "../store/useFiltersStore";
import { useNavigate } from "react-router-dom"

const HeroSection: React.FC = () => {

  const navigate = useNavigate();

  const constituencies = useFiltersStore((s) => s.constituencies);
  const parties = useFiltersStore((s) => s.parties);

  const [candidateName, setCandidateName] = useState<string>("");
  const [selectedConstituency, setSelectedConstituency] = useState<string>("All");
  const [selectedParty, setSelectedParty] = useState<string>("All");

  const handleRedirect = () => {
    const queryParams = new URLSearchParams({
      page: "1",
      limit: "9",
    });

    if (candidateName.trim() !== "") {
      queryParams.append("name", candidateName);
    }
    if (selectedConstituency && selectedConstituency !== "All") {
      queryParams.append("constituency", selectedConstituency);
    }
    if (selectedParty && selectedParty !== "All") {
      queryParams.append("party", selectedParty);
    }

    // Navigate to /candidates with query string
    navigate(`/candidates?${queryParams.toString()}`);
  };


  return (
    <section className="relative px-6 py-20 max-w-7xl mx-auto overflow-hidden pt-24">
      <div className="flex flex-col md:flex-row items-center gap-16">
        {/* Left side: headline */}
        <div className="flex-1 space-y-8 z-10">
          <div className="inline-flex items-center px-3 py-1 bg-secondary-fixed text-on-secondary-container rounded-full text-xs font-bold uppercase tracking-widest font-label">
            2026 Electoral Cycle
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-primary leading-tight tracking-tighter">
            കേരളത്തിന്റെ  <br /> ഭാവി നിങ്ങളുടെ   <span className="text-secondary italic">വോട്ടിൽ .</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
            Access real-time, verified electoral data for the 2026 cycle. We provide independent insights into candidate backgrounds, funding, and legislative history.
          </p>
        </div>

        {/* Right side: search filters */}
        <div className="flex-1 w-full relative">
          <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/20 shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest font-label text-on-surface-variant">
                  Search Candidate
                </label>
                <input
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  type="text"
                  placeholder="Enter candidate name..."
                  className="w-full pl-4 pr-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary text-on-surface transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <select
                  value={selectedConstituency}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedConstituency(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary text-sm"
                >
                  <option key="All" value="All">
                    All Constituencies
                  </option>
                  {constituencies.map((con) => (
                    <option key={con.value} value={con.value}>
                      {con.label}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedParty}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedParty(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary text-sm"
                >
                  <option key="All" value="All">
                    All Parties
                  </option>
                  {parties.map((party) => (
                    <option key={party.value} value={party.value}>
                      {party.label}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={handleRedirect} className="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                Fetch Results
                <MoveRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

