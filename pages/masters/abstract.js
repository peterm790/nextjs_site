import Layout from '../../components/layout'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Abstract from '../../components/masters/Abstract'
import Nav from '../../components/masters/Nav'
import utilStyles from '../../styles/utils.module.css'

export default function abstract() {
    return (
        <Layout>
        <Head>
          <title>Pete&apos;s Masters Thesis</title>
        </Head>
        <h1 className = {utilStyles.heading2Xltoo}>
            A CMIP5 Model Selection Specific to South Africa&apos;s Winter Rainfall Zone
        </h1>
        <Nav selected = 'Abstract'/>
        <Abstract/>
        </Layout>
        )
        }


/* export default function DocView() {
    return(
        <iframe src="https://docs.google.com/document/d/e/2PACX-1vRubF8jyQN9gO6Xn4IdcQCyLHfEOV14oNIKxk4JN17396Lb31ComEuPTPajb_0Nf8obSF8y_HwW86g9/pub?embedded=true"></iframe>
    );
} */
