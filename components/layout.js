import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Peter Marsh'
export const siteTitle = 'Petes Website'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <meta
            name="Peter Marsh Personal Website" content="<Curriculum Vitae, Portfolio, Contact Details"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=optional" rel="stylesheet"/> 
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/pp.jpg"
              className={utilStyles.borderCircle}
              height={313}
              width={288}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}