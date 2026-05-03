import { useContext, useMemo, useState, useEffect } from 'react'
import { QuizContext } from '../context/QuizContext'
import styles from '../styles/styles';

import TimeProgressBar from '../components/TimeProgressBar';
import Footer from '../components/Footer';

import { fetchQuestions } from '../api/apiClient';
import { prepareQuestionsData, answerButtonColor } from '../utils/utils';

import type { Level, Question } from '../types/types';

import { useFetchQuestions } from '../hooks/hooks';


export default function QuestionPage() {
    const { gameData, setGameData } = useContext(QuizContext)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);


    const { loading, error, questionsFromAPI } = useFetchQuestions<Level>({ fetchFunction: fetchQuestions, gameLevel: gameData.level, initialData: [] });

    const questions: Question[] = useMemo(() => {
        if (!questionsFromAPI.length) return [];
        const shuffledQuestions = prepareQuestionsData(questionsFromAPI);

        return shuffledQuestions;
    }, [questionsFromAPI]);

    useEffect(() => {
        if (loading || !questionsFromAPI.length) return;
        if (!loading && gameData.questionNumber >= questions.length) {
            setGameData(prevData => ({ ...prevData, gameFinished: true, bestScore: prevData.bestScore > prevData.correctAnswers ? prevData.bestScore : prevData.correctAnswers }))
            return;
        }

        if (selectedAnswer) {
            const timer = setTimeout(() => {
                setGameData(prevData => ({ ...prevData, questionNumber: prevData.questionNumber + 1 }))
                setSelectedAnswer(null);
            }, 2000);

            return () => clearTimeout(timer);
        }

    }, [gameData.questionNumber, selectedAnswer, questions, loading])

    const currentQuestion = questions[gameData.questionNumber];
    const answers = currentQuestion?.answers ?? [];

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
        if (answer === currentQuestion?.correct) {
            setGameData(prevData => ({ ...prevData, correctAnswers: prevData.correctAnswers + 1 }))
        }
    }

    if (loading || !questions.length) {
        return (
            <div className={styles.background}>
                <p className={styles.headerTitle}>Loading...</p>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.background}>
                <p className={styles.headerTitle}>Error: {error}</p>
                <Footer />
            </div>
        );
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
                                className={`${styles.answerButton} ${answerButtonColor(answer, selectedAnswer, currentQuestion)}`}
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