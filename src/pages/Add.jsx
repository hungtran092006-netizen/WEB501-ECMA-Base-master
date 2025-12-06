import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

function Add() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [destination, setDestination] = useState('')
  const [duration, setDuration] = useState('')
  const [category, setCategory] = useState('Tour nội địa')
  const [image, setImage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !price || !destination || !duration || !image) {
      return toast.error("Vui lòng nhập đầy đủ thông tin!")
    }

    if (Number(price) <= 0) {
      return toast.error("Giá phải lớn hơn 0")
    }

    try {
      await axios.post('http://localhost:3001/tours', {
        name,
        price: Number(price),
        destination,
        duration,
        category,
        image
      })
      toast.success("Thêm thành công!")
    } catch (err) {
      toast.error("Lỗi: " + err.message)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm tour</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Tên tour" 
          className="border p-2 w-full rounded"
        />

        <input 
          value={destination} 
          onChange={e => setDestination(e.target.value)} 
          placeholder="Điểm đến" 
          className="border p-2 w-full rounded"
        />

        <input 
          value={duration} 
          onChange={e => setDuration(e.target.value)} 
          placeholder="Thời gian" 
          className="border p-2 w-full rounded"
        />

        <input 
          value={image} 
          onChange={e => setImage(e.target.value)} 
          placeholder="Link ảnh" 
          className="border p-2 w-full rounded"
        />

        <input 
          type="number"
          value={price} 
          onChange={e => setPrice(e.target.value)} 
          placeholder="Giá"
          className="border p-2 w-full rounded"
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="Tour nội địa">Tour nội địa</option>
          <option value="Tour quốc tế">Tour quốc tế</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Thêm mới
        </button>
      </form>
    </div>
  )
}

export default Add
