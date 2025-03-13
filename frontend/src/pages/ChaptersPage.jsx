import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axiosInstance from "../axiosInstance";
import CardLink from "../components/CardLink";
import ImageChildren2 from "../assets/imgs/homepage/2.jpg";
import ImageChildren11 from "../assets/imgs/homepage/11.jpg";
import ImageChildren12 from "../assets/imgs/homepage/12.jpg";
import ImageChildren13 from "../assets/imgs/homepage/13.jpg";
import ImageChildren14 from "../assets/imgs/homepage/14.jpg";
import ImageChildren15 from "../assets/imgs/homepage/15.jpg";

const ChaptersPage = () => {
  const { user, userLoading } = useAuth();
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();

  const getList = async () => {
    try {
      const response = await axiosInstance.get("/chapters/");
      if (response.data) {
        setChapters(response.data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const images = [
    ImageChildren2,
    ImageChildren11,
    ImageChildren12,
    ImageChildren13,
    ImageChildren14,
    ImageChildren15,
  ];

  const url = "/chapters"

  const randomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const renderListChapter = (items) => {
    return items.map((item) => (
      <CardLink
        key={item.chapter_number}
        id={item.id}
        image={randomImage()}
        url={url}
        title={`Chương ${item.chapter_number} - ${item.name}`}
        description={""}
      />
    ));
  };

  useEffect(() => {
    if (!userLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, userLoading, navigate]);

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="chaptersPage">
      <div className="mx-auto flex flex-col max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="title">
          <h1 className="text-center font-semibold text-2xl uppercase">
            Các chương
          </h1>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-center p-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {chapters ? renderListChapter(chapters) : <></>}
        </div>
      </div>
    </div>
  );
};

export default ChaptersPage;
