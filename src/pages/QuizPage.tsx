"use client";

import { useEffect, useState } from "react";
import Quiz from "../components/Quiz";
import type { Word } from "../types/word";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const [words, setWords] = useState<Word[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("vocab_words");
    if (saved) {
      setWords(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-rose-100 flex justify-center items-start py-10 px-4">
      <Quiz words={words} onExit={() => navigate("/")} />
    </div>
  );
};

export default QuizPage;
