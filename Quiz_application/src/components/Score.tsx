import { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import styles from '../styles/styles';

import { renderStars } from '../utils/utils';

export default function Score() {
    const { gameData, highestScore } = useContext(QuizContext)

    const displayScore = gameData.level === '' ? 0 : highestScore[gameData.level];
    return (
        <>
            <p className={styles.customText}>Your best game score was:</p>
            <p className={styles.customText}>{displayScore} out of 10</p>
            <div className='flex flex-row items-center justify-center gap-2'>
               {renderStars(displayScore)}
            </div>
        </>
    )
}