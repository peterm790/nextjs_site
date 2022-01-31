import Head from 'next/head'

const Header = () => {
    return (
        <>
            <Head>
                <title>Petes Website</title>
                <meta name="Peter Marsh Personal Website" content="<Curriculum Vitae, Portfolio, Contact Details" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=optional" rel="stylesheet"/>              
            </Head>
        </>
    )
}

export default Header
