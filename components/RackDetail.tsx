'use client';

import { InventoryData } from '@/types';
import RackCell from './RackCell';

interface RackDetailProps {
  rackId: string | null;
  inventoryData: InventoryData[];
  searchResults: Set<string>;
}

export default function RackDetail({ rackId, inventoryData, searchResults }: RackDetailProps) {
  if (!rackId) {
    return (
      <div className="mt-6 p-4 bg-gray-50 border border-gray-300 rounded-lg text-center text-gray-500">
        랙을 선택하면 층별 상세 정보를 표시합니다.
      </div>
    );
  }

  const getCellData = (column: number, row: number) => {
    const location = `${rackId}-${column}-${row}`;
    const item = inventoryData.find((data) => data.location === location);
    return {
      hasStock: !!item,
      itemNo: item?.itemNo,
      onhand: item?.onhand,
      color: item?.color,
    };
  };

  const rackInventory = inventoryData.filter((item) => item.location.startsWith(`${rackId}-`));

  return (
    <div className="mt-6 p-4 bg-white border-2 border-gray-400 rounded-lg">
      <div className="text-center font-bold text-lg mb-4 text-gray-800">
        {rackId} Rack - 층별 상세보기
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* 왼쪽: 층별 레이아웃 */}
        <div className="lg:w-2/3">
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 16 }, (_, i) => {
              const col = (i % 4) + 1;
              const row = Math.floor(i / 4) + 1;
              const location = `${rackId}-${col}-${row}`;
              const data = getCellData(col, row);
              const isSearchResult = searchResults.has(location);

              return (
                <RackCell
                  key={location}
                  location={location}
                  data={data}
                  searchResult={isSearchResult}
                />
              );
            })}
          </div>
        </div>

        {/* 오른쪽: 재고 그리드 */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-3">
            <h3 className="font-bold text-sm mb-2 text-gray-700">재고 목록</h3>
            {rackInventory.length === 0 ? (
              <p className="text-sm text-gray-500">재고가 없습니다.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-1 px-2 font-semibold text-gray-700">위치</th>
                      <th className="text-left py-1 px-2 font-semibold text-gray-700">품목</th>
                      <th className="text-right py-1 px-2 font-semibold text-gray-700">수량</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rackInventory.map((item) => (
                      <tr key={item.location} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-1 px-2 text-gray-800">{item.location}</td>
                        <td className="py-1 px-2 text-gray-600">{item.itemNo}</td>
                        <td className="py-1 px-2 text-right font-medium text-gray-800">{item.onhand}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
