import Head from 'next/head'

const Layout = ({ children }) => (
  <div className="wrapper">
    <Head>
      <title>Dashboard</title>
      <link rel="icon" href="/favicon.ico" />
      <link href="https://unpkg.com/normalize.css@^7.0.0" rel="stylesheet" />
      <link href="https://unpkg.com/@blueprintjs/icons@^3.4.0/lib/css/blueprint-icons.css" rel="stylesheet" />
      <link href="https://unpkg.com/@blueprintjs/core@^3.10.0/lib/css/blueprint.css" rel="stylesheet" />
    </Head>

    <main className="content-wrapper">
      { children }
    </main>

    <style jsx>{`
      .wrapper {
        width: 100%;
      }

      .content-wrapper {
        width: 100%;
        padding: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
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
        background: #fff;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
);

export default Layout;
