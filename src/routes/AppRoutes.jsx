import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import PublicMenu from "../pages/Menu/PublicMenu";
import OwnerRegister from "../pages/Owner";
import OwnerLogin from "../pages/Login";
// import Dashboard from "../pages/Dashboard/Dashboard"; // Removed old dashboard
import DashboardOverview from "../pages/Dashboard/DashboardOverview";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import CreateRestaurant from "../pages/CreateRestaurant";
import CreateMenu from "../pages/Menu/CreateMenu";
import ShowMenus from "../pages/Menu/ShowMenus";
import ManageMenuItems from "../pages/Menu/ManageMenuItems";
import AddMenuItem from "../pages/Menu/AddMenuItem";
import RestaurantRedirect from "./RestaurantRedirect";
import CheckinTable from "../pages/CheckinTable";
import FoodMenu from "../pages/Menu/FoodMenu";
import RestaurantMenu from "../pages/Menu/RestaurantMenu";
import Payment from "../pages/Payment/Payment";
import CartSidebar from "../components/CartSidebar";

export default function App() {
  return (
    <BrowserRouter>
      <CartSidebar />
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/menu/:tableId" element={<PublicMenu />} />
        <Route path="/register" element={<OwnerRegister />} />
        <Route path="/login" element={<OwnerLogin />} />

        {/* REDIRECT */}
        <Route
          path="/restaurant/:restaurantId"
          element={<RestaurantRedirect />}
        />

        {/* DASHBOARD & MANAGEMENT (WITH SIDEBAR) */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route
            path="/dashboard/restaurants"
            element={<DashboardOverview />}
          />{" "}
          {/* Reusing overview for now */}
          <Route path="/create-restaurant" element={<CreateRestaurant />} />
          <Route
            path="/manage/restaurant/:restaurantId/menus"
            element={<ShowMenus />}
          />
          <Route
            path="/manage/restaurant/:restaurantId/menu/create"
            element={<CreateMenu />}
          />
          <Route path="/menu/:menuId/items" element={<ManageMenuItems />} />
          <Route path="/menu/:menuId/items/add" element={<AddMenuItem />} />
          <Route path="/FoodMenu" element={<FoodMenu />} />
        </Route>

        {/* OTHER PROTECTED ROUTES (STANDALONE) */}
        <Route
          path="/checkin/table"
          element={
            <ProtectedRoute>
              <CheckinTable />
            </ProtectedRoute>
          }
        />

        <Route
          path="/RestaurantMenu"
          element={
            <ProtectedRoute>
              <RestaurantMenu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
