import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Questions from "../elements/lessonpage/Questions";

const LessonsPage = () => {
  const { id } = useParams();
  const { user, userLoading } = useAuth();
  const [lesson, setLesson] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userProgress, setUserProgress] = useState({});
  const navigate = useNavigate();

  const getLesson = async () => {
    try {
      const response = await axiosInstance(`/lessons/${id}/`);
      if (response.status == 200) {
        setLesson(response.data);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getQuestions = async () => {
    try {
      const response = await axiosInstance(`/questions/by_lesson/${id}/`);
      if (response.status == 200) {
        setQuestions(response.data);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getUserProgress = async () => {
    try {
      const response = await axiosInstance.get(
        `/user-progress/by_lesson/?lesson_id=${id}`
      );

      if (response.status == 200) {
        setUserProgress(response.data);
        if (response.data.is_completed || response.data.quiz_score == 100) {
          setSubmitted(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnswerSubmit = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        answerId: answer.id,
        isCorrect: answer.is_correct,
      },
    }));
  };

  const handleSubmitQuiz = async () => {
    setSubmitting(true);

    try {
      const totalQuestions = questions.length;
      const correctAnswers = Object.values(answers).filter(
        (a) => a.isCorrect
      ).length;
      const score = (correctAnswers / totalQuestions) * 100;

      // Send result to server
      const response = await axiosInstance.post("/user-progress/", {
        lesson: lesson.id,
        is_completed: score == 100 ? true : false,
        quiz_score: score,
      });

      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
        setUserProgress({ ...userProgress, quiz_score: score });
        alert(`Nộp bài thành công! Điểm của bạn: ${score.toFixed(0)}/100`);
      }
    } catch (error) {
      console.error("Lỗi khi nộp bài:", error);
      alert("Có lỗi xảy ra khi nộp bài. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  const allQuestionsAnswered =
    questions.length > 0 && Object.keys(answers).length === questions.length;

  /**
   *  Render Question
   *  and AnswerOptions
   * */
  const renderQA = (items) => {
    return items.map((item, index) => {
      return (
        <Questions
          key={item.id}
          title={"Câu " + (index + 1)}
          question={item}
          onAnswerSubmit={handleAnswerSubmit}
          disabled={submitted}
        />
      );
    });
  };

  useEffect(() => {
    if (!userLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, userLoading, navigate]);

  useEffect(() => {
    getUserProgress();
    getLesson();
    getQuestions();
  }, []);

  return (
    <div className="lessonsPage">
      <div className="mx-auto flex flex-col max-w-7xl justify-between p-6 lg:px-8">
        {/* title */}
        <div className="title mb-6">
          <h1 className="text-left font-semibold text-2xl uppercase">
            Bài {lesson.lesson_number} - {lesson.title}
          </h1>
        </div>
        {/* Grid container: video & description */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
          <div className="lesson-video">
            <div className="">
              <iframe
                width="100%"
                height="315rem"
                src={lesson.video_url}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-2xl shadow-xl block"
              ></iframe>
            </div>
          </div>
          <div className="lesson-description">
            <h2 className="font-semibold text-xl">Mô tả</h2>
            <p>{lesson.description}</p>
          </div>
        </div>
        {/* Question */}
        <div className="questions">
          {questions.length > 0 && renderQA(questions)}
        </div>

        {/* Submit button */}
        {questions.length > 0 && !submitted && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleSubmitQuiz}
              disabled={!allQuestionsAnswered || submitting}
              className={`px-6 py-3 rounded-lg text-white font-bold ${
                allQuestionsAnswered && !submitting
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {submitting ? "Đang xử lý..." : "Nộp bài"}
            </button>
          </div>
        )}

        {/* Results after submission */}
        {submitted && (
          <div className="mt-8 p-6 bg-green-100 rounded-lg text-center">
            <h3 className="text-xl font-bold text-green-700 mb-2">
              Bài làm đã được nộp thành công!
            </h3>
            <p className="mb-4">
              Điểm số của bạn: {userProgress.quiz_score}
              /100
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonsPage;
