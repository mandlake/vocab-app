import { useEffect, useState } from "react";
import WordForm from "./components/WordForm";
import type { Word } from "./types/word";

const App = () => {
  const [words, setWords] = useState<Word[]>([]);

  // 로컬 스토리지에서 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("vocab_words");
    if (saved) {
      setWords(JSON.parse(saved));
    }
  }, []);

  // 단어 추가 처리
  const handleAddWord = (word: Word) => {
    const updated = [...words, word];
    setWords(updated);
    localStorage.setItem("vocab_words", JSON.stringify(updated));
  };

  // 단어 삭제
  const handleDeleteWord = (id: string) => {
    const updated = words.filter((w) => w.id !== id);
    setWords(updated);
    localStorage.setItem("vocab_words", JSON.stringify(updated));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">📘 단어장</h1>
      <WordForm onAddWord={handleAddWord} />

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">📋 등록된 단어</h2>
        {words.length === 0 ? (
          <p className="text-gray-500">등록된 단어가 없습니다.</p>
        ) : (
          <ul className="space-y-2">
            {words.map((word) => (
              <li
                key={word.id}
                className="border rounded p-3 flex justify-between items-start">
                <div>
                  <p className="font-bold">{word.term}</p>
                  <p>{word.meaning}</p>
                  {word.example && (
                    <p className="text-sm text-gray-600 italic mt-1">
                      예문: {word.example}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteWord(word.id)}
                  className="text-red-500 hover:font-extrabold ml-4">
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
