// tests/unit/project.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Projects from '../../components/sections/projects/projects';

describe('Projects Component', () => {
  it('renders section title, project card, and description accurately', () => {
    render(<Projects />);
    
    // Assert section heading presence
    expect(screen.getByRole('heading', { name: /Personal Portfolio/i })).toBeInTheDocument();
    
    // Assert project domain exists in DOM
    expect(screen.getByText('www.tiborlovasz.com')).toBeInTheDocument();

    // Assert description text matches the actual first project in your dataset
    expect(
      screen.getByText(/This website serves as a living index/i)
    ).toBeInTheDocument();
  });
});