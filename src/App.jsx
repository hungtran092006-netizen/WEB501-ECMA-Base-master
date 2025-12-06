import { Toaster } from "react-hot-toast";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import List from "./pages/List";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./layout/AdminLayout";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            <strong>WEB501 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">
              Trang chủ
            </Link>

            <Link to="/list" className="hover:text-gray-200">
              Danh sách
            </Link>

            <Link to="/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {!isLogged ? (
              <>
                <Link to="/login" className="hover:text-gray-200">
                  Đăng nhập
                </Link>
                <Link to="/register" className="hover:text-gray-200">
                  Đăng ký
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
              >
                Đăng xuất
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB501</h1>
        <p className="text-lg text-gray-600">Ứng dụng quản lý dữ liệu</p>

        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/List" element={<List />} />
            <Route path="/add" element={<Add />} />
            <Route path="/pages/edit/:id" element={<Edit />} />
          </Route>
          <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;
