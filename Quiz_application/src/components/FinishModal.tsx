import { useContext, useEffect, useState } from "react";

import styles from "../styles/styles";
import Modal from "./Modal";
import { QuizContext } from "../context/QuizContext";
import { renderStars } from "../utils/utils";

import goldenCup from '../assets/Golden-Cup-PNG-Photo.png';


export default function FinishModal() {
    const { gameData, setGameData, setHighestScore, highestScore } = useContext(QuizContext)
    const [starsToDisplay, setStarsToDisplay] = useState(0);

    useEffect(() => {
        const stars = renderStars(gameData.correctAnswers);
        const interval = setInterval(() => {
            setStarsToDisplay(prev => {
                if (prev < stars.length) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [gameData.correctAnswers])

    const handleReturnClick = () => {
        const currentLevel = gameData.level === '' ? 'Easy' : gameData.level;
        if(gameData.correctAnswers > highestScore[currentLevel]) {
        setHighestScore(prev => ({ ...prev, [currentLevel]: gameData.correctAnswers }));
        }
        setGameData({ ...gameData, level: '', gameStarted: true, startCounting: false, finishedCounting: false, gameFinished: false, correctAnswers: 0, questionNumber: 0 })
    }

    const levelUnblocked = gameData.level === 'Easy' || (gameData.level === 'Medium' && gameData.correctAnswers > 6) || (gameData.level === 'Hard' && gameData.correctAnswers > 6);
    const nextLevel = gameData.level === 'Easy' ? 'Medium' : gameData.level === 'Medium' ? 'Hard' : 'Retry';

    const displayNewLevelButton = () => {
        if (gameData.level !== '') {
            return highestScore[gameData.level] > 6 && levelUnblocked;
        }
        return false;
    }

    const retryButtonText = gameData.correctAnswers > 6 && gameData.level !== 'Hard'? `Try on ${nextLevel}` : 'Retry Level';



    return (
        <Modal>
            <h1 className={`${styles.headerTitle}`}>Game Finished!</h1>
            {renderStars(gameData.correctAnswers).length === 3 && <p className={styles.customText}>Excellent work! You are a quiz master!</p>}
            <div className='flex flex-row items-center justify-center gap-2'>
                {renderStars(gameData.correctAnswers).slice(0, starsToDisplay)}
            </div>
            <p className={styles.customText}>You got {gameData.correctAnswers} out of 10 correct!</p>
            {displayNewLevelButton() && <p className={styles.customText}>New level unblocked: {nextLevel}!</p>}
             {gameData.correctAnswers > 7 && gameData.level === 'Hard' && <p className={styles.customText}>Congratulations! You are a quiz master!</p>}
            {gameData.correctAnswers > 7 && gameData.level === 'Hard' && <img src={goldenCup} alt="Golden Cup" className="w-30 h-30" />}
            <button onClick={handleReturnClick} className={`${styles.customButton} shrink-0 mb-4`}>{retryButtonText}</button>


        </Modal>
    )
}