import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Apply the saved theme before first paint to avoid a flash of the
             wrong theme. Runs synchronously, ahead of any rendering. */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
            }}
          />

          {/* Favicons */}

          <link rel="icon" href="/favicon.ico" type="image/x-icon" />

          {/* Google Fonts */}

          <link rel="preconnect" href="https://fonts.googleapis.com" />

          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body className="bg-card">
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
