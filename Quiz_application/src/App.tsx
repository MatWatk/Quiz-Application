import './App.css'

import StartPage from './components/StartPage'
import QuizContextProvider from './context/QuizContext'

function App() {

  return (
    <QuizContextProvider>
      <StartPage />
    </QuizContextProvider>
  )
}

export default App
