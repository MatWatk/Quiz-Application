import { useContext } from 'react'
import { QuizContext } from '../context/QuizContext'
import bulbImage from '../assets/bulb_image.png'

export default function StartPage() {
  const { gameStarted, setGameStarted } = useContext(QuizContext)

  return (
    <div className='flex flex-col items-center bg-linear-to-b from-purple-800 via-purple-900 to-red-950 w-screen h-screen fixed inset-0 overflow-auto'>
      <h1 className='text-2xl font-bold mb-4 bg-linear-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent'>Quiz Application</h1>
      <img src={bulbImage} alt="Bulb" className='w-1/6 h-1/4 min-w-44 min-h-42'/>
      <p className='text-lg text-gray-300 py-2'>Let's see how good is your general knowledge...</p>
      <button onClick={() => setGameStarted(true)} className='bg-gray-300 hover:bg-gray-400 hover:text-purple-600 text-purple-800 text-xl font-bold rounded my-8 w-1/4 h-1/8 py-3 min-w-36'>Start Game!</button>
      <div className='flex grow justify-center items-end'>
      <p className='text-red-900 text-shadow-xs'>Author M. Watkowski</p>
      </div>
    </div>
  )
}