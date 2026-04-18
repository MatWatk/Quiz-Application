import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import bulbImage from '../assets/bulb_image.png'
import styles from '../styles/styles'
import Footer from './Footer'

export default function StartPage() {
  const { setGameStarted } = useContext(QuizContext)

  return (
    <div className={styles.background}>
      <h1 className={styles.headerTitle}>Quiz Application</h1>
      <img src={bulbImage} alt="Bulb" className='w-1/6 h-1/4 min-w-44 min-h-42' />
      <p className={styles.customText}>Let's see how good is your general knowledge...</p>
      <button onClick={() => setGameStarted(true)} className={styles.customButton}>Start Game!</button>
      <Footer />
    </div>
  )
}