import { useState } from 'react'
import { QuizContext } from './QuizContext';
import type { gameDataType, highestScoreType } from './QuizContext';

export default function QuizContextProvider({ children }: { children: React.ReactNode }) {
    const [gameData, setGameData] = useState<gameDataType>({
        gameStarted: false,
        startCounting: false,
        finishedCounting: false,
        level: '',
        questionNumber: 0,
        correctAnswers: 0,
        gameFinished: false,
        bestScore: 0,
    })
    const [highestScore, setHighestScore] = useState<highestScoreType>({
        Easy: 0,
        Medium: 0,
        Hard: 0,
    })

    const contextValue = {
        gameData,
        setGameData,
        highestScore,
        setHighestScore
    }

    return (
        <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
    )
}