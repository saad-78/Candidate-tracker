'use client';

import { Candidate } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { Mail, Calendar, Briefcase, Trash2 } from 'lucide-react';

interface CandidateCardProps {
  candidate: Candidate;
  onDelete: (id: string) => void;
}

const roleColors: Record<string, string> = {
  'Frontend Developer': 'bg-blue-100 text-blue-700',
  'Backend Developer': 'bg-green-100 text-green-700',
  'Fullstack Developer': 'bg-purple-100 text-purple-700',
  'UI/UX Designer': 'bg-pink-100 text-pink-700',
  'Product Manager': 'bg-orange-100 text-orange-700',
  'DevOps Engineer': 'bg-cyan-100 text-cyan-700',
  'Data Scientist': 'bg-yellow-100 text-yellow-700',
};

export function CandidateCard({ candidate, onDelete }: CandidateCardProps) {
  const roleClass = roleColors[candidate.role] || 'bg-gray-100 text-gray-700';

  return (
    <Card
      variant="elevated"
      className="group relative hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
              {candidate.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {candidate.fullName}
              </h3>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleClass}`}
              >
                {candidate.role}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <a
                href={`mailto:${candidate.email}`}
                className="hover:text-indigo-600 transition-colors"
              >
                {candidate.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span>Applied for {candidate.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Added on {formatDate(candidate.createdAt)}</span>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(candidate.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600 hover:bg-red-50"
          aria-label={`Delete ${candidate.fullName}`}
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
}
