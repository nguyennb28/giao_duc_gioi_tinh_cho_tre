import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = "Tài khoản không được để trống !";
    }
    if (!password.trim()) {
      errors.password = "Mật khẩu không được để trống !";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsFound = validate();
    if (Object.keys(errorsFound).length > 0) {
      setErrors(errorsFound);
      alert("Thông tin đăng nhập có vấn đề");
      return;
    }
    setErrors({});
    try {
      await onLogin(username, password);
    } catch (err) {
      if (err.message) {
        alert("Tài khoản hoặc mật khẩu không chính xác!");
        setErrors((prev) => ({
          ...prev,
          message: "Tài khoản hoặc mật khẩu không chính xác",
        }));
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Đăng nhập
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2 text-left"
              htmlFor="username"
            >
              Tài khoản
            </label>
            <input
              type="text"
              id="username"
              placeholder="Nhập tài khoản / số điện thoại"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-left text-red-500 text-sm">
                {errors.username}
              </p>
            )}
            {errors.message && (
              <p className="text-left text-red-500 text-sm">{errors.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 mb-2 text-left"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              placeholder="Nhập mật khẩu"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-left text-red-500 text-sm">
                {errors.password}
              </p>
            )}
            {errors.message && (
              <p className="text-left text-red-500 text-sm">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
          >
            Đăng nhập
          </button>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Đăng ký ngay
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
