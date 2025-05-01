// QuestionItem.js
import React, { useState } from 'react';

function QuestionItem({ question, onDelete, onUpdateCorrectIndex }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedCorrectIndex, setSelectedCorrectIndex] = useState(correctIndex);

  const handleCorrectIndexChange = (e) => {
    const newCorrectIndex = parseInt(e.target.value);
    setSelectedCorrectIndex(newCorrectIndex);
    onUpdateCorrectIndex(id, newCorrectIndex);
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          value={selectedCorrectIndex}
          onChange={handleCorrectIndexChange}
        >
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => onDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;