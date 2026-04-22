import { useContext, useEffect, useState } from "react";

import styles from "../styles/styles";
import Modal from "./Modal";
import { QuizContext } from "../context/QuizContext";


export default function FinishModal() {
    const { gameData, renderStars, setGameData, setHighestScore } = useContext(QuizContext)
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
        setGameData({ ...gameData, level: '', gameStarted: false, startCounting: false, finishedCounting: false, gameFinished: false, correctAnswers: 0, questionNumber: 0 })
    }



    return (
        <Modal>
            <h1 className={`${styles.headerTitle}`}>Game Finished!</h1>
            {renderStars(gameData.correctAnswers).length === 3 && <p className={styles.customText}>Excellent work! You are a quiz master!</p>}
            <div className='flex flex-row items-center justify-center gap-2'>
                {renderStars(gameData.correctAnswers).slice(0, starsToDisplay)}
            </div>
            <p className={styles.customText}>You got {gameData.correctAnswers} out of 10 correct!</p>
            <button onClick={handleReturnClick} className={styles.closeButton}>Return</button>

        </Modal>
    )
}