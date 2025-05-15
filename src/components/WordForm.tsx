import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Word } from "../types/word";

interface WordFormProps {
  onAddWord: (word: Word) => void;
}

const WordForm = ({ onAddWord }: WordFormProps) => {
  const [term, setTerm] = useState("");
  const [meaning, setMeaning] = useState("");
  const [example, setExample] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim() || !meaning.trim()) return;

    const newWord: Word = {
      id: uuidv4(),
      term,
      meaning,
      example,
      bookmarked: false,
    };

    onAddWord(newWord);

    setTerm("");
    setMeaning("");
    setExample("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <input
        type="text"
        placeholder="단어 (영어)"
        value={term}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTerm(e.target.value)
        }
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="뜻 (한글)"
        value={meaning}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMeaning(e.target.value)
        }
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="예문 (선택)"
        value={example}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setExample(e.target.value)
        }
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        단어 추가
      </button>
    </form>
  );
};

export default WordForm;
