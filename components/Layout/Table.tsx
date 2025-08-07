// components/ui/Table.tsx
import React from 'react';

interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export function Table<T>({ columns, data, onRowClick }: TableProps<T>) {
  return (
    <div className="overflow-auto border rounded">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 border-b">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="text-left px-4 py-2 font-semibold text-gray-700">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rIdx) => (
            <tr
              key={rIdx}
              className="hover:bg-gray-50 cursor-pointer border-b"
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col, cIdx) => (
                <td key={cIdx} className="px-4 py-2">
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
