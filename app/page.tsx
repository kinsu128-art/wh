'use client';

import { useState, useEffect } from 'react';
import { InventoryData } from '@/types';
import SearchBox from '@/components/SearchBox';
import WarehouseLayout from '@/components/WarehouseLayout';
import RackDetail from '@/components/RackDetail';
import { loadExcelFromUrl, searchByItemNo } from '@/lib/excelParser';
import { getColorByQuantity } from '@/lib/colorScale';

export default function Home() {
  const [inventoryData, setInventoryData] = useState<InventoryData[]>([]);
  const [selectedRack, setSelectedRack] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<InventoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExcelFromUrl().then((data) => {
      const minOnhand = Math.min(...data.map((d) => d.onhand));
      const maxOnhand = Math.max(...data.map((d) => d.onhand));

      const dataWithColor = data.map((item) => ({
        ...item,
        color: getColorByQuantity(item.onhand, minOnhand, maxOnhand),
      }));

      setInventoryData(dataWithColor);
      setLoading(false);
    });
  }, []);

  const handleSearch = () => {
    const results = searchByItemNo(inventoryData, searchTerm);
    setSearchResults(results);
    setSelectedRack(null);
  };

  const handleRackClick = (rackId: string) => {
    setSelectedRack(rackId);
  };

  const searchResultLocations = new Set(searchResults.map((r) => r.location));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          창고 재고 시각화 시스템
        </h1>

        <SearchBox
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={handleSearch}
          resultCount={searchResults.length}
        />

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">데이터를 로딩 중입니다...</p>
          </div>
        ) : (
          <>
            <WarehouseLayout
              inventoryData={inventoryData}
              selectedRack={selectedRack}
              searchResults={searchResultLocations}
              onRackClick={handleRackClick}
            />

            <RackDetail
              rackId={selectedRack}
              inventoryData={inventoryData}
              searchResults={searchResultLocations}
            />
          </>
        )}
      </div>
    </div>
  );
}
