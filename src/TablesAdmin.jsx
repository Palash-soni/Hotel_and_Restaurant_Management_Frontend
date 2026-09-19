import { useEffect, useState } from "react";
import TablesHeader from "./components/tables/TablesHeader";
import TablesTable from "./components/tables/TablesTable";
import Loader from "./components/Loader";
import apiClient from "./api/apiClient";

export default function TablesAdmin() {
  const [popUpDisplayMode, setPopUpDisplayMode] = useState("hidden");
  const [Table, setTable] = useState([]);
  const [vis, setVis] = useState(true);
  const [tableID, setTableID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async () => {
    try {
      setVis(true);
      await apiClient.post(`createTable?id=${tableID}`, { tableID });
      setPopUpDisplayMode("hidden");
      window.location.href = "/Admin/Table";
    } catch (error) {
      console.error("Error creating table:", error);
      setVis(false);
      setErrorMessage(error.response?.data?.message || "Error creating table.");
      alert(error.response?.data?.message || "Error creating table.");
    }
  };

  useEffect(() => {
    setVis(false);
    apiClient
      .get("allTables")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const maxNum = response.data.reduce((max, item) => {
            const num = parseInt(String(item.tableID).replace(/\D/g, ""), 10);
            return !isNaN(num) && num > max ? num : max;
          }, 0);
          setTableID("T" + (maxNum + 1));
        } else {
          setTableID("T1");
        }
        setTable(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching tables:", error);
      });
  }, []);

  return (
    <main className="w-full px-8 py-6 lg:px-12">
      <TablesHeader
        onAdd={() => {
          setPopUpDisplayMode("flex");
        }}
      />
      <TablesTable tables={Table} />

      <div
        className={`bg-black/50 h-screen w-screen z-10 fixed top-0 right-0 ${popUpDisplayMode} justify-center items-center `}
      >
        <div className="flex flex-col gap-10 h-50 w-120 bg-amber-50 justify-center items-center text-xl rounded-2xl p-6 shadow-xl">
          <div>Are you sure you want to add Table <strong>{tableID}</strong>?</div>
          <div className="flex gap-10">
            <button
              onClick={handleClick}
              className="hover:bg-[#a13828] cursor-pointer bg-[#5b1d14] text-white px-10 py-2 rounded-3xl transition font-medium"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setPopUpDisplayMode("hidden");
              }}
              className="hover:bg-gray-400 cursor-pointer bg-gray-300 text-gray-800 px-10 py-2 rounded-3xl transition font-medium"
            >
              No
            </button>
          </div>
        </div>
      </div>

      <Loader vis={vis} />
    </main>
  );
}
