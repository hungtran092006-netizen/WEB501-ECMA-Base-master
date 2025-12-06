import { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    if (!email || !password) {
      return toast.error("Vui lòng nhập đầy đủ thông tin!")
    }

    try {
      await axios.post('http://localhost:3001/register', { email, password })
      toast.success('Đăng ký thành công')

      navigate('/login') 
    } catch (error) {
      toast.error("Lỗi: " + error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">Đăng ký tài khoản</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={event => setEmail(event.target.value)}
              type="email"
              id="email"
              placeholder="Email"
              className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={event => setPassword(event.target.value)}
              type="password"
              id="password"
              placeholder="Mật khẩu"
              className="w-full border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
