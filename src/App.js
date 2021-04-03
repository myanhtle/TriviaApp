import React, { useState, useEffect } from "react";

export default function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setQuestions(res.results);
      });
  }, []);

  const handleCorrectSubmit = e => {
    alert('Correct!');
  }

  const handleWrongSubmit = e => {
    alert('Incorrect. Try Again.')
  }

  return (
    <div>
      {questions.map((question) => (
        <ul>
          <div>
           {question.question} 
          </div>
          <div>
            {question.incorrect_answers.map(ans => <button type='submit' onClick={handleWrongSubmit}>{ans}</button>)}
            <button type='submit' onClick={handleCorrectSubmit}>{question.correct_answer}</button>
          </div>
        </ul>
      ))}
    </div>
  );
}