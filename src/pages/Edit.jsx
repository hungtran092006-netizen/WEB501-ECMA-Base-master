import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = "http://localhost:3001/tours";

  const [tour, setTour] = useState({
    name: "",
    image: "",
    destination: "",
    duration: "",
    price: "",
    available: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ Load dữ liệu tour theo ID
  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => setTour(res.data))
      .catch((err) => {
        console.error(err);
        alert("Không tìm thấy tour!");
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // ✅ Lưu thay đổi
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}/${id}`, tour);
      alert("Cập nhật thành công!");
      navigate("/list"); // Quay lại List
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại!");
    }
  };

  if (loading) return <p className="text-center mt-6">Đang tải dữ liệu...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Cập nhật Tour</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên tour */}
        <div>
          <label className="block font-medium mb-1">Tên tour</label>
          <input
            type="text"
            value={tour.name}
            onChange={(e) => setTour({ ...tour, name: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Ảnh */}
        <div>
          <label className="block font-medium mb-1">Link ảnh</label>
          <input
            type="text"
            value={tour.image}
            onChange={(e) => setTour({ ...tour, image: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Điểm đến */}
        <div>
          <label className="block font-medium mb-1">Điểm đến</label>
          <input
            type="text"
            value={tour.destination}
            onChange={(e) => setTour({ ...tour, destination: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Thời gian */}
        <div>
          <label className="block font-medium mb-1">Thời gian</label>
          <input
            type="text"
            value={tour.duration}
            onChange={(e) => setTour({ ...tour, duration: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Giá */}
        <div>
          <label className="block font-medium mb-1">Giá</label>
          <input
            type="number"
            value={tour.price}
            onChange={(e) => setTour({ ...tour, price: Number(e.target.value) })}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Số lượng */}
        <div>
          <label className="block font-medium mb-1">Số lượng còn</label>
          <input
            type="number"
            value={tour.available}
            onChange={(e) =>
              setTour({ ...tour, available: Number(e.target.value) })
            }
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Nút */}
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Cập nhật
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
