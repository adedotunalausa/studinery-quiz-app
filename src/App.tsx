import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard'
import { getQuizQuestions } from './API'
import {Difficulty} from "./API"

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(getQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));
  

  const startTriviaHandler = async () => {
    
  }

  const checkAnswerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestionHandler = () => {

  }

  return (
    <div className="App">
      <h1>Science Quiz</h1>
      <button className="start" onClick={startTriviaHandler}>
        Start
      </button>
      <p className="score">Score: </p>
      <p>Loading Questions...</p>
      {/* <QuestionCard
        questionNumber={questionNumber + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[questionNumber].question}
        answers={questions[questionNumber].answers}
        userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
        callback={checkAnswerHandler}
      /> */}
      <button className="next" onClick={nextQuestionHandler}>
        Next
      </button>
    </div>
  );
}

export default App;
