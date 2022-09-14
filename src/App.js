import NavBar from "./components/NavBar";

import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Toast from "./components/Toast";
import AuthRoute from "./components/AuthRoute";
import User from "./pages/User";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <AuthRoute>
                <Home />
              </AuthRoute>
            }
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/users" element={<User />} />
        </Routes>
      </BrowserRouter>
      <Toast />
    </div>
  );
}

export default App;
