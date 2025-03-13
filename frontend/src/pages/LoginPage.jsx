import ImageChildren8 from "../assets/imgs/homepage/8.jpg";
import LoginForm from "../elements/loginpage/LoginForm";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const LoginPage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      console.error(error.message);
      throw error
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="loginPage">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* image  */}
          <div className="hidden md:block">
            <img src={ImageChildren8} alt="Trẻ em" />
          </div>
          {/*  */}
          <LoginForm onLogin={handleLogin} />
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
