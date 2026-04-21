import { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import styles from '../styles/styles';

export default function Score() {
    const { gameData, renderStars, assignStars } = useContext(QuizContext)
    return (
        <>
            <p className={styles.customText}>Your best game score was:</p>
            <p className={styles.customText}>{gameData.bestScore} out of 10</p>
            <div className='flex flex-row items-center justify-center gap-2'>
               {renderStars(assignStars(gameData.bestScore))}
            </div>
        </>
    )
}