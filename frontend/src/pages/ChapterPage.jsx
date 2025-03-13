import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import CardLink from "../components/CardLink";

const ChapterPage = () => {
  const { id } = useParams();
  const { user, userLoading } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [chapterNumber, setChapterNumber] = useState(null);
  const [infoChapter, setInfoChapter] = useState({});
  const [userProgress, setUserProgress] = useState({});
  const [isCompleteLesson, setIsCompleteLesson] = useState([]);
  const navigate = useNavigate();
  // Các hằng số dùng để xác định trạng thái ban đầu của một chapter (nếu cần)
  const url = "/lessons";

  // Hàm lấy thông tin của chapter hiện tại, bao gồm danh sách lessons.
  const getLessonsOfChapter = async () => {
    const { data: response } = await axiosInstance.get(`/chapters/${id}/`);
    if (response) {
      setChapterNumber(response.chapter_number);
      setLessons(response.lessons);
    }
  };

  // Hàm lấy thông tin chi tiết của chapter (bao gồm cả mảng lesson) qua API.
  const getInfoLessonsByChapter = async () => {
    try {
      const response = await axiosInstance.get(
        `/lessons/by_chapter/?chapter_id=${id}`
      );
      if (response.status === 200) {
        setInfoChapter(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Hàm check trạng thái hoàn thành của các lesson, có kèm kiểm tra điều kiện chapter trước đã hoàn thành hay chưa.
   *
   * 1. Nếu chapter hiện tại không phải là chapter đầu tiên (chapterNumber > 1):
   *    - Hàm sẽ lấy thông tin chapter trước bằng cách request API: `/chapters/{previousChapterNumber}/`.
   *    - Sau đó, xây dựng query string dựa trên danh sách lesson của chapter trước và lấy tiến trình người dùng cho các lesson đó.
   *    - Nếu số bài đã hoàn thành ở chapter trước không bằng tổng số bài học trong chapter đó,
   *      tức chapter trước chưa hoàn thành đầy đủ -> tất cả lesson của chapter hiện tại sẽ bị khóa.
   *    - Khi đó, hàm cập nhật tất cả các lesson của chapter hiện tại với `lock: true` và kết thúc.
   *
   * 2. Nếu là chapter đầu tiên hoặc chapter trước đã hoàn thành đầy đủ:
   *    - Hàm sẽ xây dựng query string với danh sách lesson của chapter hiện tại,
   *    - Lấy dữ liệu progress của người dùng cho các lesson đó,
   *    - Xác định lesson có số thứ tự cao nhất đã hoàn thành (maxCompleted).
   *    - Sau đó, cập nhật các lesson:
   *         • Các lesson có lesson_number ≤ maxCompleted (đã hoàn thành) được mở khóa (lock: false).
   *         • Lesson tiếp theo (lesson_number === maxCompleted + 1) cũng được mở khóa, cho phép tiến hành học.
   *         • Các lesson khác sẽ được khóa.
   */
  const checkIsCompleteLessons = async (lessonsProgress) => {
    try {
      // Nếu không phải là chapter đầu tiên, kiểm tra chapter trước đã hoàn thành chưa.
      if (chapterNumber > 1) {
        const previousChapterNumber = chapterNumber - 1;
        // Giả sử endpoint lấy thông tin chapter theo chapter number
        const { data: prevChapterData } = await axiosInstance.get(
          `/chapters/${previousChapterNumber}/`
        );
        if (prevChapterData) {
          const previousLessons = prevChapterData.lessons;
          // Xây dựng query string cho các lesson của chapter trước
          const prevLessonQuery = previousLessons.reduce(
            (acc, lesson, index) => {
              return index === 0
                ? `?lesson_id=${lesson.id}`
                : `${acc}&lesson_id=${lesson.id}`;
            },
            ""
          );
          // Lấy tiến trình của người dùng cho các lesson của chapter trước
          const prevProgressResponse = await axiosInstance.get(
            `/user-progress/by_lessons/${prevLessonQuery}`
          );
          if (prevProgressResponse.status === 200) {
            // Đếm số bài học đã hoàn thành của chapter trước
            const completedPrevLessonsCount = prevProgressResponse.data.filter(
              (progress) => progress.is_completed
            ).length;
            // Nếu số bài đã hoàn thành không bằng tổng số lesson của chapter trước,
            // tức chapter trước chưa hoàn thành đầy đủ, nên khóa tất cả các lesson của chapter hiện tại.
            if (completedPrevLessonsCount !== previousLessons.length) {
              const updatedLessons = lessons.map((lesson) => ({
                ...lesson,
                lock: true,
              }));
              setLessons(updatedLessons);
              // Kết thúc hàm, không xử lý tiếp progress của chapter hiện tại.
              return;
            }
          }
        }
      }

      // Nếu là chapter đầu tiên hoặc chapter trước đã hoàn thành đầy đủ,
      // tiến hành xử lý progress cho chapter hiện tại.
      const currentQuery = lessonsProgress.reduce((acc, lesson, index) => {
        return index === 0
          ? `?lesson_id=${lesson.id}`
          : `${acc}&lesson_id=${lesson.id}`;
      }, "");
      const response = await axiosInstance.get(
        `/user-progress/by_lessons/${currentQuery}`
      );
      if (response.status === 200) {
        setIsCompleteLesson(response.data);
        const completedLessonNumbers = response.data
          .filter((progress) => progress.is_completed)
          .map((progress) => {
            // Tìm lesson ứng với progress
            const lesson = lessonsProgress.find(
              (l) => l.id === progress.lesson
            );
            return lesson ? lesson.lesson_number : null;
          })
          .filter((num) => num !== null);
        // Xác định lesson số cao nhất đã hoàn thành
        const maxCompleted =
          completedLessonNumbers.length > 0
            ? Math.max(...completedLessonNumbers)
            : 0;
        // Cập nhật trạng thái các lesson:
        // - Những lesson có lesson_number <= maxCompleted (đã hoàn thành) được mở khóa,
        // - Lesson kế tiếp (lesson_number === maxCompleted + 1) cũng mở khóa,
        // - Các lesson khác vẫn bị khóa.
        const updateLessons = lessons.map((lesson) => {
          if (
            lesson.lesson_number <= maxCompleted ||
            lesson.lesson_number === maxCompleted + 1
          ) {
            return {
              ...lesson,
              lock: false,
            };
          } else {
            return {
              ...lesson,
              lock: true,
            };
          }
        });
        setLessons(updateLessons);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Hàm render ra các component CardLink cho từng lesson.
  const renderLessons = (items) => {
    /*  
      CardLink cho phép truy cập khi:
      - Đây là bài đầu tiên của chapter đầu tiên hoặc 
      - Khi các bài học đã hoàn thành (is_completed = true) được mở khóa,
      - Các bài học còn lại sẽ hiển thị nhưng trạng thái bị khóa (lock: true).
    */
    return items.map((item) => (
      <CardLink
        key={item.lesson_number}
        id={item.id}
        url={url}
        title={`Bài ${item.lesson_number} - ${item.title}`}
        lock={item.lock}
      />
    ));
  };

  // Kiểm tra trạng thái đăng nhập của user.
  useEffect(() => {
    if (!userLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, userLoading, navigate]);

  // Khi component được mount, lấy thông tin lesson của chapter và thông tin chi tiết chapter.
  useEffect(() => {
    getLessonsOfChapter();
    getInfoLessonsByChapter();
  }, []);

  // Khi infoChapter (bao gồm mảng lesson) và chapterNumber có thay đổi, tiến hành
  // kiểm tra trạng thái hoàn thành của các lesson.
  useEffect(() => {
    if (infoChapter && Array.isArray(infoChapter.lesson)) {
      checkIsCompleteLessons(infoChapter.lesson);
    }
  }, [infoChapter, chapterNumber]);

  return (
    <div className="chapterPage">
      <div className="mx-auto flex flex-col max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="title">
          <h1 className="text-center font-semibold text-2xl uppercase">
            Các bài giảng
          </h1>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-center p-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lessons ? renderLessons(lessons) : <></>}
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
