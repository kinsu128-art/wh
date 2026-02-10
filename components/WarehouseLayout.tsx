'use client';

import { InventoryData } from '@/types';
import RackBlock from './RackBlock';
import VerticalRack from './VerticalRack';
import TopRack from './TopRack';

interface WarehouseLayoutProps {
  inventoryData: InventoryData[];
  selectedRack: string | null;
  searchResults: Set<string>;
  onRackClick: (rackId: string) => void;
}

export default function WarehouseLayout({ inventoryData, selectedRack, searchResults, onRackClick }: WarehouseLayoutProps) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Main Warehouse Layout</h2>

      <div className="flex flex-col items-center gap-4">
        {/* Top Row: K, L, M */}
        <div className="flex gap-4 flex-wrap justify-center">
          <TopRack
            rackId="K"
            inventoryData={inventoryData}
            selectedRack={selectedRack}
            searchResults={searchResults}
            onRackClick={onRackClick}
          />
          <TopRack
            rackId="L"
            inventoryData={inventoryData}
            selectedRack={selectedRack}
            searchResults={searchResults}
            onRackClick={onRackClick}
          />
          <TopRack
            rackId="M"
            inventoryData={inventoryData}
            selectedRack={selectedRack}
            searchResults={searchResults}
            onRackClick={onRackClick}
          />
        </div>

        {/* Main Area: I | A-D | E-H | J */}
        <div className="flex items-center gap-4">
          <div className="mr-10">
            <VerticalRack
              rackId="I"
              inventoryData={inventoryData}
              selectedRack={selectedRack}
              searchResults={searchResults}
              onRackClick={onRackClick}
            />
          </div>

          <div className="flex flex-col gap-2">
            <RackBlock
              rackId="A"
              inventoryData={inventoryData}
              selectedRack={selectedRack}
              searchResults={searchResults}
              onRackClick={onRackClick}
            />
            <RackBlock
              rackId="B"
              inventoryData={inventoryData}
              selectedRack={selectedRack}
              searchResults={searchResults}
              onRackClick={onRackClick}
            />
            <RackBlock
              rackId="C"
              inventoryData={inventoryData}
              selectedRack={selectedRack}
              searchResults={searchResults}
              onRackClick={onRackClick}
            />
            <RackBlock
              rackId="D"
              inventoryData={inventoryData}
              selectedRack={selectedRack}
              searchResults={searchResults}
              onRackClick={onRackClick}
            />
          </div>

          <div className="flex flex-col gap-2">
            <RackBlock
              rackId="E"
              inventoryData={inventoryData}
              selectedRack={selectedRack}
              searchResults={searchResults}
              onRackClick={onRackClick}
            />
            <RackBlock
              rackId="F"
              inventoryData={inventoryData}
              selectedRack={selectedRack}
              searchResults={searchResults}
              onRackClick={onRackClick}
            />
            <RackBlock
              rackId="G"
              inventoryData={inventoryData}
              selectedRack={selectedRack}
              searchResults={searchResults}
              onRackClick={onRackClick}
            />
            <RackBlock
              rackId="H"
              inventoryData={inventoryData}
              selectedRack={selectedRack}
              searchResults={searchResults}
              onRackClick={onRackClick}
            />
          </div>

          <div className="ml-10">
            <VerticalRack
              rackId="J"
              inventoryData={inventoryData}
              selectedRack={selectedRack}
              searchResults={searchResults}
              onRackClick={onRackClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
