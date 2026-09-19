// import AdminLayout from "./AdminLayout";
import UsersTable from "./components/UsersTable";
import SearchInput from "./components/SearchInput";

export default function Users() {
  return (
    
      <section className="flex-1 p-6 lg:p-8 min-w-0">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-4xl font-bold text-[#5b0f0f]">
            Users
          </h1>

          <SearchInput placeholder="Search" />
        </div>

        {/* Table */}
        <UsersTable />
      </section>

  );
}