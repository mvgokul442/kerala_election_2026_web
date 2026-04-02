import React from 'react';
import { Verified } from 'lucide-react';

interface Candidate {
    name: string;
    party: string;
    state: string;
    constituency: string;
    status: string;
    image?: string;
    profileLink?: string;
}

const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate }) => {
    const fallbackImage =
        'https://via.placeholder.com/300x200.png?text=No+Image'; // placeholder

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors duration-300">
            {/* Image Section */}
            <div className="relative h-40 sm:h-52 overflow-hidden">
                <img
                    src={candidate.image || fallbackImage}
                    alt={candidate.name}
                    className="w-full h-full object-contain bg-slate-100"
                />
            </div>

            {/* Content */}
            <div className="p-3 sm:p-6">
                <div className="flex justify-between items-start mb-4 sm:mb-5">
                    <div>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-1 break-words">
                            {candidate.name}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-400 break-words">
                            {candidate.party}
                        </p>
                    </div>

                    {candidate.status === 'Verified' && (
                        <Verified className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-500" strokeWidth={3} />
                    )}
                </div>

                {/* Details */}
                <div className="pt-4 sm:pt-5 border-t border-slate-100 dark:border-slate-700 space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center flex-wrap gap-1">
                        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Constituency
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 break-words">
                            {candidate.constituency}
                        </span>
                    </div>

                    <div className="flex justify-between items-center flex-wrap gap-1">
                        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            Status
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 break-words">
                            {candidate.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CandidateCard;
