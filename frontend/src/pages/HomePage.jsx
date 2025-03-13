import IntroHomePage from "../elements/homepage/Intro";
import SecondIntro from "../elements/homepage/SecondIntro";
import Benefit from "../elements/homepage/Benefit";
import StartNow from "../elements/homepage/StartNow";
import ImageChildren1 from "../assets/imgs/homepage/1.jpg";
import ImageChildren6 from "../assets/imgs/homepage/6.jpg";

const HomePage = () => {
  const firstPara = `"Giáo dục giới tính là học về cơ thể của con và cách giữ cho cơ thể
con được an toàn và khỏe mạnh. Con sẽ được học tên các bộ phận trên cơ
thể, biết những đụng chạm nào là tốt, đụng chạm nào không tốt, và học
cách nói "không" nếu con cảm thấy không thoải mái hoặc nguy hiểm.
Giống như học cách đi đường an toàn, giáo dục giới tính giúp con bảo
vệ bản thân mình."`;

  const secondPara = `"Giáo dục giới tính cho trẻ đóng góp vào sự phát triển toàn diện của trẻ về nhận thức, kỹ năng, cảm xúc, tinh thần và các mối quan hệ xã hội, đồng thời có tác động tích cực đến gia đình và cộng đồng."`;

  return (
    <div className="homePage">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <IntroHomePage img={ImageChildren1} content={firstPara} />
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <SecondIntro img={ImageChildren6} content={secondPara} />
      </div>
      <div className="mx-auto flex flex-col max-w-7xl items-center justify-between p-6 lg:px-8">
        <Benefit />
      </div>
      <div className="mx-auto flex flex-col max-w-7xl items-center justify-between p-6 lg:px-8">
        <StartNow />
      </div>
    </div>
  );
};

export default HomePage;
