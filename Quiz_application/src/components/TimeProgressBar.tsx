import { useState, useEffect, useContext } from 'react'
import { QuizContext } from '../context/QuizContext';

export default function TimeProgressBar({isAnswered}: {isAnswered?: boolean}) {
    const { gameData, setGameData } = useContext(QuizContext);
    const [timeForAnswer, setTimeForAnswer] = useState(0);

    const timeLimit = 150; 
    useEffect(() => {
        if (isAnswered){
            setTimeForAnswer(0);
        }
        const timer= setInterval(() => {
            if(timeForAnswer >= timeLimit && !gameData.gameFinished) {
                setGameData(prevData => ({ ...prevData, questionNumber: prevData.questionNumber + 1 }))
                setTimeForAnswer(0);
                return;
            }
            if(gameData.gameFinished){
                clearInterval(timer);
                return;
            }
            setTimeForAnswer(prev => prev + 1);
        }, 100);
        return () => clearInterval(timer);
    }, [timeForAnswer, isAnswered, gameData.questionNumber])
    return (
        <div className='w-3/4 h-6 bg-linear-to-r from-gray-400 to-gray-600 border-2 border-black rounded-4xl items-center justify-left flex'>
            <div className='h-full bg-linear-to-r from-green-600 via-yellow-500 to-red-700 rounded-4xl transition-all duration-300 bg-size-[800%]' style={{ width: `${timeForAnswer * (100/timeLimit)}%`, backgroundPosition: `${timeForAnswer * (100/timeLimit)}% 0%`, }}></div>
        </div>
    )
}