import { useContext } from 'react'
import { QuizContext } from './context/QuizContext'
import './App.css'

import StartPage from './components/StartPage'
import LevelSelection from './components/LevelSelection'
import StartModal from './components/StartModal'
import CountingPage from './components/CountingPage'
import QuestionPage from './components/QuestionPage'
import FinishModal from './components/FinishModal'

function App() {
  const { gameData } = useContext(QuizContext)

  return (
    <>
      {!gameData.gameStarted && <StartPage />}
      {gameData.gameStarted && !gameData.finishedCounting && <LevelSelection />}
      {gameData.level && !gameData.finishedCounting && <StartModal />}
      {gameData.startCounting && <CountingPage />}
      {gameData.finishedCounting && !gameData.gameFinished && <QuestionPage />}
      {gameData.gameFinished && gameData.gameStarted && gameData.level && <FinishModal />}
    </>
  )
}

export default App
