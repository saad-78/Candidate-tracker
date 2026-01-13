'use client';

import { Users, Plus } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  onAddClick: () => void;
  totalCandidates: number;
}

export function Header({ onAddClick, totalCandidates }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                CandidateTracker
              </h1>
              <p className="text-xs text-gray-500">
                {totalCandidates} candidate{totalCandidates !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <Button onClick={onAddClick} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Candidate
          </Button>
        </div>
      </div>
    </header>
  );
}
