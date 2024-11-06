import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import AdminLayout from "./components/admin-view/layout"
import AdminProducts from "./pages/admin-view/products"
import AdminFeatures from "./pages/admin-view/features"
import AdminOrders from "./pages/admin-view/orders"
import AdminDashboard from "./pages/admin-view/dashboard"
import ShoppingLayout from "./components/shopping-view/layout"
import NotFound from "./pages/not-found"
import ShoppingAccount from "./pages/shopping-view/account"
import ShoppingHome from "./pages/shopping-view/home"
import ShoppingListing from "./pages/shopping-view/listing"
import ShoppingCheckout from "./pages/shopping-view/checkout"

function App() {

  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
          <Routes>
            <Route path="/auth" element={<AuthLayout/>}>
              <Route path="login" element={<AuthLogin/>}/>
              <Route path="register" element={<AuthRegister/>}/>
            </Route>
            <Route path="/admin" element={<AdminLayout/>}>
              <Route path="products" element={<AdminProducts/>} />
              <Route path="features" element={<AdminFeatures/>} />
              <Route path="orders" element={<AdminOrders/>} />
              <Route path="dashboard" element={<AdminDashboard/>} />
            </Route>
            <Route path="/shop" element={<ShoppingLayout/>}>
              <Route path="account" element={<ShoppingAccount/>} />
              <Route path="home" element={<ShoppingHome/>} />
              <Route path="listing" element={<ShoppingListing/>} />
              <Route path="checkout" element={<ShoppingCheckout/>} />
            </Route>
            <Route path="*" element={<NotFound/>} />
          </Routes>
      </div>
    </>
  )
}

export default App
