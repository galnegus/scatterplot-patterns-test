import Head from 'next/head'
import Content from './Content';

const Home = () => (
  <div className="container">
    <Head>
      <title>Survey</title>
      <link rel="icon" href="/favicon.ico" />
      <link href="https://unpkg.com/normalize.css@^7.0.0" rel="stylesheet" />
      <link href="https://unpkg.com/@blueprintjs/icons@^3.4.0/lib/css/blueprint-icons.css" rel="stylesheet" />
      <link href="https://unpkg.com/@blueprintjs/core@^3.10.0/lib/css/blueprint.css" rel="stylesheet" />
    </Head>

    <main>
      <Content />
    </main>

    <style jsx>{`
      .container {
        width: 100%;
        height: 100%;
      }

      main {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
      }
    `}</style>

    <style jsx global>{`
      html, body, #__next {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        color: #fff;
      }

      body {
        background: #10161A;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
)

export default Home
