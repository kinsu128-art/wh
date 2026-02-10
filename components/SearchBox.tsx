'use client';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  resultCount?: number;
}

export default function SearchBox({ value, onChange, onSearch, resultCount }: SearchBoxProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center p-4 bg-white rounded-lg shadow-md">
      <label htmlFor="item-no-search" className="font-semibold text-gray-700 whitespace-nowrap">
        Item No
      </label>
      <input
        id="item-no-search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="품목 번호를 입력하세요"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onSearch}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
      >
        Find
      </button>
      {resultCount !== undefined && (
        <span className="text-sm text-gray-600 whitespace-nowrap">
          {resultCount > 0 ? `${resultCount}개의 재고를 찾았습니다` : '검색 결과가 없습니다'}
        </span>
      )}
    </div>
  );
}
