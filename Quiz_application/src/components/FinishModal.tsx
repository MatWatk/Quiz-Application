import { useContext, useEffect, useState } from "react";

import styles from "../styles/styles";
import Modal from "./Modal";
import { QuizContext } from "../context/QuizContext";


export default function FinishModal() {
    const { gameData, renderStars, setGameData, assignStars } = useContext(QuizContext)
    const [starsToDisplay, setStarsToDisplay] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStarsToDisplay(prev => {
                const stars = assignStars(gameData.correctAnswers);
                if (prev < stars) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [starsToDisplay])



    return (
        <Modal>
            <h1 className={`${styles.headerTitle}`}>Game Finished!</h1>
            {assignStars(gameData.correctAnswers) === 3 && <p className={styles.customText}>Excellent work! You are a quiz master!</p>}
            <div className='flex flex-row items-center justify-center gap-2'>
                {renderStars(starsToDisplay)}
            </div>
            <p className={styles.customText}>You got {gameData.correctAnswers} out of 10 correct!</p>
            <button onClick={() => setGameData({ ...gameData, level: '', gameStarted: false, startCounting: false, finishedCounting: false, gameFinished: false, correctAnswers: 0 })} className={styles.closeButton}>Return</button>

        </Modal>
    )
}