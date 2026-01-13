# CandidateTracker - Next.js Candidate Management Application

A modern, elegant candidate management application built with Next.js 16, TypeScript, and Tailwind CSS. This application demonstrates fundamental CRUD operations with a clean, responsive UI and proper form validation.

## Features

- **List Candidates**: View all candidates in a responsive grid layout with search functionality
- **Add Candidates**: Create new candidate profiles with a validated form
- **Delete Candidates**: Remove candidates from the system with confirmation
- **Search**: Filter candidates by name, email, or role
- **Data Persistence**: All data is stored in localStorage for persistence across sessions
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Form Validation**: Client-side validation with clear error messages
- **Loading States**: Smooth loading indicators for better UX
- **Empty States**: Friendly UI when no candidates exist or search returns no results

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Data Persistence**: localStorage

## Project Structure

```
candidate-tracker/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main application page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.tsx      # Button with variants and loading state
│   │   │   ├── Card.tsx        # Card component with variants
│   │   │   ├── Header.tsx      # Application header
│   │   │   ├── Input.tsx       # Form input with validation
│   │   │   ├── Modal.tsx       # Accessible modal dialog
│   │   │   ├── SearchInput.tsx # Search input component
│   │   │   └── Select.tsx      # Select dropdown component
│   │   └── candidates/         # Candidate-specific components
│   │       ├── CandidateCard.tsx   # Individual candidate display
│   │       ├── CandidateForm.tsx   # Add candidate form
│   │       └── CandidateList.tsx   # List container component
│   ├── hooks/
│   │   └── useCandidates.ts    # Custom hook for candidate management
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   └── types/
│       └── index.ts            # TypeScript interfaces and types
├── public/                     # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/candidate-tracker.git
cd candidate-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Usage

### Adding a Candidate

1. Click the "Add Candidate" button in the header
2. Fill in the candidate's full name, email, and select a role
3. Click "Add Candidate" to save
4. The new candidate will appear in the list immediately

### Searching Candidates

Use the search bar at the top of the page to filter candidates by:
- Name
- Email
- Role

### Deleting a Candidate

1. Hover over a candidate card
2. Click the trash icon that appears
3. Confirm the deletion in the dialog

## API Reference

### Types

```typescript
type CandidateRole = 
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Fullstack Developer'
  | 'UI/UX Designer'
  | 'Product Manager'
  | 'DevOps Engineer'
  | 'Data Scientist';

interface Candidate {
  id: string;
  fullName: string;
  email: string;
  role: CandidateRole;
  createdAt: string;
}
```

### Custom Hook: useCandidates

```typescript
const { candidates, isLoading, addCandidate, removeCandidate, updateCandidate } = useCandidates();
```

- `candidates`: Array of candidate objects
- `isLoading`: Boolean indicating if data is loading
- `addCandidate(data)`: Add a new candidate
- `removeCandidate(id)`: Delete a candidate by ID
- `updateCandidate(id, data)`: Update a candidate's information

## Validation

The form includes the following validation rules:

- **Full Name**: Required, minimum 2 characters
- **Email**: Required, must be a valid email format
- **Role**: Required, must select a role
  
## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Vercel](https://vercel.com/) - Deployment platform
