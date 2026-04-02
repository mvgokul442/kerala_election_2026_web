import { create } from 'zustand';

interface Option {
  value: string;
  label: string;
}

interface CandidateCounts {
  total: number;
  countsByStatus: {
    Accepted: number;
    Rejected: number;
    Pending: number;
    [key: string]: number; // allow other statuses
  };
}

interface FiltersState {
  constituencies: Option[];
  parties: Option[];
  setConstituencies: (data: Option[]) => void;
  setParties: (data: Option[]) => void;

  // candidate counts and setter at root level
  candidateCounts: CandidateCounts;
  setCandidateCount: (data: Partial<CandidateCounts>) => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  constituencies: [],
  parties: [],
  setConstituencies: (data) => set({ constituencies: data }),
  setParties: (data) => set({ parties: data }),

  // initialize candidateCounts with zeros
  candidateCounts: {
    total: 0,
    countsByStatus: {
      Accepted: 0,
      Rejected: 0,
      Pending: 0,
    },
  },

  // merge partial updates so you can update only countsByStatus or total
  setCandidateCount: (data) =>
    set((state) => ({
      candidateCounts: {
        total: data.total ?? state.candidateCounts.total,
        countsByStatus: {
          ...state.candidateCounts.countsByStatus,
          ...(data.countsByStatus ?? {}),
        },
      },
    })),
}));
