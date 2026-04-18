import { useState, createContext } from 'react'

export const QuizContext = createContext({
    gameStarted: false,
    setGameStarted: () => {}
})

export default function QuizContextProvider({children}) {
      const [gameStarted, setGameStarted] = useState(false)

      const contextValue = {
        gameStarted,
        setGameStarted
      }

    return(
        <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
    )
}