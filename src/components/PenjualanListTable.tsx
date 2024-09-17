import React from "react";
import Link from "next/link";

type PenjualanListProps = {
  data: any[]; // Ubah sesuai dengan tipe data yang tepat
  columns: { key: string; label: string; format?: (value: any) => string }[];
  emptyMessage?: string;
  linkBaseUrl?: string; // Untuk membuat link dinamis
};

export const PenjualanListTable: React.FC<PenjualanListProps> = ({
  data,
  columns,
  emptyMessage = "No data available",
  linkBaseUrl = "/",
}) => {
  return (
    <div className="overflow-x-auto">
      {data.length === 0 ? (
        <div className="text-center p-4">{emptyMessage}</div>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="border border-gray-300 p-2">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key} className="border border-gray-300 p-2">
                    {column.key === "link" && linkBaseUrl ? (
                      <Link href={`${linkBaseUrl}/${item.id}`}>
                        {item[column.key]}
                      </Link>
                    ) : column.format ? (
                      column.format(item[column.key])
                    ) : (
                      item[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
