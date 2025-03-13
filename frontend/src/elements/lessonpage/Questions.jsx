import { useState } from "react";

const Questions = ({ title, question, onAnswerSubmit, disabled = false }) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    // Notificate for LessonPage
    onAnswerSubmit(question.id, answer);
  };

  return (
    <div className="duration-300 ease-in border-2 border-dotted border-gray-900 rounded-lg shadow-xl mb-4 p-10">
      <h3>
        {title}. {question.question_text}
      </h3>
      <div className="flex flex-col justify-center items-start">
        {question.answer_options &&
          question.answer_options.map((answer, index) => {
            return (
              <div key={answer.id} className="w-full">
                <button
                  type="button"
                  onClick={() => handleAnswerClick(answer)}
                  className={`w-full flex cursor-pointer duration-300 transistion ease-in-out p-3 hover:rounded ${
                    selectedAnswer?.id === answer.id
                      ? answer.is_correct
                        ? "bg-green-200"
                        : "bg-red-200"
                      : "hover:bg-sky-200 hover:shadow-lg"
                  }`}
                  disabled={showResult || disabled}
                >
                  {alphabet[index]}. {answer.answer_text}
                </button>
                {selectedAnswer?.id === answer.id && showResult && (
                  <p
                    className={`mt-1 ml-3 ${
                      answer.is_correct ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {answer.is_correct ? "✓ Đúng" : "✗ Sai"}
                  </p>
                )}
              </div>
            );
          })}

        {showResult && !disabled && (
          <button
            type="button"
            className="cursor-pointer mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setSelectedAnswer(null);
              setShowResult(false);
            }}
          >
            Thử lại
          </button>
        )}
      </div>
    </div>
  );
};

export default Questions;
