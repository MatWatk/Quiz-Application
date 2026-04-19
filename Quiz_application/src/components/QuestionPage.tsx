import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import questionsData from '../data/questions.json'
import styles from '../styles/styles';

interface Question {
    question: string;
    answers: string[];
    correct: string;
}

interface QuizData {
    easy: Question[];
    medium: Question[];
    hard: Question[];
}

export default function QuestionPage() {
    const { gameData } = useContext(QuizContext)

    const questions : QuizData = questionsData;

    return (

        <div className={styles.background}>
            <h1 className={styles.headerTitle}>Question {gameData.questionNumber + 1}</h1>
        </div>
    )
}