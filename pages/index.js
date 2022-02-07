import styles from '../styles/Home.module.css'
import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout home>

      <Head>
        <title>Pete&apos;s Website</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p className={styles.description}>
          Welcome to my personal website. I am an Atmospheric Science graduate student from the University of Cape Town. Please find below my Curriculum Vitae, a showcase of my Master&apos;s thesis as well as various other projects I have worked on in my spare time.
        </p>
      </section>


          <div className={styles.grid}>
            <Link href ="/CV">
            <a className={styles.card}>
              <h2>Curriculum Vitae &rarr;</h2>
              <p><em>A short summary of my personal and academic achievements and previous work experience</em></p>
            </a>
            </Link>


            <Link href ="/masters/abstract">
            <a className={styles.card}>
              <h2>Master&apos;s Thesis &rarr;</h2>
              <p><em>A CMIP5 Model Selection Specific to South Africa&apos;s Winter Rainfall Zone</em></p>
            </a>
            </Link>

            <Link href = "/wrf">
            <a className={styles.card}>
              <h2>High Resolution WRF forecast &rarr;</h2>
              <p><em>This is an operational 1km WRF downscaling of the GFS forecast. Run entirely from my personal computer and deployed as a python widget. </em></p>
            </a>
            </Link>

          </div>

    </Layout>
  )
}
