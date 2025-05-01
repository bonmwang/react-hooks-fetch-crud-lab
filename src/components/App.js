// App.js
import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const response = await fetch('http://localhost:4000/questions');
    const data = await response.json();
    setQuestions(data);
  };

  const handleNewQuestion = async (formData) => {
    const response = await fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: [
          formData.answer1,
          formData.answer2,
          formData.answer3,
          formData.answer4,
        ],
        correctIndex: parseInt(formData.correctIndex),
      }),
    });
    const newQuestion = await response.json();
    setQuestions([...questions, newQuestion]);
    setShowForm(false);
  };

  const handleDeleteQuestion = async (id) => {
    await fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    });
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const handleUpdateCorrectIndex = async (id, correctIndex) => {
    const response = await fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex }),
    });
    const updatedQuestion = await response.json();
    setQuestions(
      questions.map((question) =>
        question.id === id ? updatedQuestion : question
      )
    );
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'View Questions' : 'New Question'}
      </button>
      {showForm ? (
        <QuestionForm onSubmit={handleNewQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={handleDeleteQuestion}
          onUpdateCorrectIndex={handleUpdateCorrectIndex}
        />
      )}
    </div>
  );
}

export default App;