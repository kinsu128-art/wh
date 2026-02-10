'use client';

import { useState } from 'react';
import { LocationData } from '@/types';

interface RackCellProps {
  location: string;
  data: LocationData;
  onClick?: () => void;
  selected?: boolean;
  searchResult?: boolean;
}

export default function RackCell({ location, data, onClick, selected, searchResult }: RackCellProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getBgStyle = () => {
    if (searchResult && data.hasStock && data.color) {
      return { backgroundColor: data.color };
    }
    if (selected) {
      return { backgroundColor: 'rgb(191, 219, 254)' };
    }
    if (isHovered) {
      return { backgroundColor: 'rgb(229, 231, 235)' };
    }
    return { backgroundColor: 'rgb(243, 244, 246)' };
  };

  const bgStyle = getBgStyle();

  return (
    <div
      className="
        border border-gray-300 rounded
        flex items-center justify-center
        cursor-pointer transition-all
        min-w-[60px] min-h-[40px]
        hover:shadow-md
      "
      style={bgStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={
        data.hasStock
          ? `${location}\nItem: ${data.itemNo}\nOnhand: ${data.onhand}`
          : `${location}\nEmpty`
      }
    >
      <span className="text-xs font-medium text-gray-700">{location}</span>
    </div>
  );
}
