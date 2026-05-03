import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import styles from '../styles/styles'
import Score from './Score'
import Modal from './Modal'

import { checkUnblockedLevels } from '../utils/utils';

export default function StartModal() {
    const { gameData, setGameData, highestScore } = useContext(QuizContext)

    const handleStartClick = () => {
        setGameData({ ...gameData, startCounting: true })
    }

    const { buttonText, disabled } = checkUnblockedLevels(highestScore, gameData.level);

    return (
        <Modal>
            <h1 className={`${styles.headerTitle}`}>{`${gameData.level} level chosen`}</h1>
            <Score />
            {disabled && <p className={styles.customText}>Level not available. Get at least 7 points in the previous level to unlock this one.</p>}
            {!disabled && <p className={styles.customText}>Get ready for the quiz! Click the button below to start.</p>}
            <button onClick={handleStartClick} className={`${disabled ? styles.disabledButton : styles.customButton}`} disabled={disabled}>{buttonText}</button>
            <button onClick={() => setGameData({ ...gameData, level: '', startCounting: false })} className={styles.closeButton}>Close</button>
        </Modal>

    )
}