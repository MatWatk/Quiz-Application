import { useContext, useEffect, useState } from "react";

import styles from "../styles/styles";
import Modal from "./Modal";
import { QuizContext } from "../context/QuizContext";


export default function FinishModal() {
    const { gameData, renderStars, setGameData, setHighestScore, highestScore } = useContext(QuizContext)
    const [starsToDisplay, setStarsToDisplay] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStarsToDisplay(prev => {
                const stars = renderStars(gameData.correctAnswers);
                if (prev < stars.length) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [starsToDisplay])

    const handleReturnClick = () => {
        setHighestScore(prev => ({...prev, [gameData.level]: gameData.correctAnswers}));
        setGameData({ ...gameData, level: '', gameStarted: true, startCounting: false, finishedCounting: false, gameFinished: false, correctAnswers: 0, questionNumber: 0 })
    }

    const levelUnblocked = gameData.level === 'Easy' || (gameData.level === 'Medium' && gameData.correctAnswers > 6) || (gameData.level === 'Hard' && gameData.correctAnswers > 6);
    const nextLevel = gameData.level === 'Easy' ? 'Medium' : gameData.level === 'Medium' ? 'Hard' : null;

    const displayNewLevelButton = () => {
        if (gameData.level !== '') {
        return highestScore[gameData.level] > 6 && levelUnblocked;
        }
        return false;
    }

    const retryButtonText = gameData.correctAnswers > 6 ? `Try on ${nextLevel}` : 'Retry Level';



    return (
        <Modal>
            <h1 className={`${styles.headerTitle}`}>Game Finished!</h1>
            {renderStars(gameData.correctAnswers).length === 3 && <p className={styles.customText}>Excellent work! You are a quiz master!</p>}
            <div className='flex flex-row items-center justify-center gap-2'>
                {renderStars(gameData.correctAnswers).slice(0, starsToDisplay)}
            </div>
            <p className={styles.customText}>You got {gameData.correctAnswers} out of 10 correct!</p>
            {displayNewLevelButton() && <p className={styles.customText}>New level unblocked: {nextLevel}!</p>}
            <button onClick={handleReturnClick} className={`${styles.customButton} shrink-0 mb-4`}>{retryButtonText}</button>

        </Modal>
    )
}