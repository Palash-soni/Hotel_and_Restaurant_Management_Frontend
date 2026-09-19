// layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
// import Topbar from "./components/Topbar";

function AdminLayout() {
  return(
  <>
  <div className="flex bg-[#f3f3f3] min-h-screen">
    

    <Sidebar />
    
 <Outlet />
 </div>
   
  </>);
}

export default AdminLayout;

// import Sidebar from "./components/Sidebar";
// import Topbar from "./components/Topbar";

// export default function AdminLayout({ children }) {
//   return (
//     <div className="flex bg-[#f3f3f3] min-h-screen">
//       <Sidebar />

//       <main className="flex-1 p-6 md:p-10">
//         <Topbar />
//         {children}
//       </main>
//     </div>
//   );
// }
