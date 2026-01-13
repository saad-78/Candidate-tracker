'use client';

import { useState, useCallback } from 'react';
import { useCandidates } from '@/hooks/useCandidates';
import { CandidateForm } from '@/components/candidates/CandidateForm';
import { CandidateList } from '@/components/candidates/CandidateList';
import { Header } from '@/components/ui/Header';
import { SearchInput } from '@/components/ui/SearchInput';
import { Modal } from '@/components/ui/Modal';
import { CandidateFormData } from '@/types';

export default function Home() {
  const { candidates, isLoading, addCandidate, removeCandidate } =
    useCandidates();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleFormSubmit = useCallback(
    (data: CandidateFormData) => {
      addCandidate(data);
      handleCloseModal();
    },
    [addCandidate, handleCloseModal]
  );

  const handleDelete = useCallback(
    (id: string) => {
      if (confirm('Are you sure you want to delete this candidate?')) {
        removeCandidate(id);
      }
    },
    [removeCandidate]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Loading candidates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddClick={handleAddClick} totalCandidates={candidates.length} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, email, or role..."
          />
        </div>

        <CandidateList
          candidates={candidates}
          onDelete={handleDelete}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add New Candidate"
        size="md"
      >
        <CandidateForm
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}
