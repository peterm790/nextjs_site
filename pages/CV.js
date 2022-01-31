import Layout from '../components/layout'
import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/Home.module.css'

export default function CV() {
    return (
        <Layout>
        <Head>
          <title>Pete&apos;s: Curriculum Vitae</title>
        </Head>
        <section className={utilStyles.headingMd}>
        <p>
        Academic Qualifications
        <ul>
            <li>
            National Senior Certificate (2014) <em>South African College of Schools (SACS)</em> 74%
            </li>
            <li>
            BSc Oceanography & Geology, <em>University of Cape Town</em> (2017) 62.5 %
            </li>
            <li>
            BSc (Hons) Atmospheric Science, <em>University of Cape Town</em> (2018) 	75%  <em>(1st class pass & Class Medal)</em>
            </li>
            <li>
            MSc Atmospheric Science, <em>University of Cape Town</em> (2019-2021) 	74%
            </li>
        </ul>
        </p>
        <p>
            Technical Skills
        <ul>
            <li>
            Python
                <ul>
                    <li>Data cleaning and analysis; utilising ReGex techniques for data cleaning and pandas for data frame management and manipulation. </li>
                    <li>Big data analysis of large multi-dimensional spatial arrays; utilising xarray to facilitate lazy-loading of large arrays where RAM is a limiting factor. </li>
                    <li>Multi-threading and algorithm optimization to facilitate complex operations across large datasets utilising inbuilt python .map() functions as well as dask optimizations.  </li>
                    <li>Statistical modelling and machine learning; utilising packages such as TensorFlow and scikit-learn to construct prediction models of spatial and/or timeseries data. As well as constructing bespoke models such as a cold front identification algorithm developed for my master&apos;s thesis.  </li>
                    <li>Data-Visualization; construction of detailed high-resolution plots utilising matplotlib as well as construction of geospatial plots using cartopy projections. </li>
                    <li>Dashboard construction; construction of pythonic dashboards for visualization of real time data using packages such as ipywidgets, plotly, holoviz and streamlit.  </li>
                    <li>Sharing code and collaborating with colleagues using jupyter notebooks  as well as jupyterlab for working on remote computing facilities.</li>
                </ul>
            </li>
            <li>
            Linux/Unix
                <ul>
                    <li>Navigating Unix based operating systems via the command line, where my preference is navigation via the command line rather than GUI alternatives. </li>
                    <li>Managing virtual environments necessary for working across multiple different operating systems and computing facilities. </li>
                    <li>Batch scripting and resource management utilising tools such as slurm.  </li>
                </ul>
            </li>
            <li>
            Numerical Weather Prediction
                <ul>
                    <li>Fortran; Initially through my Atmospheric Science Honours course where we constructed a basic physics model using fortran. </li>
                    <li>WRF model; I have operationalised a 1km WRF downscaling for the Cape Town region. The model is run on my personal computer and is initialised from the 18z GFS forecast and provides a 36 hour forecast. I use a python dashboard to share forecast data.  </li>
                    <li>Experience working with and manipulating common weather data formats such as GRIB, NetCDF and Zarray&apos;s as well as manipulating these files using tools such as NCO, CDO and ferret. </li>
                </ul>
            </li>
            <li>
            Modern Web Construction
                <ul>
                    <li>I have recently taken time to understand the tools used for construction modern websites, creating a simple personal website (this website!) utilising Next.js a react based framework gaining experience working with html, CSS and JavaScript.  </li>
                </ul>
            </li>
            <li>
            Virtual Collaboration
                <ul>
                    <li>Experience communicating and collaborating in a work from home environment using tools such as Microsoft teams, Slack and Zoom.  </li>
                </ul>
            </li>
            <li>
            Version control
                <ul>
                    <li>Experience using git and github to manage and version control code.   </li>
                </ul>
            </li>
            <li>
            R
                <ul>
                    <li>My preference for statistical analysis has shifted towards python, however I have previous experience with R and more recently utilising R for rayshading to create realistic plots from terrain height data.</li>
                </ul>
            </li>
            <li>
            Microsoft
                <ul>
                    <li>Experience across all Microsoft applications such as Excel, Word, Powerpoint and Teams as well as working with the Windows operating system.  </li>
                </ul>
            </li>
        </ul>
        </p>
        <p>
            Employment History
            <ul>
                <li>
                    University of Cape Town demonstrator/Tutor
                    <ul>
                        <li>EGS1005f: Introduction to Environmental Assessment & management for final year Civil Engineering Students. 2020 </li>
                    </ul>
                </li>
                <li>U/16 Rowing Coach 2015/16 at SACS </li>
                <li>2018-present I have worked for various Sailing teams, preparing and maintaining yachts, organising crew and facilitating deliveries of yachts.   </li>
            </ul>
        </p>
        <p>
            Notable Achievements
        <ul>
            <li>
            2020 Cape to Rio, ZuluGirl racing with Mazi Asset Management. 5th position Overall. Joined the campaign December 2019 to assist in rigging and provisioning before January 2020 start, were my primary roles involved advising on Meteorology and as a trimmer/helmsman. An electrical failure in the first week of the race meant we completed the 18 day race with very limited navigational instruments and communication, a credit to the team to remain competitive despite these challenges. 
            </li>
            <li>
            Transatlantic sail from Rio de Janeiro, Brazil to Cape Town, South Africa via Tristan da Cunha, Navigation and Weather Routing aboard the sailing yacht Scatterling. February 2017.
            </li>
            <li>
            UCT to Rio 2017 boat to shore communications, weather data advise and social media correspondence during Cape to Rio 2017 as well as full refurbishment and preparation of yacht. Not competing in the race due to an injury pre-start. (1st place in IRC Division 2; UCT Sport performance of the year 2017)
            </li>
            <li>
            UCT Full Colours (Yachting, 2018,2019)
            </li>
            <li>
            UCT Yacht Club kitesurfing representative (2018,2020)
            </li>
            <li>
            UCT Rowing Club Vice-Men&apos;s Captain (2016)
            </li>
            <li>
            Western Provincial Sporting Colours (Rowing, 2013, 2014
            </li>
            <li>
            South African Schools Rowing Union tour to Belgium (2013)
            </li>
        </ul>
        </p>
        <p>
            Hobbies
        <ul>
            <li>
            I enjoy competitive sailing where I have competed in many of South Africa&apos;s top amateur competitions. I have a particular passion for offshore racing where I am drawn to the challenge and intensity of competing non-stop, day and night for extended periods, whilst also drawn to the beauty and isolation of the oceans. During the week I enjoy going for trail runs in the evening to clear my head. 
            </li>
        </ul>
        </p>

        </section>
        </Layout>
    )
}
