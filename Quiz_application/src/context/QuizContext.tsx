import { useState, createContext } from 'react'

interface gameDataType {
    gameStarted: boolean
    startCounting: boolean;
    finishedCounting: boolean;
    level: string;
    questionNumber: number;
    correctAnswers: number;
}
interface quizContextType {
    countingStarted: boolean;
    setCountingStarted: React.Dispatch<React.SetStateAction<boolean>>;
    gameData: gameDataType;
    setGameData: React.Dispatch<React.SetStateAction<gameDataType>>;
}


export const QuizContext = createContext<quizContextType>({
    countingStarted: false,
    setCountingStarted: () => { },
    gameData: {
        gameStarted: false,
        startCounting: false,
        finishedCounting: false,
        level: '',
        questionNumber: 0,
        correctAnswers: 0,
    },
    setGameData: () => { },
})

export default function QuizContextProvider({ children }: { children: React.ReactNode }) {
    const [gameData, setGameData] = useState<gameDataType>({
        gameStarted: false,
        startCounting: false,
        finishedCounting: false,
        level: '',
        questionNumber: 0,
        correctAnswers: 0,
    })

    const [countingStarted, setCountingStarted] = useState<boolean>(false)

    const contextValue = {
        gameData,
        countingStarted,
        setCountingStarted,
        setGameData
    }

    return (
        <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
    )
}