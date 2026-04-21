import styles from "../styles/styles";
import Footer from "./Footer";

export default function Modal({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.background}>
            <div className={styles.modalFrame}>
                <div className={styles.modalContent}>
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}