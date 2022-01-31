import ActiveLink from './ActiveLink'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export default function Nav({selected}) {
    return (
        <ul className = {styles.ulH}>
            <li className = {selected == 'Abstract'? styles.liHb: styles.liHa}>
                <Link href='/masters/abstract'>
                    <a className={styles.navlink}>Abstract</a>
                </Link>
            </li>
            <li className = {selected == 'Full Text'? styles.liHb: styles.liHa}>
                <Link href='/masters/full-text'>
                    <a className={styles.navlink}>Full Text</a>
                </Link>
            </li>
            <li className = {selected == 'Conclusion'? styles.liHb: styles.liHa}>
                <Link href='/masters/conclusion'>
                    <a className={styles.navlink}>Conclusion</a>
                </Link>
            </li>
        </ul>
    )
}