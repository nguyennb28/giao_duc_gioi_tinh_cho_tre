import Information from "../elements/profilepage/Information";
import UpdateInfo from "../elements/profilepage/UpdateInfo";
import { useAuth } from "../AuthContext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cog6ToothIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import axiosInstance from "../axiosInstance";

const ProfilePage = () => {
  const [update, setUpdate] = useState(false);

  const { user, userLoading, setUser } = useAuth();
  const navigate = useNavigate();

  const handleUpdate = async (full_name, phone, role, password) => {
    try {
      const payload = {
        full_name,
        phone,
        ...(password ? { password } : {}),
        ...(role ? { role } : {}),
      };
      const response = await axiosInstance.patch(
        `/users/${user?.id}/`,
        payload
      );
      if (response.status) {
        alert("Cập nhật thông tin thành công");
        setUser(response.data);
        setUpdate(false);
      }
    } catch (error) {
      console.error(`Cập nhật thông tin tài khoản không thành công ${error}`);
      throw error;
    }
  };

  useEffect(() => {
    /*
      check loading is false and user loaded 
      if user is null return login 
      else still here
    */
    if (!userLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, userLoading, navigate]);

  return (
    <div className="profilePage">
      <div className="bg-gray-80 rounded-lg shadow-xl mx-auto flex max-w-7xl justify-between p-6 lg:px-8">
        {!update ? (
          <>
            <Information user={user} />
            <div className="p-2">
              <button
                className="cursor-pointer"
                onClick={(e) => setUpdate(!update)}
                title="Chỉnh sửa"
              >
                <Cog6ToothIcon className="size-6" />
              </button>
            </div>
          </>
        ) : (
          <>
            <UpdateInfo user={user} onUpdate={handleUpdate} />
            <div className="p-2">
              <button
                className="cursor-pointer"
                onClick={(e) => setUpdate(!update)}
                title="Trở về"
              >
                <ArrowUturnLeftIcon className="size-6" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
