import { useState, useEffect, useContext } from 'react'
import { QuizContext } from '../context/QuizContext';

export default function TimeProgressBar({ isAnswered }: { isAnswered?: boolean }) {
    const { gameData, setGameData } = useContext(QuizContext);
    const [timeForAnswer, setTimeForAnswer] = useState(0);

    const timeLimit = 150;

    useEffect(() => {
        setTimeForAnswer(0);
    }, [gameData.questionNumber])

    useEffect(() => {
        if (gameData.gameFinished || isAnswered) return;
        const timer = setInterval(() => {
            setTimeForAnswer(prev => prev + 1)
        }, 100)
        return () => clearInterval(timer)
    }, [gameData.gameFinished, isAnswered])

    useEffect(() => {
        if (timeForAnswer < timeLimit && !gameData.gameFinished) return;
        setGameData(prevData => ({ ...prevData, questionNumber: prevData.questionNumber + 1 }))

    }, [timeForAnswer, gameData.gameFinished])

    return (
        <div className='w-3/4 h-4 bg-linear-to-r from-gray-400 to-gray-600 border-2 border-black rounded-4xl items-center justify-left flex'>
            <div className='h-full bg-linear-to-r from-green-600 via-yellow-500 to-red-700 rounded-4xl transition-all duration-300 bg-size-[800%]' style={{ width: `${timeForAnswer * (100 / timeLimit)}%`, backgroundPosition: `${timeForAnswer * (100 / timeLimit)}% 0%`, }}></div>
        </div>
    )
}