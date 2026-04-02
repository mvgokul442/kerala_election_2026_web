import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import UpdatesGrid from "./components/UpdatesGrid";
import NewsletterSection from "./components/NewsLetterSection";
import Footer from "./components/Footer";
// import CandidateList from "./components/CandidateList";

import "./index.css";
// import Layout from "./components/Layout";
import CandidateExplorer from "./components/CandidateExplorer";

import { useEffect } from 'react';
import { useFiltersStore } from './store/useFiltersStore';
import { getCandidateCount, getConstituncy, getParties } from './actions/actions';

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const setConstituencies = useFiltersStore((s) => s.setConstituencies);
  const setParties = useFiltersStore((s) => s.setParties);
  const setCandidateCount = useFiltersStore((s) => s.setCandidateCount)

  useEffect(() => {
    getConstituncy().then((data) =>
      setConstituencies(data.map((c: any) => ({ value: c.constituency, label: c.constituency })))
    );

    getParties().then((data) =>
      setParties(data.map((p: any) => ({ value: p.party, label: p.party })))
    );

    getCandidateCount().then((data) => {
      setCandidateCount(data)
    })
  }, []);

  return <>{children}</>;
};


const Home: React.FC = () => (
  <>
    <HeroSection />
    <UpdatesGrid />
    <NewsletterSection />
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <FiltersProvider>
      <Router>
        <div className="bg-background font-body text-on-surface min-h-screen ">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/candidates" element={<CandidateExplorer />} />
          </Routes>
        </div>
      </Router>
    </FiltersProvider>
  );
};

export default App;
