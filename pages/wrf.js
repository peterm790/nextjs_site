import Layout from '../components/layout'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'

export default function wrf() {
    return (
        <Layout>
        <Head>
          <title>Pete&apos;s Weather Model</title>
        </Head>
        <h1 className = {utilStyles.heading2Xltoo}>
            High Resolution WRF forecast
        </h1>
        <p className={styles.bulktext}>
            This is an operational 1km WRF downscaling of the GFS forecast. Run entirely from my personal computer and deployed as a python widget. 
        </p>
        <div className = {styles.imagebox}>
            <Image src="/weather_crop.png" alt="Weather Simulation" layout='intrinsic' width = {900} height = {750}/>
        </div>
        <p className={styles.bulktext}>
            To view the live version of the above screenshot please follow the <a className = {styles.linkBIG} href = 'http://petes.zapto.org:8866' > link. </a> (http://petes.zapto.org:8866 - or copy this link and paste into your browser)
        </p>
        <p className={styles.bulktext}>
            Please note this is a link to a private dashboard without a valid SSL certificate and as such your browser may display a warning. 
        </p>
        <p className={styles.bulktext}>
            This <a className = {styles.linkSMALL} href = 'https://www.mmm.ucar.edu/weather-research-and-forecasting-model' > WRF </a> downscaling is initialise using the 18z <a className = {styles.linkSMALL} href = 'https://www.emc.ncep.noaa.gov/emc/pages/numerical_forecast_systems/gfs.php' > GFS forecast </a> and provides a 36 hour forecast from 7am to 6pm the following day. Updated forecasts are available from 6am daily. The background terrain has been created using a <a className = {styles.linkSMALL} href = 'https://www.rayshader.com/' > rayshading </a> technique driven by the <a className = {styles.linkSMALL} href = 'https://www.usgs.gov/centers/eros/science/usgs-eros-archive-digital-elevation-shuttle-radar-topography-mission-srtm?qt-science_center_objects=0#qt-science_center_objects' > USGS STRM </a> 30m global elevation data. 
        </p>
        </Layout>
        )
        }