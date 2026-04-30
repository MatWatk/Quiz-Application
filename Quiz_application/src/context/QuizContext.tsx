import { createContext } from 'react'

export type Level = 'Easy' | 'Medium' | 'Hard' | '';


export interface gameDataType {
    gameStarted: boolean
    startCounting: boolean;
    finishedCounting: boolean;
    level: Level;
    questionNumber: number;
    correctAnswers: number;
    gameFinished: boolean;
    bestScore: number;
}

interface quizContextType {
    gameData: gameDataType;
    setGameData: React.Dispatch<React.SetStateAction<gameDataType>>;
    highestScore: highestScoreType;
    setHighestScore: React.Dispatch<React.SetStateAction<highestScoreType>>;
}

export interface highestScoreType {
    Easy: number;
    Medium: number;
    Hard: number;
}

export const QuizContext = createContext<quizContextType>({
    gameData: {
        gameStarted: false,
        startCounting: false,
        finishedCounting: false,
        level: '',
        questionNumber: 0,
        correctAnswers: 0,
        gameFinished: false,
        bestScore: 0,
    },
    setGameData: () => { },
    highestScore: {
        Easy: 0,
        Medium: 0,
        Hard: 0,
    },
    setHighestScore: () => {},

})

