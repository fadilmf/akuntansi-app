export const SkeletonRowTable = () => {
  return (
    <tr>
      <td className="px-4 py-3">
        <div className="h-4 w-24 bg-gray-300 animate-pulse rounded"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-36 bg-gray-300 animate-pulse rounded"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-20 bg-gray-300 animate-pulse rounded"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-4 w-16 bg-gray-300 animate-pulse rounded"></div>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="h-4 w-20 bg-gray-300 animate-pulse rounded"></div>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="h-4 w-20 bg-gray-300 animate-pulse rounded"></div>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="h-4 w-20 bg-gray-300 animate-pulse rounded"></div>
      </td>
    </tr>
  );
};
