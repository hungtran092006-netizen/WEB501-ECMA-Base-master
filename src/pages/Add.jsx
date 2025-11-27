import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Add() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:3001/tours";

  const [tour, setTour] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    image: "",
    description: "",
    available: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTour({ ...tour, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Tạo ID mới (đơn giản, lấy max id + 1)
      const resAll = await axios.get(API_URL);
      const ids = resAll.data.map((t) => t.id);
      const newId = ids.length ? Math.max(...ids) + 1 : 1;

      const newTour = {
        ...tour,
        id: newId,
        price: Number(tour.price),
        available: Number(tour.available),
      };

      await axios.post(API_URL, newTour);
      alert("Thêm tour thành công!");
      navigate("/"); // Quay về danh sách
    } catch (err) {
      console.error(err);
      alert("Thêm tour thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Thêm Tour Mới</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Tên tour</label>
          <input
            type="text"
            name="name"
            value={tour.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Điểm đến</label>
          <input
            type="text"
            name="destination"
            value={tour.destination}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Thời gian</label>
          <input
            type="text"
            name="duration"
            value={tour.duration}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Giá (VNĐ)</label>
          <input
            type="number"
            name="price"
            value={tour.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Ảnh (URL)</label>
          <input
            type="text"
            name="image"
            value={tour.image}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Mô tả</label>
          <textarea
            name="description"
            value={tour.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Số lượng còn</label>
          <input
            type="number"
            name="available"
            value={tour.available}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {loading ? "Đang thêm..." : "Thêm tour"}
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

export default Add;
