import React from 'react'

type Props = {
    question: string;
    answer: string[]
    callback: any
    userAnswer: any
    questionNumber: number
    totalQuestions: number
}

 const QuestionCard: React.FC<Props> = ({question, answer, callback, userAnswer, questionNumber, totalQuestions}) => {
    return (
        <>
            <p className="number">
                Question: {questionNumber} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{__html: question}}></p>
            <div>
                {answer.map(answer => (
                    <div>
                        <button disabled={userAnswer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html: answer}}></span>
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}


export default QuestionCard