interface TableProps {
  headers: string[];
  hasBody?: boolean;
  body?: React.ReactElement;
  footer?: React.ReactElement;
}

const Table: React.FC<TableProps> = ({ headers, hasBody, body, footer }) => {
  return (
    <table className="mt-4 border-2 table-auto text-left text-gray-800">
      <thead>
        <tr className="bg-gray-100">
          {headers.map((header, id) => (
            <th key={id} className="p-1 border-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      {hasBody ? (
        body
      ) : (
        <tbody>
          <tr>
            <td colSpan={headers.length} className="p-1 text-center">
              No data
            </td>
          </tr>
        </tbody>
      )}
      {footer}
    </table>
  );
};
export default Table;
