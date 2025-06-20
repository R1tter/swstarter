import { render, screen } from '@testing-library/react';
import ResultsList from '@/components/ResultsList';
import type { ResultItem } from '@/hooks/useSearch';

const mockResults: ResultItem[] = [
  {
    uid: '1',
    url: '/api/people/1',
    name: 'Luke Skywalker',
    properties: { name: 'Luke Skywalker' },
  },
  {
    uid: '2',
    url: '/api/films/2',
    name: 'The Empire Strikes Back',
    properties: { name: 'The Empire Strikes Back' },
  },
];

describe('ResultsList', () => {
  it('renders loading state', () => {
    render(<ResultsList results={[]} isLoading />);
    expect(screen.getByText(/Searching/i)).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<ResultsList results={[]} isLoading={false} />);
    expect(screen.getByText(/No results/i)).toBeInTheDocument();
  });

  it('renders results with correct links and names', () => {
    render(<ResultsList results={mockResults} isLoading={false} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
    expect(screen.getAllByText('VIEW DETAILS')).toHaveLength(2);
    expect(screen.getByText('Luke Skywalker').closest('li')?.querySelector('a')).toHaveAttribute('href', '/people/1');
    expect(screen.getByText('The Empire Strikes Back').closest('li')?.querySelector('a')).toHaveAttribute('href', '/movies/2');
  });
});
