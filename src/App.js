import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import "./App.css";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [numCorrect, setNumCorrect] = useState(0);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((res) => {
        setQuestions(
          res.results.map((q, index) => ({
            question: q.question,
            answers: shuffleAnswers(q.incorrect_answers, q.correct_answer),
            correct: q.correct_answer,
            completed: false,
            index: index,
          }))
        );
      });
  }, []);

  const handleCorrectSubmit = (e, i) => {
    e.preventDefault();
    alert("Correct!");
    setNumCorrect(numCorrect + 1);
    const questions_copy = questions.map((q) => {
      if (q.index === i) {
        return { ...q, completed: true };
      }
      return q;
    });
    setQuestions(questions_copy);
  };

  const handleWrongSubmit = (e, i) => {
    e.preventDefault();
    alert("Incorrect :(");
    const questions_copy = questions.map((q) => {
      if (q.index === i) {
        return { ...q, completed: true };
      }
      return q;
    });
    setQuestions(questions_copy);
  };

  const shuffleAnswers = (incorrect, correct) => {
    const answerList = incorrect;

    answerList.push(correct);
    for (let i = answerList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answerList[i], answerList[j]] = [answerList[j], answerList[i]];
    }
    return answerList;
  };

  return (
    <div>
      <div>
        <h1 className="numCorrect-Display">{numCorrect} Correct</h1>
      </div>

      {questions.map((question) => (
        <div className="flex-container">
          <div>{question.question}</div>
          {question.answers.map((a) =>
            a === question.correct ? (
              <Button
                color="primary"
                disabled={question.completed}
                onClick={(event) => handleCorrectSubmit(event, question.index)}
              >
                {a}
              </Button>
            ) : (
              <Button
                color="primary"
                disabled={question.completed}
                onClick={(event) => handleWrongSubmit(event, question.index)}
              >
                {a}
              </Button>
            )
          )}
        </div>
      ))}
    </div>
  );
}
