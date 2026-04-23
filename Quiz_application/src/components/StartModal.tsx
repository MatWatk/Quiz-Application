import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import styles from '../styles/styles'
import Score from './Score'
import Modal from './Modal'

export default function StartModal() {
    const { gameData, setGameData, highestScore } = useContext(QuizContext)

    const handleStartClick = () => {
        setGameData({ ...gameData, startCounting: true })
    }

    let buttonText = 'Start Quiz!';
    let disabled = false;

    if (gameData.level && gameData.level !== 'Easy') {
        if (gameData.level === 'Medium') {
            buttonText = highestScore['Easy'] > 6 ? 'Start Quiz!' : 'Blocked';
            disabled = highestScore['Easy'] <= 6;
        }
        if (gameData.level === 'Hard') {
            buttonText = highestScore['Medium'] > 6 ? 'Start Quiz!' : 'Blocked';
            disabled = highestScore['Medium'] <= 6;
        }
    }

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