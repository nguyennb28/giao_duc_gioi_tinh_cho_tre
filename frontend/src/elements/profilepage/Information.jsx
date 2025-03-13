const Information = ({ user }) => {
  const roleMapping = {
    admin: "Quản trị viên",
    student: "Học sinh",
    teacher: "Giáo viên",
  };

  return (
      <form className="p-2 w-full max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Thông tin cá nhân
        </h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-2 text-left text-lg font-medium text-gray-900 dark:text-white"
          >
            Tài khoản
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            value={user?.username || ""}
            disabled
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="full_name"
            className="block mb-2 text-left text-lg font-medium text-gray-900 dark:text-white"
          >
            Họ và tên
          </label>
          <input
            type="text"
            id="full_name"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            value={user?.full_name || ""}
            disabled
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block mb-2 text-left text-lg font-medium text-gray-900 dark:text-white"
          >
            Số điện thoại
          </label>
          <input
            type="text"
            id="phone"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            value={user?.phone || ""}
            disabled
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block mb-2 text-left text-lg font-medium text-gray-900 dark:text-white"
          >
            Vai trò
          </label>
          <input
            type="text"
            id="role"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            value={roleMapping[user?.role] || user?.role || ""}
            disabled
          />
        </div>
      </form>
  );
};
export default Information;
