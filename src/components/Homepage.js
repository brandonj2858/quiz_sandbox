import React, { useEffect, useState } from 'react';
import quizzes from '../data/quizzes';
import Summary from './Summary';

const Homepage = () => {
  const [quiz, setQuiz] = useState();
  const [selectedTest, setSelectedTest] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [marked, setMarked] = useState();
  const [matching, setMatching] = useState('');
  const [quest, setQuest] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [count, setCount] = useState(1);
  const [newTest, setNewTest] = useState(false);

  useEffect(() => {
    //setOptions();
    randomizeAnswers();
  }, []);

  useEffect(() => {
    if (newTest === true) {
      randomizeAnswers();
      setNewTest(false);
      console.log('hit');
    }
  }, [selectedTest]);

  const randomizeAnswers = () => {
    var answers = '';
    //setOptions();
    console.log(quizzes[selectedTest]);
    answers = quizzes[selectedTest].questions[currentQuestion].incorrectAnswers;

    answers.push(
      quizzes[selectedTest].questions[currentQuestion].correctAnswer,
    );

    let unique = [...new Set(answers)];
    unique.forEach(
      (elem, i, arr, j = getRandomValue(i, arr.length)) =>
        ([arr[i], arr[j]] = [arr[j], arr[i]]),
    );
    unique.forEach((ele) => {
      console.log(ele);
    });

    setOptions(unique);
    console.log(options + ' options');
    console.log(unique + ' unique');
  };

  const getRandomValue = (i, N) => Math.floor(Math.random() * (N - i) + i);

  const handleSelect = (evt) => {
    if (marked) {
      console.log('already marked');
    }
    if (
      evt.target.innerText ===
      quizzes[selectedTest].questions[currentQuestion].correctAnswer
    ) {
      evt.target.style.border = '1px green solid';

      let newScore = score + 1;
      setCurrentQuestion(currentQuestion + 1);
      setScore(newScore);
      setMarked(true);
      setMatching('Correct!');
    } else {
      evt.target.style.border = '1px red solid';
      evt.target.style.textDecoration = 'line-through';
      setCurrentQuestion(currentQuestion + 1);
      setMarked(true);
      setMatching('Incorrect...');
    }
  };

  const handleNext = (evt) => {
    if (quest < quizzes[selectedTest].questions.length - 1) {
      setQuest(quest + 1);
      setMarked(false);
      setOptions();
      setMatching();

      randomizeAnswers();
    } else {
      setMatching();
      setCurrentQuestion(0);
      setQuest(0);
      setOptions();

      setMarked(false);
      setShowSummary(true);
    }

    document.querySelectorAll('.options-li').forEach((el) => {
      el.style.border = '';
      el.style.textDecoration = '';
    });
  };

  const retake = () => {
    setMarked();
    setScore(0);
    setCount(count + 1);
    setOptions();
    setShowSummary(false);
    randomizeAnswers();
  };

  const setTest = () => {
    let newTest = selectedTest - 1;

    setSelectedTest(newTest);
  };

  const nextTest = () => {
    if (quizzes[selectedTest + 1] === undefined) {
      setTest();
      setNewTest(true);
      setMarked();
      randomizeAnswers();
      setShowSummary(false);
      setCount(1);

      console.log(selectedTest, 'here');
    } else {
      setSelectedTest(selectedTest + 1);
      setNewTest(true);
      setMarked();
      //setOptions();
      setScore(0);

      randomizeAnswers();

      setShowSummary(false);
    }
    console.log(selectedTest - 1);
  };

  return (
    <div className="main-contain">
      <h1>{quizzes[selectedTest].title}</h1>

      <div className="question-div">
        {showSummary === false ? (
          quizzes[selectedTest].questions[quest].text
        ) : (
          <Summary
            setTest={setTest}
            score={score}
            count={count}
            retake={retake}
            nextTest={nextTest}
            testLength={quizzes[selectedTest].questions.length}
          />
        )}
      </div>

      <div className="answer-div">
        {showSummary === false && options !== undefined
          ? options.map((option) => {
              return (
                <li
                  onClick={!marked ? handleSelect : null}
                  key={option}
                  className="options-li"
                  style={{ border: '' }}
                >
                  {option}
                </li>
              );
            })
          : null}
      </div>
      {marked ? (
        <div>
          <p className="marking"> {matching} </p>
          <div className="next-div" onClick={handleNext}>
            Next{' '}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Homepage;
