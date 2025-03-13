import ImageChildren5 from "../../assets/imgs/homepage/5.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const StartNow = () => {
  const { user } = useAuth();

  return (
    <div className="">
      <div>
        <img src={ImageChildren5} className="" alt="Trẻ em" />
      </div>
      <div>
        {user ? (
          <Link
            to="/"
            className="w-64 h-16 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xl px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-purple-900"
            type="button"
          >
            Bắt đầu học{" "}
          </Link>
        ) : (
          <Link
            to="/login"
            type="button"
            className="w-64 h-16 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xl px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-purple-900"
          >
            Học ngay tại đây
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartNow;
