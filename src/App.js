import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes instead of Switch
import AdminLayout from "./Components/AdminLayout ";
import Dashboard from "./Components/Dashboard";
import Products from "./Components/Products";
import Authenticate from "./Components/Authenticate";
import Categories from "./Components/Categories";
import Blogs from "./Components/Blogs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Authenticate />} />
      <Route
        path="/dashboard"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/products"
        element={
          <AdminLayout>
            <Products />
          </AdminLayout>
        }
      />
      <Route
        path="/categories"
        element={
          <AdminLayout>
            <Categories />
          </AdminLayout>
        }
      />
      <Route
        path="/blogs"
        element={
          <AdminLayout>
            <Blogs />
          </AdminLayout>
        }
      />
    </Routes>
  );
}

export default App;
