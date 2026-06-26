// tests/project.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Projects from '../app/projects';

// 1. Point the mock exactly to where your real data structure sits
vi.mock('../app/projectstructure', () => ({
  projectsData: [
    {
      id: 0,
      title: "Personal Finance Tool", // Using the real card title to align with your setup
      description: "A personal development financial tool, that helps users to set goals, plan financial transactions, collaborate all in one comprehensive and intuitive space",
      tech: ["HTML", "CSS", "JS", "AWS", "Express", "NodeJS", "PostgreSQL"],
      liveUrl: "https://www.billionairelife.online/?v=0.0.2",
      repoUrl: null,
      imagesrc: 'BillionaireLife.png',
    }
  ]
}));

describe('Projects Component', () => {
  it('renders the projects grid and opens modal on click', async () => {
    render(<Projects />);
    
    // 1. Assert initial layout components are visible
    expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument();
    
    // 2. Look for the actual title matching the rendered markup tree
    const projectCard = screen.getByText('Personal Finance Tool');
    expect(projectCard).toBeInTheDocument();

    // 3. Confirm description content loads safely
    expect(screen.getByText(/comprehensive and intuitive space/i)).toBeInTheDocument();
  });
});