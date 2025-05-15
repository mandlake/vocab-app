import { useEffect, useState } from "react";
import WordForm from "./components/WordForm";
import type { Word } from "./types/word";

const App = () => {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("vocab_words");
    if (saved) {
      setWords(JSON.parse(saved));
    }
  }, []);

  const handleAddWord = (word: Word) => {
    const updated = [...words, word];
    setWords(updated);
    localStorage.setItem("vocab_words", JSON.stringify(updated));
  };

  const handleDeleteWord = (id: string) => {
    const updated = words.filter((w) => w.id !== id);
    setWords(updated);
    localStorage.setItem("vocab_words", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-rose-100 flex justify-center items-start py-10 px-4">
      <main className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">나만의 단어장</h1>

        <WordForm onAddWord={handleAddWord} />

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">
            📋 등록된 단어
          </h2>

          {words.length === 0 ? (
            <p className="text-gray-500 text-center">
              아직 등록된 단어가 없습니다.
            </p>
          ) : (
            <ul className="grid gap-4">
              {words.map((word) => (
                <li
                  key={word.id}
                  className="bg-white rounded-xl shadow-md p-4 relative border-l-4 border-rose-400">
                  <button
                    onClick={() => handleDeleteWord(word.id)}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm">
                    삭제
                  </button>

                  <p className="text-lg font-semibold text-rose-700">
                    {word.term}
                  </p>
                  <p className="text-gray-800">{word.meaning}</p>
                  {word.example && (
                    <p className="text-sm text-gray-500 italic mt-1">
                      예문: "{word.example}"
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
