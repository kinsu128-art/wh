export interface InventoryData {
  location: string;
  itemNo: string;
  onhand: number;
  color?: string;
}

export interface RackConfig {
  id: string;
  type: 'grid' | 'vertical' | 'top';
  columns: number;
  rows: number;
}

export interface LocationData {
  hasStock: boolean;
  itemNo?: string;
  onhand?: number;
  color?: string;
}

export interface SearchResult {
  itemNo: string;
  locations: LocationData[];
  totalOnhand: number;
}
