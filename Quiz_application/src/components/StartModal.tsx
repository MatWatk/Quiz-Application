import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import styles from '../styles/styles'
import Score from './Score'

export default function StartModal() {
    const { gameData, setGameData } = useContext(QuizContext)

    const handleStartClick = () => {
        setGameData({ ...gameData, startCounting: true })
    }
    
    return (
        <div className={styles.modalFrame}>
            <div className={styles.modalContent}>
                <h1 className={`${styles.headerTitle}`}>{`${gameData.level} level chosen`}</h1>
                <Score />
                <p className={styles.customText}>Get ready for the quiz! Click the button below to start.</p>
                <button onClick={handleStartClick} className={styles.customButton}>Start Quiz!</button>
                <button onClick={() => setGameData({ ...gameData, level: '', gameStarted: false, startCounting: false })} className={styles.closeButton}>Close</button>
            </div>
        </div>
    )
}