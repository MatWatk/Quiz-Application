import { useEffect, useState, useContext } from "react";

import styles from "../styles/styles";
import Footer from "../components/Footer";
import { QuizContext } from '../context/QuizContext'

export default function CountingPage() {
    const [count, setCount] = useState<number>(3);
    const { gameData, setGameData } = useContext(QuizContext)

    useEffect(() => {
        if (count === -1) {
            setGameData({ ...gameData, startCounting: false, finishedCounting: true });
            return;
        }

        const interval = setInterval(() => {
            setCount(prevCount => prevCount - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [count]);

    return (
        <>
            <div className={styles.background}>
                <div className='flex grow justify-between items-end'>
                    <h1 className='text-3xl font-bold bg-linear-to-b from-purple-200 to-pink-600 bg-clip-text text-transparent'>{count === 0 ? 'Start!' : count}</h1>
                </div>
                <Footer />
            </div>
        </>
    )
}