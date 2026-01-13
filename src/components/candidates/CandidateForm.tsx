'use client';

import { useState, useCallback } from 'react';
import { CandidateFormData, CANDIDATE_ROLES } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface CandidateFormProps {
  onSubmit: (data: CandidateFormData) => void;
  onCancel: () => void;
  initialData?: Partial<CandidateFormData>;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  role?: string;
}

export function CandidateForm({
  onSubmit,
  onCancel,
  initialData,
}: CandidateFormProps) {
  const [formData, setFormData] = useState<CandidateFormData>({
    fullName: initialData?.fullName || '',
    email: initialData?.email || '',
    role: initialData?.role || ('' as CandidateFormData['role']),
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    onSubmit(formData);
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const roleOptions = CANDIDATE_ROLES.map((role) => ({
    value: role,
    label: role,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Full Name"
        name="fullName"
        placeholder="Enter candidate's full name"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
        autoComplete="name"
        autoFocus
      />

      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="candidate@example.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
      />

      <Select
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        error={errors.role}
        options={roleOptions}
        placeholder="Select a role"
      />

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Add Candidate
        </Button>
      </div>
    </form>
  );
}
