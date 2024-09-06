import { DataCOA } from "@/app/(main)/(data-master)/chart-of-account/data-coa";
import React from "react";

export default function TableCOA({ data }: any) {
  return (
    <div>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2 w-[300px]">
                Account Name
              </th>
              <th className="border border-gray-300 p-2 w-[100px]">Type</th>
              <th className="border border-gray-300 p-2 w-[200px] text-right">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            <TreeNode node={data} level={0} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface TreeNodeProps {
  node: DataCOA;
  level: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, level }) => {
  return (
    <>
      <tr>
        <td
          className="border border-gray-300 p-2"
          style={{ paddingLeft: level * 20 + 20 }}
        >
          <span className="font-bold mr-2">{node.id}</span>
          {node.name}
        </td>
        <td className="border border-gray-300 p-2">{node.type}</td>
        <td className="border border-gray-300 p-2 text-right">
          {node.balance.toLocaleString("id-ID", {
            style: "decimal",
            minimumFractionDigits: 2,
          })}
        </td>
      </tr>
      {node.children &&
        node.children.map((child: any) => (
          <TreeNode key={child.id} node={child} level={level + 1} />
        ))}
    </>
  );
};
