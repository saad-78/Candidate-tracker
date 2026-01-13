'use client';

import { Candidate } from '@/types';
import { CandidateCard } from './CandidateCard';
import { Search, Users } from 'lucide-react';

interface CandidateListProps {
  candidates: Candidate[];
  onDelete: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CandidateList({
  candidates,
  onDelete,
  searchQuery,
  onSearchChange,
}: CandidateListProps) {
  const filteredCandidates = candidates.filter((candidate) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      candidate.fullName.toLowerCase().includes(searchLower) ||
      candidate.email.toLowerCase().includes(searchLower) ||
      candidate.role.toLowerCase().includes(searchLower)
    );
  });

  if (candidates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Users className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No candidates yet
        </h3>
        <p className="text-gray-500 max-w-sm">
          Get started by adding your first candidate. Click the &quot;Add
          Candidate&quot; button above.
        </p>
      </div>
    );
  }

  if (filteredCandidates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Search className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No results found
        </h3>
        <p className="text-gray-500 max-w-sm">
          No candidates match &quot;{searchQuery}&quot;. Try a different search
          term.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCandidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
