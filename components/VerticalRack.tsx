'use client';

import { InventoryData } from '@/types';
import RackCell from './RackCell';

interface VerticalRackProps {
  rackId: string;
  inventoryData: InventoryData[];
  selectedRack: string | null;
  searchResults: Set<string>;
  onRackClick: (rackId: string) => void;
}

export default function VerticalRack({ rackId, inventoryData, selectedRack, searchResults, onRackClick }: VerticalRackProps) {
  const getCellData = (row: number) => {
    const location = `${rackId}-1`;
    const item = inventoryData.find((data) => data.location.startsWith(`${rackId}-1-`));
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
    <div className="flex flex-col gap-1">
      <div className="text-center font-bold text-gray-800">{rackId}</div>
      {Array.from({ length: 4 }, (_, i) => {
        const row = i + 1;
        const location = `${rackId}-${row}`;
        const data = getCellData(row);
        const isSelected = selectedRack === rackId;
        const isSearchResult = inventoryData.some((d) => d.location.startsWith(`${rackId}-1-`) && searchResults.has(d.location));

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
  );
}
