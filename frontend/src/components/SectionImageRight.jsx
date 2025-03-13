const SectionImageRight = ({ image, content }) => {
  return (
    <div className="intro grid items-center grid-cols-1 md:grid-cols-2 mt-10 mb-10">
      <div className="">
        <img src={image} />
      </div>
      <div className="mt-10 md:mt-0">
        <h1 className="italic">{content}</h1>
      </div>
    </div>
  );
};

export default SectionImageRight;
