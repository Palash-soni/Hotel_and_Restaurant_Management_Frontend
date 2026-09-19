import React from "react";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rooms from "./Rooms";
import Restaurant from "./Restaurant";
import Contact from "./Contact";
import About from "./About";
import Gallery from "./Gallery";
import ScrollToTop from "./components/ScrollToTop";
import SignUp from "./SignUp";
import Login from "./Login";
import MainLayout from "./MainLayout";
import Dashboard from "./Dashboard";
import AdminLayout from "./AdminLayout";
import Users from "./Users";
import Staff from "./Staff";
import Menu from "./Menu";
import RoomsAdmin from "./RoomsAdmin";
import TablesAdmin from "./TablesAdmin";
import BookingsAdmin from "./BookingsAdmin";
import ReviewsAdmin from "./ReviewsAdmin";
import Receptionist from "./Receptionist";
import ReceptionistLayout from "./ReceptionistLayout";
import NewRoomBooking from "./NewRoomBooking";
import AssignWaiters from "./AssignWaiters";
import WaiterLayout from "./WaiterLayout";
import WaiterHome from "./WaiterHome";
import WaiterTakeOrder from "./WaiterTakeOrder";
import WaiterOrders from "./WaiterOrders";
import AddStaff from "./components/AddStaff";
import UnAuthorized from "./UnAuthorized";
import AdminRoute from "./AdminRoute";
import ReceptionistRoute from "./ReceptionistRoute";
import WaiterRoute from "./WaiterRoute";
import AddRoom from "./components/rooms/AddRoom";
import BillView from "./BillView";
import BillAndPaymentRoute from "./BillAndPaymentRoute";
import OrderSuccessReceipt from "./OrderSuccessReceipt";
import NewTableBooking from "./components/receptionist/NewTableBooking";
import AddMenuItem from "./components/menuAdmin/AddMenuItem";
import ReceptionistBookingsRoom from "./ReceptionistBookingsRoom";
import ReceptionistBookingsTable from "./ReceptionistBookingsTable";
import ReceptionistPreviousRoomBoookings from "./ReceptionistPreviousRoomBoookings";
import MyBookings from "./components/Customer/MyBookings";
import CustomerRoute from "./CustomerRoute";

const App = () => {
  return (
    <div className="font-sans min-h-screen bg-white">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Rooms" element={<Rooms />} />
            <Route path="/Restaurant" element={<Restaurant />} />
            <Route path="/Menu" element={<Restaurant />} />
            <Route path="/Gallery" element={<Gallery />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
          </Route>

          {/* Customer Protected Routes */}
          <Route element={<CustomerRoute />}>
            <Route path="/MyBookings" element={<MyBookings />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="Admin/Dashboard" element={<Dashboard />} />
              <Route path="Admin/Users" element={<Users />} />
              <Route path="Admin/Staff" element={<Staff />} />
              <Route path="Admin/Staff/Add" element={<AddStaff />} />
              <Route path="Admin/Menu" element={<Menu />} />
              <Route path="Admin/Menu/Add" element={<AddMenuItem />} />
              <Route path="Admin/Rooms" element={<RoomsAdmin />} />
              <Route path="Admin/Rooms/Add" element={<AddRoom />} />
              <Route path="Admin/Table" element={<TablesAdmin />} />
              <Route path="Admin/Bookings" element={<BookingsAdmin />} />
              <Route path="Admin/Reviews" element={<ReviewsAdmin />} />
            </Route>
          </Route>

          {/* Receptionist Protected Routes */}
          <Route element={<ReceptionistRoute />}>
            <Route element={<ReceptionistLayout />}>
              <Route path="Receptionist/Home" element={<Receptionist />} />
              <Route path="Receptionist/NewRoom" element={<NewRoomBooking />} />
              <Route
                path="Receptionist/CurrentRoomBookings"
                element={<ReceptionistBookingsRoom />}
              />
              <Route
                path="Receptionist/CurrentTableBookings"
                element={<ReceptionistBookingsTable />}
              />
              <Route
                path="Receptionist/PreviousRoomBookings"
                element={<ReceptionistPreviousRoomBoookings />}
              />
              <Route
                path="Receptionist/AssignWaiters"
                element={<AssignWaiters />}
              />
              <Route
                path="Receptionist/NewTableBookings"
                element={<NewTableBooking />}
              />
            </Route>
          </Route>

          {/* Waiter Protected Routes */}
          <Route element={<WaiterRoute />}>
            <Route element={<WaiterLayout />}>
              <Route path="Waiter/Home" element={<WaiterHome />} />
              <Route path="Waiter/TakeOrder" element={<WaiterTakeOrder />} />
              <Route path="Waiter/CurrentOrder" element={<WaiterOrders />} />
            </Route>
          </Route>

          {/* Billing & Receipts */}
          <Route element={<BillAndPaymentRoute />}>
            <Route path="/BillView" element={<BillView />} />
            <Route
              path="/OrderSuccessReceipt"
              element={<OrderSuccessReceipt />}
            />
          </Route>

          {/* Unauthorized Page */}
          <Route path="/Unauthorized" element={<UnAuthorized />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
