import { useContext, useMemo, useState, useEffect } from 'react'
import { QuizContext } from '../context/QuizContext'
import questionsData from '../data/questions.json'
import styles from '../styles/styles';

import TimeProgressBar from '../components/TimeProgressBar';
import Footer from '../components/Footer';

interface Question {
    question: string;
    answers: string[];
    correct: string;
}

export default function QuestionPage() {
    const { gameData, setGameData } = useContext(QuizContext)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const questions: Question[] = useMemo(() => {
        if (!gameData.level) return [];

        const arr = [...questionsData[gameData.level]];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr;
    }, [gameData.level]);

    const currentQuestion = questions[gameData.questionNumber];
    const answers = currentQuestion?.answers ?? [];

    useEffect(() => {
        if (gameData.questionNumber >= questions.length) {
            setGameData(prevData => ({ ...prevData, gameFinished: true, bestScore: prevData.bestScore > prevData.correctAnswers ? prevData.bestScore : prevData.correctAnswers }))
            console.log(gameData)
            return;
        }

        if (selectedAnswer) {
            const timer = setTimeout(() => {
                setGameData(prevData => ({ ...prevData, questionNumber: prevData.questionNumber + 1 }))
                setSelectedAnswer(null);
            }, 2000);

            return () => clearTimeout(timer);
        }

    }, [gameData.questionNumber, selectedAnswer])


    const answerButtonColor = (answer: string) => {
        if (answer !== selectedAnswer) return 'bg-gray-300';
        if (answer === currentQuestion?.correct) return 'bg-green-500 disabled:hover:bg-green-500';
        return 'bg-red-500 disabled:hover:bg-red-500';
    }

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);


        if (answer === currentQuestion?.correct) {
            setGameData(prevData => ({ ...prevData, correctAnswers: prevData.correctAnswers + 1 }))
        }
    }

    return (

        <div className={styles.background}>
            <h1 className={styles.headerTitle}>Question {gameData.questionNumber + 1}</h1>
            <TimeProgressBar isAnswered={!!selectedAnswer} />
            <div className='my-4'>
                <p className={styles.customText}>{currentQuestion?.question}</p>
                <div className='items-center justify-center my-4'>
                    <div className='grid grid-cols-2'>
                        {answers.map((answer, index) => (
                            <button
                                key={`${gameData.questionNumber}-${index}-${answer}`}
                                onClick={() => handleAnswerClick(answer)}
                                disabled={!!selectedAnswer}
                                className={`${styles.answerButton} ${answerButtonColor(answer)}`}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}