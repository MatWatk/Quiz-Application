import { useContext } from 'react'
import { QuizContext } from './context/QuizContext'
import './App.css'

import StartPage from './components/StartPage'
import LevelSelection from './components/LevelSelection'
import StartModal from './components/StartModal'
import CountingPage from './components/CountingPage'
import QuestionPage from './components/QuestionPage'

function App() {
  const { gameData } = useContext(QuizContext)

  return (
    <>
      {!gameData.gameStarted && <StartPage />}
      {gameData.gameStarted && !gameData.finishedCounting && <LevelSelection />}
      {gameData.level && !gameData.finishedCounting && <StartModal />}
      {gameData.startCounting && <CountingPage />}
      {gameData.finishedCounting && !gameData.gameFinished && <QuestionPage />}
      {gameData.gameFinished && <h1 className='text-4xl font-bold text-center mt-10'>Game Finished! You got {gameData.correctAnswers} out of 10 correct!</h1>}
    </>
  )
}

export default App
