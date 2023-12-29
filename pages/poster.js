import Layout from '../components/layout'
import Head from 'next/head'
import {pdfjs, Document, Page} from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export default function CV() {

    const myResume = '/2023_DSI_Poster.pdf'; 

    return (
        <Layout>
        <Head>
          <title>Pete&apos;s: Curriculum Vitae</title>
        </Head>
        <Document file={myResume}>
            <Page pageIndex={0} />
        </Document>
        </Layout>
    )
}