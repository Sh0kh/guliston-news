import React, { useState } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import Swal from 'sweetalert2';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const Login = async () => {
    try {
      const response = await axios.get(`api/auth/user/login`, {
        params: {
          username: login,
          password: password
        }
      })
      localStorage.setItem('token', response.data.token);
      if (response?.data?.code === 200) {
        navigate('/admin/news')
        Swal.fire({
          title: 'Muvaffaqiyatli!',
          icon: 'success',
          position: 'top-end',
          timer: 3000,
          timerProgressBar: true,
          showCloseButton: true,
          toast: true,
          showConfirmButton: false,
        });
      } else if (response?.data?.code === 404) {
        Swal.fire({
          title: 'Error!',
          text: 'Login yoki parol xato!',
          icon: 'error',
          position: 'top-end',
          timer: 3000,
          timerProgressBar: true,
          showCloseButton: true,
          toast: true,
          showConfirmButton: false,
        });
      }

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Error.',
        icon: 'error',
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true,
        showCloseButton: true,
        toast: true,
        showConfirmButton: false,
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-center">

        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <div className="space-y-4">
          <Input
            label="Email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            color="gray"  // Changed to gray for a neutral look
            type="text"
            required
            className="border-black"  // Black border color
          />
          <Input
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            color="gray"  // Changed to gray for a neutral look
            type="password"
            required
            className="border-black"  // Black border color
          />
          <Button
            fullWidth
            color="gray"  // Changed to gray for a neutral button
            onClick={Login}
            className="bg-MainColor text-white hover:bg-gray-800"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
