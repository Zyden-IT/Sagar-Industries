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
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />

          {/* Google Fonts */}

          <link rel="preconnect" href="https://fonts.googleapis.com" />

          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap"
            rel="stylesheet"
          />

          {/* Phosphor icon web font — used by SweetAlert toasts (SwalServices) */}
          <link
            rel="stylesheet"
            href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css"
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
