'use client';

import { InventoryData } from '@/types';
import RackCell from './RackCell';

interface TopRackProps {
  rackId: string;
  inventoryData: InventoryData[];
  selectedRack: string | null;
  searchResults: Set<string>;
  onRackClick: (rackId: string) => void;
}

export default function TopRack({ rackId, inventoryData, selectedRack, searchResults, onRackClick }: TopRackProps) {
  const getCellData = (column: number) => {
    const location = `${rackId}-${column}`;
    const item = inventoryData.find((data) => data.location.startsWith(`${rackId}-${column}-`));
    return {
      hasStock: !!item,
      itemNo: item?.itemNo,
      onhand: item?.onhand,
      color: item?.color,
    };
  };

  const handleClick = () => {
    onRackClick(rackId);
  };

  return (
    <div className="border-2 border-gray-400 rounded-lg p-2">
      <div className="flex gap-1">
        {Array.from({ length: 4 }, (_, i) => {
          const col = i + 1;
          const location = `${rackId}-${col}`;
          const data = getCellData(col);
          const isSelected = selectedRack === rackId;
          const isSearchResult = inventoryData.some((d) => d.location.startsWith(`${rackId}-${col}-`) && searchResults.has(d.location));

          return (
            <RackCell
              key={location}
              location={location}
              data={data}
              onClick={() => handleClick()}
              selected={isSelected}
              searchResult={isSearchResult}
            />
          );
        })}
      </div>
    </div>
  );
}
