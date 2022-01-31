import Layout from '../../components/layout'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Nav from '../../components/masters/Nav'
import utilStyles from '../../styles/utils.module.css'

export default function fulltext() {
    return (
        <Layout>
        <Head>
          <title>Pete&apos;s Masters Thesis</title>
        </Head>
        <h1 className = {utilStyles.heading2Xltoo}>
            A CMIP5 Model Selection Specific to South Africa’s Winter Rainfall Zone
        </h1>
        <Nav selected = 'Full Text'/>
        <iframe width='100%' height='800vh' src="/Masters_final.pdf"></iframe>
        </Layout>
        )
        }
