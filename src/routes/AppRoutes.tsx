import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

import Home from "../pages/Home";
import PublicMenu from "../pages/Menu/PublicMenu";
// import Dashboard from "../pages/Dashboard/Dashboard"; // Removed old dashboard
import DashboardOverview from "../pages/Dashboard/DashboardOverview";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import CreateRestaurant from "../pages/CreateRestaurant";
import CreateMenu from "../pages/Menu/CreateMenu";
import ShowMenus from "../pages/Menu/ShowMenus";
import ManageMenuItems from "../pages/Menu/ManageMenuItems";
import AddMenuItem from "../pages/Menu/AddMenuItem";
// New Menu Dashboard
import MenuDashboard from "../pages/Dashboard/Menu/MenuDashboard";
import RestaurantManage from "../pages/Dashboard/Manage/RestaurantManage";
import TableManage from "../pages/Dashboard/Manage/TableManage";
import FoodManage from "../pages/Dashboard/Manage/FoodManage";
import OrderManage from "../pages/Dashboard/Manage/OrderManage";
import OrderHistory from "../pages/Dashboard/Manage/OrderHistory";
import PermissionManage from "../pages/Dashboard/Manage/PermissionManage";
import Settings from "../pages/Dashboard/Settings";
import RestaurantRedirect from "./RestaurantRedirect";
import CheckinTable from "../pages/CheckinTable";
import FoodMenu from "../pages/Menu/FoodMenu";
import RestaurantMenu from "../pages/Menu/RestaurantMenu";
import Payment from "../pages/Payment/Payment";
import CartSidebar from "../components/CartSidebar";

import HistoryItem from "../pages/Menu/HistoryItem";
import HomePage from "../pages/Home/index";
import AuthForm from "@/components/Auth";

// export default function App() {
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartSidebar />
        <Routes>
          {/* PUBLIC */}
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/menu/:tableId" element={<PublicMenu />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<AuthForm close={() => { }} />} />
          <Route path="/menu/:restaurantId" element={<PublicMenu />} />
          <Route path="/checkin/:restaurantId/:tableId" element={<CheckinTable />} />
          <Route path="/restaurant/:restaurantId/menu" element={<RestaurantMenu />} />
          <Route path="/restaurant/:restaurantId/table/:tableId/menu" element={<FoodMenu />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/history/:orderId" element={<HistoryItem />} />

          {/* BOOKING HISTORY */}
          <Route path="/booking-history" element={<HistoryItem />} />

          {/* REDIRECT */}
          {/* PROTECTED ROUTES */}
          <Route
            path="/restaurant/:restaurantId"
            element={<RestaurantRedirect />}
          />

          {/* DASHBOARD & MANAGEMENT (WITH SIDEBAR) */}
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
              <DashboardLayout />
              // </ProtectedRoute>
            }
          >
            {/* OVERVIEW */}
            <Route index element={<DashboardOverview />} />

            {/* MANAGE */}
            <Route path="manage/restaurants" element={<RestaurantManage />} />
            <Route path="manage/tables" element={<TableManage />} />
            <Route path="manage/food" element={<FoodManage />} />
            <Route path="manage/orders" element={<OrderManage />} />
            <Route path="manage/history" element={<OrderHistory />} />
            <Route path="manage/permissions" element={<PermissionManage />} />

            {/* SETTINGS */}
            <Route path="settings" element={<Settings />} />

            {/* RESTAURANT */}
            <Route path="create-restaurant" element={<CreateRestaurant />} />

            <Route
              path="manage/restaurant/:restaurantId/menus"
              element={<ShowMenus />}
            />

            <Route
              path="manage/restaurant/:restaurantId/menu/create"
              element={<CreateMenu />}
            />

            {/* MENU ITEMS */}
            <Route path="menu/:menuId/items" element={<ManageMenuItems />} />
            <Route path="menu/:menuId/items/add" element={<AddMenuItem />} />
          </Route>

          <Route path="/FoodMenu" element={<FoodMenu />} />
          <Route
            path="/create-restaurant"
            element={
              <ProtectedRoute>
                <CreateRestaurant />
              </ProtectedRoute>
            }
          />

          {/* OTHER PROTECTED ROUTES (STANDALONE) */}
          {/* MENU MANAGEMENT ROUTES */}
          <Route
            path="/restaurant/:restaurantId/create-menu"
            element={
              <ProtectedRoute>
                <CreateMenu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurant/:restaurantId/menus"
            element={
              <ProtectedRoute>
                <ShowMenus />
              </ProtectedRoute>
            }
          />

          {/* NEW MENU DASHBOARD ROUTE */}
          <Route
            path="/menu/:menuId/dashboard"
            element={
              <ProtectedRoute>
                <MenuDashboard />
              </ProtectedRoute>
            }
          />

          {/* LEGACY MENU ROUTES - Keep for backward compatibility */}
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

          {/* REDIRECT */}
          <Route path="/restaurant-redirect" element={<RestaurantRedirect />} />
        </Routes>
        <CartSidebar />
      </AuthProvider>
    </BrowserRouter>
  );
}
