import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import PublicMenu from "../pages/Menu/PublicMenu";
import OwnerRegister from "../pages/Owner";
import OwnerLogin from "../pages/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
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
// import CartSidebar from "../context/CartSidebarContext";

export default function App() {
  return (
    <BrowserRouter>
      {/* <CartSidebar /> */}
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/menu/:tableId" element={<PublicMenu />} />
        <Route path="/register" element={<OwnerRegister />} />
        <Route path="/login" element={<OwnerLogin />} />

        <Route
          path="/checkin/table"
          element={
            <ProtectedRoute>
              <CheckinTable />
            </ProtectedRoute>
          }
        />

        {/* REDIRECT */}
        <Route
          path="/restaurant/:restaurantId"
          element={<RestaurantRedirect />}
        />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-restaurant"
          element={
            <ProtectedRoute>
              <CreateRestaurant />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage/restaurant/:restaurantId/menus"
          element={
            <ProtectedRoute>
              <ShowMenus />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage/restaurant/:restaurantId/menu/create"
          element={
            <ProtectedRoute>
              <CreateMenu />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menu/:menuId/items"
          element={
            <ProtectedRoute>
              <ManageMenuItems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menu/:menuId/items/add"
          element={
            <ProtectedRoute>
              <AddMenuItem />
            </ProtectedRoute>
          }
        />

        <Route
          path="/FoodMenu"
          element={
            <ProtectedRoute>
              <FoodMenu />
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
