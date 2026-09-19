import TableRow from "./TableRow";

export default function TablesTable({ tables }) {
  return (
    <section
      aria-labelledby="table-details-title"
      className="mt-10 rounded-sm bg-[#dfdfdf] px-8 py-6"
    >
      <h2
        id="table-details-title"
        className="mb-4 text-center text-[26px] font-medium text-[#5b1d14]"
      >
        Table Details
      </h2>

      {/* Header bar */}
      <div
        role="row"
        className="grid grid-cols-3 bg-[#4b0d0d] py-3 text-[18px] font-medium text-white"
      >
        <div role="columnheader" className="text-center">
          Table ID
        </div>
        <div role="columnheader" className="text-center">
          Status
        </div>
        <div role="columnheader" className="text-right mr-5">
          Actions
        </div>
      </div>

      {/* Rows */}
      <div role="table" className="mt-6 space-y-6">
        {tables.map((table) => (
          <TableRow key={table.tableID} table={table} />
        ))}
      </div>
    </section>
  );
}