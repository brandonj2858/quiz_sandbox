import React, { useEffect, useState } from 'react';
import quizzes from '../data/quizzes';
import messages, { getMessage } from '../data/messages.js';

const Homepage = () => {
  const [quiz, setQuiz] = useState();
  const [selectedTest, setSelectedTest] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    randomizeAnswers();
  });

  const randomizeAnswers = () => {
    let answers =
      quizzes[selectedTest].questions[currentQuestion].incorrectAnswers;
    answers.push(
      quizzes[selectedTest].questions[currentQuestion].correctAnswer,
    );

    answers.forEach(
      (elem, i, arr, j = getRandomValue(i, arr.length)) =>
        ([arr[i], arr[j]] = [arr[j], arr[i]]),
    );

    setOptions(answers);
  };

  const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i);

  // Shuffle a pair of two elements at random position j

  return (
    <div>
      <h1>{quizzes[selectedTest].title}</h1>

      <div className="question-div">
        {quizzes[selectedTest].questions[0].text}
      </div>

      <div className="answer-div">
        <li className="options-li"> {options[0]} </li>
        <li className="options-li"> {options[1]}</li>
        <li className="options-li"> {options[2]}</li>
        <li className="options-li"> {options[3]}</li>
      </div>
    </div>
  );
};

export default Homepage;
