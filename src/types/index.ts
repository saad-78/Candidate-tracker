export type CandidateRole =
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Fullstack Developer'
  | 'UI/UX Designer'
  | 'Product Manager'
  | 'DevOps Engineer'
  | 'Data Scientist';

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  role: CandidateRole;
  createdAt: string;
}

export type CandidateFormData = Omit<Candidate, 'id' | 'createdAt'>;

export const CANDIDATE_ROLES: CandidateRole[] = [
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'UI/UX Designer',
  'Product Manager',
  'DevOps Engineer',
  'Data Scientist',
];
