import { useContext, useEffect } from 'react'
import { QuizContext } from './context/QuizContext'
import './App.css'

import StartPage from './components/StartPage'
import LevelSelection from './components/LevelSelection'
import StartModal from './components/StartModal'
import CountingPage from './components/CountingPage'

function App() {
  const { gameStarted, chosenLevel, countingStarted } = useContext(QuizContext)

  useEffect(() => {
    console.log('gameStarted zmienił się na:', gameStarted)
  }, [gameStarted])

  return (
    <>
      {!gameStarted && <StartPage />}
      {gameStarted && <LevelSelection />}
      {chosenLevel && <StartModal />}
      {countingStarted && <CountingPage />}
    </>
  )
}

export default App
