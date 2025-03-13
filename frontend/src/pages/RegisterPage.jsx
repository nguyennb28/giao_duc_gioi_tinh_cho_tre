import ImageChildren10 from "../assets/imgs/homepage/10.jpg";
import RegisterForm from "../elements/registerpage/RegisterForm";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../axiosInstance";

const RegisterPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (username, phone, password, fullname) => {
    try {
      const payload = {
        username,
        phone,
        password,
        full_name: fullname,
      };
      const response = await axiosInstance.post("/users/", payload);
      if (response.data) {
        navigate("/login");
      }
    } catch (error) {
      console.error(`Đăng ký tài khoản không thành công ${error}`);
      throw error
    }
  };

  // Check if the user is logged in
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="registerPage">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* image  */}
          <div className="hidden md:block">
            <img src={ImageChildren10} alt="Trẻ em" />
          </div>
          {/* Register Form */}
          <RegisterForm onRegister={handleRegister}/>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
