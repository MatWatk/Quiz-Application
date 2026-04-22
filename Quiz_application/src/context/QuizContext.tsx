import { useState, createContext, type JSX } from 'react'

import starImage from '../assets/star_icon.png';

type Level = 'Easy' | 'Medium' | 'Hard' | '';

interface gameDataType {
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
    renderStars: (starsToDisplay: number) => JSX.Element[];
    highestScore: highestScoreType;
    setHighestScore: React.Dispatch<React.SetStateAction<highestScoreType>>;
}

interface highestScoreType {
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
    renderStars: () => [],
    highestScore: {
        Easy: 0,
        Medium: 0,
        Hard: 0,
    },
    setHighestScore: () => {},

})

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

    const renderStars = (correctAnswers: number) => {
        let numberOfStars = 0;
                if (correctAnswers >= 9) {
            numberOfStars = 3;
        }
        else if (correctAnswers >= 6) {
            numberOfStars = 2;
        }
                else if (correctAnswers >= 3) {
            numberOfStars = 1;
        }
        else {
            numberOfStars = 0;
        }

        const stars = [];
        for (let i = 0; i < numberOfStars; i++) {
            stars.push(<img key={i} src={starImage} alt="Star image" className='size-20'></img>);
        }
        return stars;
    }

    const contextValue = {
        gameData,
        setGameData,
        renderStars,
        highestScore,
        setHighestScore
    }

    return (
        <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
    )
}