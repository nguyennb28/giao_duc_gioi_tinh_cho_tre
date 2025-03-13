const SectionImageLeft = ({ image, content }) => {
  return (
    <div className="intro grid items-center grid-cols-1 md:grid-cols-2 mt-10 mb-10">
        <div className="mt-10 md:mt-0 order-last md:order-first">
            <h1 className="italic">{content}</h1>
        </div>
        <div className="order-first md:order-last">
            <img src={image}/>
        </div>
    </div>
  );
};

export default SectionImageLeft;
