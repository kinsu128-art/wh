import * as XLSX from 'xlsx';
import { InventoryData } from '@/types';

export const parseExcelFile = async (file: File): Promise<InventoryData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet) as any[];

        const inventoryData: InventoryData[] = jsonData.map((row) => ({
          location: String(row['Location'] || row['location'] || ''),
          itemNo: String(row['item no'] || row['itemNo'] || row['Item No'] || ''),
          onhand: Number(row['onhand'] || row['Onhand'] || row['OnHand'] || 0),
        }));

        resolve(inventoryData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsBinaryString(file);
  });
};

export const loadExcelFromUrl = async (): Promise<InventoryData[]> => {
  try {
    const response = await fetch('/onhand.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet) as any[];

    const inventoryData: InventoryData[] = jsonData.map((row) => ({
      location: String(row['Location'] || row['location'] || ''),
      itemNo: String(row['item no'] || row['itemNo'] || row['Item No'] || ''),
      onhand: Number(row['onhand'] || row['Onhand'] || row['OnHand'] || 0),
    }));

    return inventoryData;
  } catch (error) {
    console.error('Failed to load Excel file:', error);
    return [];
  }
};

export const searchByItemNo = (data: InventoryData[], itemNo: string): InventoryData[] => {
  if (!itemNo.trim()) return [];
  const searchTerm = itemNo.trim().toLowerCase();
  return data.filter((item) => item.itemNo.toLowerCase().includes(searchTerm));
};
