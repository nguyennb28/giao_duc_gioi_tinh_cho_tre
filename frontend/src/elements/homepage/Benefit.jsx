import Card from "../../components/Card";
import ImageChildren4 from "../../assets/imgs/homepage/4.jpg";
import ImageChildren7 from "../../assets/imgs/homepage/7.jpg";
import ImageChildren9 from "../../assets/imgs/homepage/9.jpg";

const Benefit = () => {
  const defaultData = [
    {
      id: 1,
      title: `Phát triển Nhận thức và Kiến thức Đúng đắn`,
      description: `Trẻ em ở độ tuổi cấp 1 thường bắt đầu tò mò về cơ thể mình, sự khác biệt giữa trai và gái, và nguồn gốc của em bé.`,
      image: ImageChildren4,
    },
    {
      id: 2,
      title: `Tăng cường Kỹ năng Tự bảo vệ và An toàn Cá nhân`,
      description: `Giáo dục giới tính giúp trẻ nhận biết những "tín hiệu đỏ" hoặc cảm giác "không ổn" trong các tình huống giao tiếp hoặc tiếp xúc với người khác.`,
      image: ImageChildren7,
    },
    {
      id: 3,
      title: `Phát triển Cảm xúc và Tinh thần Lành mạnh`,
      description: `Khi trẻ hiểu rõ về cơ thể mình, biết cách bảo vệ bản thân và được trang bị những kỹ năng sống cần thiết, trẻ sẽ cảm thấy tự tin và có lòng tự trọng hơn.`,
      image: ImageChildren9,
    },
  ];

  return (
    <>
      <div className="">
        <h2 className="uppercase font-bold text-4xl">
          Lợi ích của việc giáo dục giới tính cho trẻ
        </h2>
      </div>
      {/* GRID CARD */}
      <div className="grid items-center mt-10 mb-10 grid-cols-1 md:grid-cols-3 gap-3">
        {defaultData.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </>
  );
};

export default Benefit;
