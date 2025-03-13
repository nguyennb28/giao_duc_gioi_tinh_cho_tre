import { Link } from "react-router-dom";
import DefaultImage from "../assets/imgs/default_image.jpg";

const CardLink = ({ image, id, title, description, url, lock = false }) => {
  const messageLock = () => {
    alert(`${title} đang khóa \nĐề nghị giải bài tập trước khi qua bài mới`);
  };

  if (lock) {
    return (
      <div
        className="cursor-pointer max-w-sm rounded overflow-hidden shadow-lg"
        onClick={() => messageLock()}
      >
        {image ? (
          <img className="w-full" src={image} alt="Trẻ em" />
        ) : (
          <img className="w-full" src={DefaultImage} alt="Trẻ em" />
        )}
        <div className="px-6 py-4">
          <div className="cursor-pointer font-bold text-xl mb-2 text-zinc-600 hover:text-amber-500">
            {title}
          </div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
      </div>
    );
  }
  return (
    <Link to={`${url}/${id}`} className="flex">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        {image ? (
          <img className="w-full" src={image} alt="Trẻ em" />
        ) : (
          <img className="w-full" src={DefaultImage} alt="Trẻ em" />
        )}
        <div className="px-6 py-4">
          <div className="cursor-pointer font-bold text-xl mb-2 text-zinc-600 hover:text-amber-500">
            {title}
          </div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CardLink;
