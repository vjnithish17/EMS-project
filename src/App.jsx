import "./App.css";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Not_found from "./pages/Not_found";

import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./pages/Sidebar";
import Navbar from "./pages/Navbar";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Login */}
                <Route
                    path="/"
                    element={<Login />}
                />

                {/* Register */}
                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>

                            <Sidebar />

                            <div className="page-area">

                                <Navbar />

                                <main className="main-content">
                                    <Dashboard />
                                </main>

                            </div>

                        </PrivateRoute>
                    }
                />


                {/* Employees */}
                <Route
                    path="/employees"
                    element={
                        <PrivateRoute>

                            <Sidebar />

                            <div className="page-area">

                                <Navbar />

                                <main className="main-content">
                                    <Employees />
                                </main>

                            </div>

                        </PrivateRoute>
                    }
                />


                {/* 404 */}
                <Route
                    path="*"
                    element={<Not_found />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
