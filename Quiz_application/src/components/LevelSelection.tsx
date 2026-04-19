import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'

import styles from '../styles/styles'
import Footer from './Footer'

export default function LevelSelection() {
    const { gameData, setGameData } = useContext(QuizContext)

    return (

        <div className={styles.background}>
            <h1 className={styles.headerTitle}>Level Selection</h1>
            <p className={styles.customText}>Select your difficulty level:</p>
            <button className={styles.customButton} onClick={() => setGameData({ ...gameData, level: 'Easy' })}>Easy</button>
            <button className={styles.customButton} onClick={() => setGameData({ ...gameData, level: 'Medium' })}>Medium</button>
            <button className={styles.customButton} onClick={() => setGameData({ ...gameData, level: 'Hard' })}>Hard</button>
        <Footer />
        </div>

    )
}