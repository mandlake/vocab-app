import { useEffect, useState } from "react";
import type { Word } from "../types/word";

interface QuizProps {
  words: Word[];
  onExit: () => void;
}

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const Quiz = ({ words, onExit }: QuizProps) => {
  const [quizList, setQuizList] = useState<Word[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizType, setQuizType] = useState<"en-ko" | "ko-en">("en-ko");
  const [userAnswer, setUserAnswer] = useState("");

  useEffect(() => {
    setQuizList(shuffle(words));
    setQuizType(Math.random() > 0.5 ? "en-ko" : "ko-en");
  }, [words]);

  if (quizList.length === 0) {
    return <p>퀴즈를 준비할 단어가 없습니다.</p>;
  }

  const current = quizList[quizIndex];
  const question = quizType === "en-ko" ? current.term : current.meaning;
  const correctAnswer = quizType === "en-ko" ? current.meaning : current.term;

  const handleSubmit = () => {
    const userInput = userAnswer.trim().toLowerCase();
    const answer = correctAnswer.trim().toLowerCase();

    if (userInput === answer) {
      alert("✅ 정답입니다!");
    } else {
      alert(`❌ 틀렸습니다. 정답: ${correctAnswer}`);
    }

    setUserAnswer("");

    if (quizIndex + 1 < quizList.length) {
      setQuizIndex(quizIndex + 1);
      setQuizType(Math.random() > 0.5 ? "en-ko" : "ko-en");
    } else {
      alert("🎉 퀴즈가 종료되었습니다!");
      onExit();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-auto">
      <p className="text-gray-500 text-sm mb-2 text-center">
        문제 {quizIndex + 1} / {quizList.length}
      </p>

      <div className="bg-rose-50 rounded p-4 text-center mb-4">
        <p className="text-lg font-bold">{question}</p>
      </div>

      <input
        type="text"
        className="w-full border p-2 rounded"
        placeholder="정답 입력"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />

      <button
        className="mt-4 w-full bg-rose-500 text-white py-2 px-4 rounded"
        onClick={handleSubmit}>
        제출
      </button>

      <button
        className="mt-2 w-full text-sm text-gray-500 underline"
        onClick={onExit}>
        퀴즈 종료
      </button>
    </div>
  );
};

export default Quiz;
