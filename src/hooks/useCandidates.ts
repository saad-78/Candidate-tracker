'use client';

import { useState, useEffect, useCallback } from 'react';
import { Candidate, CandidateFormData } from '@/types';
import { generateId } from '@/lib/utils';

const STORAGE_KEY = 'candidate-tracker-data';

const getInitialCandidates = (): Candidate[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return getSampleCandidates();
  }

  try {
    return JSON.parse(stored);
  } catch {
    return getSampleCandidates();
  }
};

const getSampleCandidates = (): Candidate[] => [
  {
    id: '1',
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    role: 'Frontend Developer',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    fullName: 'Michael Chen',
    email: 'michael.chen@email.com',
    role: 'Backend Developer',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    fullName: 'Emily Davis',
    email: 'emily.davis@email.com',
    role: 'UI/UX Designer',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export function useCandidates() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCandidates(getInitialCandidates());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
    }
  }, [candidates, isLoading]);

  const addCandidate = useCallback((data: CandidateFormData) => {
    const newCandidate: Candidate = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };

    setCandidates((prev) => [newCandidate, ...prev]);
    return newCandidate;
  }, []);

  const removeCandidate = useCallback((id: string) => {
    setCandidates((prev) => prev.filter((candidate) => candidate.id !== id));
  }, []);

  const updateCandidate = useCallback((id: string, data: Partial<CandidateFormData>) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id ? { ...candidate, ...data } : candidate
      )
    );
  }, []);

  return {
    candidates,
    isLoading,
    addCandidate,
    removeCandidate,
    updateCandidate,
  };
}
