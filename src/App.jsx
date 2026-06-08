import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import RestaurantDetails from "./pages/RestaurantDetails";
import FoodDetails from "./pages/FoodDetails";
import Profile from "./pages/Profile";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Restaurants from "./pages/Restaurants";
import Foods from "./pages/Foods";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AddRestaurant from "./pages/admin/AddRestaurant";
import AddFood from "./pages/admin/AddFood";
import ManageFoods from "./pages/admin/ManageFoods";
import AdminOrders from "./pages/admin/AdminOrders";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />

      <div className="min-h-screen bg-[#080808] text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:id" element={<RestaurantDetails />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/foods/:id" element={<FoodDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/add-restaurant"
            element={
              <AdminRoute>
                <AddRestaurant />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/add-food"
            element={
              <AdminRoute>
                <AddFood />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/manage-foods"
            element={
              <AdminRoute>
                <ManageFoods />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
