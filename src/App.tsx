import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard'
import { getQuizQuestions } from './API'
import { QuestionState, Difficulty } from "./API"

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);
  

  const startTriviaHandler = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await getQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionNumber(0);
    setLoading(false);
  }

  const checkAnswerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // Users answer
      const answer = e.currentTarget.value;
      // check answer against the correct value
      const correct = questions[questionNumber].correct_answer === answer;
      if (correct) setScore(prevScore => prevScore + 1);
      // Save answer in the array
      const answerObject = {
        question: questions[questionNumber].question,
        answer,
        correct,
        correctAnswer: questions[questionNumber].correct_answer
      };
      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuestionHandler = () => {
    // move on to next question if not last
    const nextQuestion = questionNumber + 1;
    
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionNumber(nextQuestion);
    }
  }

  return (
    <div className="App">
      <h1>Science Quiz</h1>
      {
        gameOver || userAnswers.length === TOTAL_QUESTIONS ?
          <button className="start" onClick={startTriviaHandler}>
        Start
      </button> : null
      }
      { !gameOver && <p className="score">Score: </p>}
      {loading && <p>Loading Questions...</p>}
      {
        !loading && !gameOver ?
          <QuestionCard
        questionNumber={questionNumber + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[questionNumber].question}
        answers={questions[questionNumber].answer}
        userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
        callback={checkAnswerHandler}
      /> : null
      }
      {
        !loading && !gameOver &&
        userAnswers.length === questionNumber + 1 && questionNumber !== TOTAL_QUESTIONS -1 ?
          (
            <button className="next" onClick={nextQuestionHandler}>
        Next Question
      </button>
        ) : null
      }
    </div>
  );
}

export default App;
