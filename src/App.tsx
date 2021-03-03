import React, {useState} from 'react';
import QuestionCard from './components/QuestionCard'
import {fetchQuizQuestions} from './components/APIs'

// Types
import {Difficulty} from './components/APIs'

const TOTAL_QUESTIONS = 10

const  App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY ))

  const  startTrivia = async () => {

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }
  
  const nextQuestion = () => {

  }
  return (
    <div className="App">
      <h1>React Quiz</h1>
      <button className="start" onClick={startTrivia}>
        Start
      </button>
      <p className="score">Score:</p>
      <p>Loading Questions</p>
      {/* <QuestionCard 
        questionNumber={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answer={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      /> */}
      <button className="next" onClick={nextQuestion}></button>
    </div>
  );
}

export default App;
