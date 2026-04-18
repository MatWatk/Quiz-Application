import starImage from '../assets/star_icon.png';
import styles from '../styles/styles';

export default function Score() {
    return (
        <>
            <p className={styles.customText}>Your best game score was:</p>
            <div className='flex flex-row items-center justify-center gap-2'>
                <img src={starImage} alt="Star image" className='size-20'></img>
                <img src={starImage} alt="Star image" className='size-20'></img>
                <img src={starImage} alt="Star image" className='size-20'></img>
            </div>
        </>
    )
}