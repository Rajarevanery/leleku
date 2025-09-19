import { Route, Routes } from "react-router";
import AuthLayout from "./_auth/layout/AuthLayout";
import Login from "./_auth/Login";
import Register from "./_auth/Register";
import Home from "./page/Home";
import WebAppLayout from "./_webapp/layout/WebAppLayout";

function App() {
  return (
    <main className="flex min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/webapp" element={<WebAppLayout />}>
          
        </Route>
      </Routes>
    </main>
  );
}

export default App;
