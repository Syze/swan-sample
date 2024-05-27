import React from "react";
export function camelCaseToWords(s) {
  const result = s.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
const CustomTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {data?.map(
          (item) =>
            item.value && (
              <tr key={item.id}>
                <td>{camelCaseToWords(item.name)}</td>
                <td>
                  <div className="trim">{item.value}</div>
                </td>
              </tr>
            )
        )}
      </tbody>
    </table>
  );
};

export default CustomTable;
