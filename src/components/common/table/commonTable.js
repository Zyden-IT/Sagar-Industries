"use client";

const CommonTable = ({ columns = [], data = [], compact = false }) => {
  const tableClass = compact ? "w-full" : "w-full min-w-[850px]";
  const headClass = compact
    ? "px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-[1.5px] text-text-secondary"
    : "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[1.5px] text-text-secondary";
  const cellBase = compact ? "px-3 py-2.5" : "px-4 py-3";
  const cellFirst = compact
    ? "text-xs font-semibold text-text-primary"
    : "text-[13px] font-semibold text-text-primary";
  const cellRest = compact ? "text-[11px] text-text-secondary" : "text-text-secondary";

  return (
    <div className="overflow-x-auto">
      <table className={tableClass}>
        <thead>
          <tr className="border-b border-border bg-bg">
            {columns.map((column, index) => (
              <th key={index} className={headClass}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-border transition-all duration-300 last:border-none hover:bg-bg"
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`${cellBase} ${colIndex === 0 ? cellFirst : cellRest}`}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
