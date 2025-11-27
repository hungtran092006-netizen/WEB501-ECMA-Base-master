import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function List() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:3001/tours";
  const navigate = useNavigate();

  // ✅ Load danh sách tours
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setTours(res.data))
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu:", err);
        setError("Không thể tải danh sách tour");
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ Xóa tour
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tour này?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setTours((prev) => prev.filter((t) => t.id !== id));
      } catch (err) {
        console.error(err);
        alert("Xóa không thành công, thử lại sau nhé!");
      }
    }
  };

  // ✅ Chuyển sang trang Edit
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  

  // ✅ UI trạng thái
  if (loading) return <p className="mt-6 text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="mt-6 text-center text-red-500">{error}</p>;
  if (!tours.length)
    return <p className="mt-6 text-center text-gray-500">Chưa có tour nào</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tour</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">STT</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Ảnh</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Tên Tour</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Điểm đến</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Thời gian</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Giá</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Số lượng còn</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour, index) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">{tour.name}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.destination}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.duration}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {tour.price.toLocaleString()} VNĐ
                </td>
                <td className="px-4 py-2 border border-gray-300">{tour.available}</td>
                <td className="px-4 py-2 border border-gray-300 space-x-2">
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Xóa
                  </button>

                  <button
                    onClick={() => handleEdit(tour.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;
