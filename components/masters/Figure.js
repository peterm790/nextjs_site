import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link'
import ActiveLink from './ActiveLink'

export default function Figure( {key, fig} ){
    const path = '/masters_images/'
    return(
        <Link href={`/masters/${fig.key}`}>
            <a className = {styles.img}>
                <img src={`${path}${fig.file_name}`} alt="Figure" height = '150vh'/>
                <span className = {styles.imgspan}>{`${fig.caption.slice(0, 40)}${'...'}`}</span>
            </a>
        </Link>
    )
}

