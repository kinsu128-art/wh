import { RackConfig } from '@/types';

export const RACK_CONFIGS: RackConfig[] = [
  { id: 'A', type: 'grid', columns: 4, rows: 4 },
  { id: 'B', type: 'grid', columns: 4, rows: 4 },
  { id: 'C', type: 'grid', columns: 4, rows: 4 },
  { id: 'D', type: 'grid', columns: 4, rows: 4 },
  { id: 'E', type: 'grid', columns: 4, rows: 4 },
  { id: 'F', type: 'grid', columns: 4, rows: 4 },
  { id: 'G', type: 'grid', columns: 4, rows: 4 },
  { id: 'H', type: 'grid', columns: 4, rows: 4 },
  { id: 'I', type: 'vertical', columns: 1, rows: 4 },
  { id: 'J', type: 'vertical', columns: 1, rows: 4 },
  { id: 'K', type: 'top', columns: 4, rows: 4 },
  { id: 'L', type: 'top', columns: 4, rows: 4 },
  { id: 'M', type: 'top', columns: 4, rows: 4 },
];

export const getRackLocation = (rackId: string, column: number, row: number): string => {
  return `${rackId}-${column}-${row}`;
};

export const parseLocation = (location: string): { rack: string; column: number; row: number } | null => {
  const match = location.match(/^([A-Z])-(\d+)-(\d+)$/);
  if (!match) return null;
  return {
    rack: match[1],
    column: parseInt(match[2], 10),
    row: parseInt(match[3], 10),
  };
};
