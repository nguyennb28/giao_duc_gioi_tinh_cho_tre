import DefaultImage from "../assets/imgs/default_image.jpg";

const Card = ({ image, title, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {image ? (
        <img className="w-full" src={image} alt="Trẻ em" />
      ) : (
        <img className="w-full" src={DefaultImage} alt="Trẻ em" />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
};

export default Card;
