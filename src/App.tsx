import React, {useState} from 'react';
import QuestionCard from './components/QuestionCard'
import './App.css'
import {fetchQuizQuestions, QuestionState} from './components/APIs'

// Types
import {Difficulty} from './components/APIs'
// Styles
import {GlobalStyle, Wrapper} from './App.styles'

export interface AnswerObject  {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10

const  App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  

  const  startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS,  Difficulty.EASY)

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setLoading(false)
    setNumber(0)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      // user answer
      const answer = e.currentTarget.value
      // check answer against correct answer
      const correct = questions[number].correct_answer === answer
      // Add score if sanswer is correct
      if(correct) setScore(prev => prev +1 )
      // save answer on the array for useranswers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer:  questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }
  
  const nextQuestion = () => {
    // Move ont to the next question if not the last question
    const nextQuestion = number + 1
    
    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    }else {
      setNumber(nextQuestion)
    }
  }
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <div className="App">
          <h1>REACT QUIZ</h1>
          {gameOver || userAnswers.length === TOTAL_QUESTIONS ? 
             <div style={{textAlign: 'center'}}>
                <button className="start" onClick={startTrivia}>
                Start
              </button>
              </div>
            : null
          }
          {!gameOver ?  <p className="score">Score: {score}</p> : null}
          {loading && <p>Loading Questions... </p> }
          
          {!loading && !gameOver && (
            <QuestionCard 
                questionNumber={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
              />
          )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
         <div style={{textAlign: 'center'}}>
            <button className="next" onClick={nextQuestion}>Next</button>
         </div>
        ) : null}
          
        </div>
      </Wrapper>
    </>
  );
}

export default App;
