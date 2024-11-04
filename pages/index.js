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
          Hello! Please find below a haphazard collection of projects I have worked on over the years.
        </p>
      </section>


          <div className={styles.grid}>

            <Link href ="https://www.petesforecast.com/map">
            <a className={styles.card}>
              <h2>Pete&apos;s Forecast &rarr;</h2>
              <p><em>A Website to view the latest GFS weather forecast. With some beautiful windy style streamlines. Built on top of the latest web mapping tools.</em></p>
            </a>
            </Link>

            <Link href = "https://github.com/csag-uct/Metadata-Harmonisation-Tool">
            <a className={styles.card}>
              <h2>A Data Harmonisation Tool &rarr;</h2>
              <p><em>An open source tool to harmonise disparate datasets to a common ontology. Built using Streamlit and making use of the latest RAG techniques to accelerate an otherwise tedious and time consuming part of the ETL process.</em></p>
            </a>
            </Link>

            <Link href ="https://medium.com/pangeo/accessing-netcdf-and-grib-file-collections-as-cloud-native-virtual-datasets-using-kerchunk-625a2d0a9191">
            <a className={styles.card}>
              <h2>Accessing NetCDF and GRIB file collections as cloud-native virtual datasets using Kerchunk &rarr;</h2>
              <p><em>An article I wrote following the work I did during my time as a Google Summer of Code contributor working on the open source python package Kerchunk.</em></p>
            </a>
            </Link>

            <Link href ="https://github.com/peterm790/weather_routing/">
            <a className={styles.card}>
              <h2>A Pure Python Weather Routing Package &rarr;</h2>
              <p><em>Frustrated with the fact that most commercially available weather routing programs only take GRIB files as input, I have built a relatively light weight python weather routing tool that takes any data accessible by Xarray as input. </em></p>
            </a>
            </Link>

            <Link href ="https://peterm790-cape-2-rio-tracker-home-6learv.streamlit.app/">
            <a className={styles.card}>
              <h2>A Streamlit Web App Using The Weather Routing Package To Predict Finish Times In The Cape to Rio Race &rarr;</h2>
              <p><em> I have used streamlit to create a web app that predicts the finishing order of the Cape to Rio Yacht Race. The app relies upon a series of severless function to first use Kerchunk to allow efficient access to the latest GFS weather forecast, before web scraping the positions of each boat from the official tracker and then routing each boat individually to the finish. This allows users to get a better idea of the current ranking in the race and visualize the upcoming weather conditions for each boat. </em></p>
            </a>
            </Link>

            <Link href ="/masters/abstract">
            <a className={styles.card}>
              <h2>Master&apos;s Thesis &rarr;</h2>
              <p><em>A CMIP5 Model Selection Specific to South Africa&apos;s Winter Rainfall Zone.</em></p>
            </a>
            </Link>

            <Link href = "/wrf">
            <a className={styles.card}>
              <h2>High Resolution WRF forecast &rarr;</h2>
              <p><em>This is an operational 1km WRF downscaling of the GFS forecast. Run entirely from my personal computer and deployed as a python widget. </em></p>
            </a>
            </Link>

            <Link href = "/Turtle_Analysis_Notebook">
             <a className={styles.card}>
               <h2>Predicting Turtle Hatchling Strandings in the Western Cape  &rarr;</h2>
               <p><em>I was approached by the Two Oceans Aquarium Foundation to analyse weather conditions during past turtle hatchling stranding events and investigate the feasibility of predicting such events. </em></p>
             </a>
             </Link>

          </div>

          <div className={styles.socialLinks}>
            <Link href="https://www.linkedin.com/in/petermarsh790/">
              <a className={styles.linkedinLink}>
                <img src="/LI-In-Bug.png" alt="LinkedIn" width="36"/>
              </a>
            </Link>
          </div>

    </Layout>
  )
}
