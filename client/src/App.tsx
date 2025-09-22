import { Route, Routes } from "react-router";
import AuthLayout from "./_auth/layout/AuthLayout";
import Login from "./_auth/Login";
import Register from "./_auth/Register";
import Home from "./page/Home";
import WebAppLayout from "./_webapp/layout/WebAppLayout";
import { ToastContainer } from "react-toastify";
import Dashboard from "./_webapp/Dashboard";

function App() {
  return (
    <main className="flex min-h-screen">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/webapp" element={<WebAppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
