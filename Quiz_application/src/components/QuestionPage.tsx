import { useContext, useMemo, useState, useEffect } from 'react'
import { QuizContext } from '../context/QuizContext'
import questionsData from '../data/questions.json'
import styles from '../styles/styles';

import TimeProgressBar from './TimeProgressBar';
import Footer from './Footer';

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


    const answerButtonColor = (usersAnswer: string, currentAnswer: string) => {
        if (currentAnswer === selectedAnswer) {
            if (usersAnswer === questions[gameData.questionNumber]?.correct && usersAnswer === currentAnswer) return 'bg-green-500 disabled:hover:bg-green-500';
            if (usersAnswer !== questions[gameData.questionNumber]?.correct && usersAnswer === currentAnswer) return 'bg-red-500 disabled:hover:bg-red-500';
        }
        else {
            return 'bg-gray-300';
        }
    }

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);


        if (answer === questions[gameData.questionNumber]?.correct) {
            setGameData(prevData => ({ ...prevData, correctAnswers: prevData.correctAnswers + 1 }))
        }
    }

    return (

        <div className={styles.background}>
            <h1 className={styles.headerTitle}>Question {gameData.questionNumber + 1}</h1>
            <TimeProgressBar isAnswered={!!selectedAnswer} />
            <div className='my-4'>
                <p className={styles.customText}>{questions[gameData.questionNumber]?.question}</p>
                <div className='items-center justify-center my-4'>
                    <div className='flex flex-row'>
                        <button onClick={() => handleAnswerClick(questions[gameData.questionNumber]?.answers[0])} disabled={!!selectedAnswer} className={`${styles.answerButton} ${answerButtonColor(questions[gameData.questionNumber]?.answers[0] || '', questions[gameData.questionNumber]?.answers[0])}`}>{questions[gameData.questionNumber]?.answers[0]}</button>
                        <button onClick={() => handleAnswerClick(questions[gameData.questionNumber]?.answers[1])} disabled={!!selectedAnswer} className={`${styles.answerButton} ${answerButtonColor(questions[gameData.questionNumber]?.answers[1] || '', questions[gameData.questionNumber]?.answers[1])}`}>{questions[gameData.questionNumber]?.answers[1]}</button>
                    </div>
                    <div className='flex flex-row'>
                        <button onClick={() => handleAnswerClick(questions[gameData.questionNumber]?.answers[2])} disabled={!!selectedAnswer} className={`${styles.answerButton} ${answerButtonColor(questions[gameData.questionNumber]?.answers[2] || '', questions[gameData.questionNumber]?.answers[2])}`}>{questions[gameData.questionNumber]?.answers[2]}</button>
                        <button onClick={() => handleAnswerClick(questions[gameData.questionNumber]?.answers[3])} disabled={!!selectedAnswer} className={`${styles.answerButton} ${answerButtonColor(questions[gameData.questionNumber]?.answers[3] || '', questions[gameData.questionNumber]?.answers[3])}`}>{questions[gameData.questionNumber]?.answers[3]}</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}