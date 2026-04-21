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
    countingStarted: boolean;
    setCountingStarted: React.Dispatch<React.SetStateAction<boolean>>;
    gameData: gameDataType;
    setGameData: React.Dispatch<React.SetStateAction<gameDataType>>;
    renderStars: (starsToDisplay: number) => JSX.Element[];
    assignStars: (correctAnswers: number) => number;

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
        gameFinished: false,
        bestScore: 0,
    },
    setGameData: () => { },
    renderStars: () => [],
    assignStars: () => 0

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

    const [countingStarted, setCountingStarted] = useState<boolean>(false)

    const assignStars = (correctAnswers: number) => {
        if (correctAnswers >= 9) {
            return (3);
        }
        else if (correctAnswers >= 6) {
            return (2);
        }
                else if (correctAnswers >= 3) {
            return (1);
        }
        else {
            return (0);
        }
    }

    const renderStars = (numberOfStars: number) => {
        // let numberOfStars = 0;
        //         if (correctAnswers >= 9) {
        //     numberOfStars = 3;
        // }
        // else if (correctAnswers >= 6) {
        //     numberOfStars = 2;
        // }
        //         else if (correctAnswers >= 3) {
        //     numberOfStars = 1;
        // }
        // else {
        //     numberOfStars = 0;
        // }

        const stars = [];
        for (let i = 0; i < numberOfStars; i++) {
            stars.push(<img key={i} src={starImage} alt="Star image" className='size-20'></img>);
        }
        return stars;
    }

    const contextValue = {
        gameData,
        countingStarted,
        setCountingStarted,
        setGameData,
        renderStars,
        assignStars,
    }


    return (
        <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
    )
}