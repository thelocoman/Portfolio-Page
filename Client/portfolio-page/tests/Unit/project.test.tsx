// tests/unit/project.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Projects from '../../components/sections/projects/projects';

// Mock static project data module
vi.mock('../../app/projectstructure', () => ({
  projectsData: [
    {
      id: 0,
      title: 'Personal Finance Tool',
      description: 'A personal development financial tool, that helps users to set goals, plan financial transactions, collaborate all in one comprehensive and intuitive space',
      tech: ['HTML', 'CSS', 'JS', 'AWS', 'Express', 'NodeJS', 'PostgreSQL'],
      liveUrl: 'https://www.billionairelife.online/?v=0.0.2',
      repoUrl: null,
      imagesrc: 'BillionaireLife.png',
    },
  ],
}));

describe('Projects Component', () => {
  it('renders section title, project card, and description accurately', () => {
    render(<Projects />);
    
    // Assert section heading presence
    expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument();
    
    // Assert project title exists in DOM
    expect(screen.getByText('Personal Finance Tool')).toBeInTheDocument();

    // Assert description text renders correctly
    expect(
      screen.getByText(/comprehensive and intuitive space/i)
    ).toBeInTheDocument();
  });
});