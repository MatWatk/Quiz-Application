import { useState, createContext } from 'react'

export const QuizContext = createContext<{
    gameStarted: boolean;
    setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
    chosenLevel: string;
    setChosenLevel: React.Dispatch<React.SetStateAction<string> >;
    countingStarted: boolean;
    setCountingStarted: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    gameStarted: false,
    setGameStarted: () => {},
    chosenLevel: '',
    setChosenLevel: () => {},
    countingStarted: false,
    setCountingStarted: () => {},

})

export default function QuizContextProvider({children }: {children: React.ReactNode}) {
      const [gameStarted, setGameStarted] = useState<boolean>(false)
      const [chosenLevel, setChosenLevel] = useState<string>('')
      const [countingStarted, setCountingStarted] = useState<boolean>(false)

      const contextValue = {
        gameStarted,
        setGameStarted,
        chosenLevel,
        setChosenLevel,
        countingStarted,
        setCountingStarted
      }

    return(
        <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
    )
}